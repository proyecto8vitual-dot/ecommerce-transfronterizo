from django.urls import path

from .views import (
    CalcularLandedCostVista,
    IniciarSesionVista,
    RegistrarUsuarioVista,
)
urlpatterns = [
    path(
        "registro/",
        RegistrarUsuarioVista.as_view(),
        name="registro_usuario"
    ),

    path(
        "iniciar-sesion/",
        IniciarSesionVista.as_view(),
        name="iniciar_sesion"
    ),
    path(
    "landed-cost/",
    CalcularLandedCostVista.as_view(),
    name="landed_cost"
    ),
]