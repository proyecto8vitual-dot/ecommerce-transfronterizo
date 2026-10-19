"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import BarraNavegacion from "@/componentes/BarraNavegacion";

export default function Registro() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");

  const [mensajeError, setMensajeError] = useState("");
  const [cargando, setCargando] = useState(false);

  const registrarUsuario = async (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    setMensajeError("");

    // Comprobar que las contraseñas coincidan
    if (contrasena !== confirmarContrasena) {
      setMensajeError("Las contraseñas no coinciden.");
      return;
    }

    // Comprobar longitud mínima
    if (contrasena.length < 8) {
      setMensajeError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    setCargando(true);

    try {
      const respuesta = await fetch(
        "http://127.0.0.1:8000/api/cuentas/registro/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre_usuario: correo,
            correo: correo,
            nombre: nombre,
            apellido: "",
            contrasena: contrasena,
          }),
        }
      );

      const datos = await respuesta.json();
      console.log("Respuesta de Django:", datos);
      if (!respuesta.ok) {
        if (datos.nombre_usuario) {
          setMensajeError(
            "Ya existe una cuenta registrada con este correo electrónico."
          );
        } else {
          setMensajeError("No fue posible crear la cuenta.");
        }

        return;
      }

      // Registro exitoso: enviar al usuario al inicio de sesión
      router.push("/iniciar-sesion");
    } catch (error) {
      console.error("Error al registrar el usuario:", error);

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
            <h1 className="text-3xl font-bold text-gray-900">
              Crear una cuenta
            </h1>

            <p className="mt-3 text-gray-600">
              Regístrate para comenzar a utilizar Comercio Global.
            </p>
          </div>

          <form className="mt-8" onSubmit={registrarUsuario}>
            <div>
              <label
                htmlFor="nombre"
                className="block font-semibold text-gray-700"
              >
                Nombre
              </label>

              <input
                id="nombre"
                type="text"
                placeholder="Tu nombre"
                value={nombre}
                onChange={(evento) => setNombre(evento.target.value)}
                required
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-600"
              />
            </div>

            <div className="mt-5">
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
                placeholder="Crea una contraseña"
                value={contrasena}
                onChange={(evento) => setContrasena(evento.target.value)}
                required
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-600"
              />
            </div>

            <div className="mt-5">
              <label
                htmlFor="confirmarContrasena"
                className="block font-semibold text-gray-700"
              >
                Confirmar contraseña
              </label>

              <input
                id="confirmarContrasena"
                type="password"
                placeholder="Repite tu contraseña"
                value={confirmarContrasena}
                onChange={(evento) =>
                  setConfirmarContrasena(evento.target.value)
                }
                required
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-600"
              />
            </div>

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
              {cargando ? "Creando cuenta..." : "Crear cuenta"}
            </button>
          </form>

          <div className="mt-6 border-t pt-6 text-center">
            <p className="text-gray-600">
              ¿Ya tienes una cuenta?
            </p>

            <a
              href="/iniciar-sesion"
              className="mt-2 inline-block font-semibold text-blue-600 hover:underline"
            >
              Iniciar sesión
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}