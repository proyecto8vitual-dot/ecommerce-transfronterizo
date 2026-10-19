from django.contrib.auth.models import User
from rest_framework import serializers


class RegistroUsuarioSerializer(serializers.ModelSerializer):
    nombre_usuario = serializers.CharField(source="username")
    correo = serializers.EmailField(source="email")
    nombre = serializers.CharField(source="first_name")
    apellido = serializers.CharField(
    source="last_name",
    required=False,
    allow_blank=True
)
    contrasena = serializers.CharField(
        write_only=True,
        min_length=8
    )

    class Meta:
        model = User
        fields = [
            "nombre_usuario",
            "correo",
            "nombre",
            "apellido",
            "contrasena",
        ]

    def validate_nombre_usuario(self, valor):
        if User.objects.filter(username=valor).exists():
            raise serializers.ValidationError(
                "Este nombre de usuario ya está registrado."
            )

        return valor

    def create(self, datos_validados):
        contrasena = datos_validados.pop("contrasena")

        usuario = User(**datos_validados)
        usuario.set_password(contrasena)
        usuario.save()

        return usuario