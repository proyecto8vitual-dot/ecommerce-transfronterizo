from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import RegistroUsuarioSerializer
from rest_framework.permissions import IsAuthenticated
import hashlib
import json

from django.core.cache import cache
class RegistrarUsuarioVista(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegistroUsuarioSerializer


class IniciarSesionVista(APIView):

    def post(self, request):
        correo = request.data.get("correo")
        contrasena = request.data.get("contrasena")

        # Comprobar que se recibieron los datos necesarios
        if not correo or not contrasena:
            return Response(
                {
                    "mensaje": "El correo y la contraseña son obligatorios."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Validar correo y contraseña
        usuario = authenticate(
            username=correo,
            password=contrasena
        )

        if usuario is None:
            return Response(
                {
                    "mensaje": "Correo electrónico o contraseña incorrectos."
                },
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Generar los tokens JWT para el usuario
        token_actualizacion = RefreshToken.for_user(usuario)
        token_acceso = token_actualizacion.access_token

        return Response(
            {
                "mensaje": "Inicio de sesión correcto.",

                "usuario": {
                    "id": usuario.id,
                    "nombre": usuario.first_name,
                    "correo": usuario.email,
                },

                "tokens": {
                    "acceso": str(token_acceso),
                    "actualizacion": str(token_actualizacion),
                }
            },
            status=status.HTTP_200_OK
        )

class CalcularLandedCostVista(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        productos = request.data.get("productos", [])
        pais_origen = request.data.get(
            "pais_origen",
            "Estados Unidos"
        )
        pais_destino = request.data.get(
            "pais_destino",
            "México"
        )
        metodo_transporte = request.data.get(
            "metodo_transporte",
            "maritimo"
        )

        if not productos:
            return Response(
                {"mensaje": "El carrito no contiene productos."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # ----------------------------------------------------
        # CREAR UNA CLAVE ÚNICA PARA REDIS
        # ----------------------------------------------------

        datos_calculo = {
            "productos": productos,
            "pais_origen": pais_origen,
            "pais_destino": pais_destino,
            "metodo_transporte": metodo_transporte,
        }

        datos_convertidos = json.dumps(
            datos_calculo,
            sort_keys=True,
            ensure_ascii=False
        )

        clave_cache = "landed_cost:" + hashlib.sha256(
            datos_convertidos.encode("utf-8")
        ).hexdigest()

        # ----------------------------------------------------
        # BUSCAR PRIMERO EN REDIS
        # ----------------------------------------------------

        resultado_guardado = cache.get(clave_cache)

        if resultado_guardado is not None:
            resultado_respuesta = dict(resultado_guardado)
            resultado_respuesta["origen_cache"] = True

            return Response(
                resultado_respuesta,
                status=status.HTTP_200_OK
            )

        # ----------------------------------------------------
        # SI NO ESTÁ EN REDIS, REALIZAR EL CÁLCULO
        # ----------------------------------------------------

        subtotal_productos = sum(
            float(producto.get("precio", 0))
            * int(producto.get("cantidad", 0))
            for producto in productos
        )

        costos_transporte = {
            "maritimo": 120,
            "aereo": 250,
            "terrestre": 80,
        }

        transporte = costos_transporte.get(
            metodo_transporte,
            120
        )

        tarifas_arancelarias = {
            ("Estados Unidos", "México"): 0.05,
            ("Estados Unidos", "China"): 0.10,
            ("China", "México"): 0.12,
            ("China", "Estados Unidos"): 0.15,
            ("México", "Estados Unidos"): 0.06,
            ("México", "China"): 0.10,
        }

        if pais_origen == pais_destino:
            porcentaje_arancel = 0
        else:
            porcentaje_arancel = tarifas_arancelarias.get(
                (pais_origen, pais_destino),
                0.08
            )

        impuestos_destino = {
            "México": 0.16,
            "Estados Unidos": 0.08,
            "China": 0.13,
        }

        porcentaje_impuesto = impuestos_destino.get(
            pais_destino,
            0.16
        )

        otros_costos = 25

        aranceles = subtotal_productos * porcentaje_arancel

        base_impuestos = (
            subtotal_productos
            + transporte
            + aranceles
        )

        impuestos = base_impuestos * porcentaje_impuesto

        costo_total = (
            subtotal_productos
            + transporte
            + aranceles
            + impuestos
            + otros_costos
        )

        resultado = {
            "pais_origen": pais_origen,
            "pais_destino": pais_destino,
            "metodo_transporte": metodo_transporte,
            "porcentaje_arancel": round(
                porcentaje_arancel * 100, 2
            ),
            "porcentaje_impuesto": round(
                porcentaje_impuesto * 100, 2
            ),
            "subtotal_productos": round(
                subtotal_productos, 2
            ),
            "transporte": round(transporte, 2),
            "aranceles": round(aranceles, 2),
            "impuestos": round(impuestos, 2),
            "otros_costos": round(otros_costos, 2),
            "costo_total": round(costo_total, 2),
        }

        # ----------------------------------------------------
        # GUARDAR EL RESULTADO EN REDIS DURANTE 5 MINUTOS
        # ----------------------------------------------------

        cache.set(
            clave_cache,
            resultado,
            timeout=300
        )

        resultado_respuesta = dict(resultado)
        resultado_respuesta["origen_cache"] = False

        return Response(
            resultado_respuesta,
            status=status.HTTP_200_OK
        )