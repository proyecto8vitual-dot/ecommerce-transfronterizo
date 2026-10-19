"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import BarraNavegacion from "@/componentes/BarraNavegacion";
import LogoComercio from "@/componentes/LogoComercio";

export default function IniciarSesion() {
  const router = useRouter();

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [cargando, setCargando] = useState(false);

  const iniciarSesion = async (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    setMensajeError("");
    setCargando(true);

    try {
      const respuesta = await fetch(
        "http://127.0.0.1:8000/api/cuentas/iniciar-sesion/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            correo: correo,
            contrasena: contrasena,
          }),
        }
      );

      const datos = await respuesta.json();
      //
      if (!respuesta.ok) {
  setMensajeError(
    datos.mensaje || "Correo electrónico o contraseña incorrectos."
  );
  return;
}

// Guardar los datos del usuario autenticado
localStorage.setItem(
  "usuario",
  JSON.stringify(datos.usuario)
);

// Guardar los tokens JWT
localStorage.setItem(
  "token_acceso",
  datos.tokens.acceso
);

localStorage.setItem(
  "token_actualizacion",
  datos.tokens.actualizacion
);

// Enviar al usuario al catálogo
router.push("/catalogo");
      //
    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      setMensajeError(
        "No se pudo conectar con el servidor. Inténtalo nuevamente."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <BarraNavegacion />

      <section className="flex min-h-[calc(100vh-72px)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
          <div className="text-center">
            <LogoComercio />

            <h1 className="text-3xl font-bold text-gray-900">
              Iniciar sesión
            </h1>

            <p className="mt-3 text-gray-600">
              Ingresa a tu cuenta y compra.
            </p>
          </div>

          <form className="mt-8" onSubmit={iniciarSesion}>
            {/* Correo electrónico */}
            <div>
              <label
                htmlFor="correo"
                className="block font-semibold text-gray-700"
              >
                Correo electrónico
              </label>

              <input
                id="correo"
                type="email"
                placeholder="correo@ejemplo.com"
                value={correo}
                onChange={(evento) => setCorreo(evento.target.value)}
                required
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-600"
              />
            </div>

            {/* Contraseña */}
            <div className="mt-5">
              <label
                htmlFor="contrasena"
                className="block font-semibold text-gray-700"
              >
                Contraseña
              </label>

              <input
                id="contrasena"
                type="password"
                placeholder="Ingresa tu contraseña"
                value={contrasena}
                onChange={(evento) => setContrasena(evento.target.value)}
                required
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-600"
              />
            </div>

            {/* Mensaje de error */}
            {mensajeError && (
              <div className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {mensajeError}
              </div>
            )}

            <button
              type="submit"
              disabled={cargando}
              className="mt-7 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {cargando ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>
          </form>

          <div className="mt-6 border-t pt-6 text-center">
            <p className="text-gray-600">
              ¿No tienes una cuenta?
            </p>

            <a
              href="/registro"
              className="mt-2 inline-block font-semibold text-blue-600 hover:underline"
            >
              Crear una cuenta
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}