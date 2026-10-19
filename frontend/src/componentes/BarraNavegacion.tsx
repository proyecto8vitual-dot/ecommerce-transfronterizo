"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Usuario {
  id: number;
  nombre: string;
  correo: string;
}

export default function BarraNavegacion() {
  const router = useRouter();

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");

    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token_acceso");
    localStorage.removeItem("token_actualizacion");

    setUsuario(null);
    setMenuAbierto(false);

    router.push("/iniciar-sesion");
  };

  return (
    <nav className="bg-slate-900 px-6 py-5 text-white shadow-md">
      <div className="mx-auto max-w-7xl">

        {/* Barra principal */}
        <div className="flex items-center justify-between">
          <a
            href="/"
            className="text-2xl font-bold"
          >
            Comercio Global
          </a>

          {/* Menú para computadora */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="/"
              className="font-medium transition hover:text-blue-400"
            >
              Inicio
            </a>

            {usuario ? (
              <>
                <a
                  href="/catalogo"
                  className="font-medium transition hover:text-blue-400"
                >
                  Catálogo
                </a>

                <a
                  href="/carrito"
                  className="font-medium transition hover:text-blue-400"
                >
                  Carrito
                </a>

                <span className="font-medium">
                  Hola, {usuario.nombre}
                </span>

                <button
                  type="button"
                  onClick={cerrarSesion}
                  className="rounded-lg bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-700"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <a
                href="/iniciar-sesion"
                className="rounded-lg bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-700"
              >
                Iniciar sesión
              </a>
            )}
          </div>

          {/* Botón hamburguesa para celular */}
          <button
            type="button"
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="rounded-lg border border-slate-700 p-2 text-2xl md:hidden"
            aria-label="Abrir menú"
          >
            {menuAbierto ? "✕" : "☰"}
          </button>
        </div>

        {/* Menú móvil */}
        {menuAbierto && (
          <div className="mt-5 flex flex-col gap-4 border-t border-slate-700 pt-5 md:hidden">
            <a
              href="/"
              className="font-medium transition hover:text-blue-400"
              onClick={() => setMenuAbierto(false)}
            >
              Inicio
            </a>

            {usuario ? (
              <>
                <a
                  href="/catalogo"
                  className="font-medium transition hover:text-blue-400"
                  onClick={() => setMenuAbierto(false)}
                >
                  Catálogo
                </a>

                <a
                  href="/carrito"
                  className="font-medium transition hover:text-blue-400"
                  onClick={() => setMenuAbierto(false)}
                >
                  Carrito
                </a>

                <span className="font-medium text-slate-300">
                  Hola, {usuario.nombre}
                </span>

                <button
                  type="button"
                  onClick={cerrarSesion}
                  className="rounded-lg bg-blue-600 px-5 py-3 text-left font-semibold transition hover:bg-blue-700"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <a
                href="/iniciar-sesion"
                className="rounded-lg bg-blue-600 px-5 py-3 text-center font-semibold transition hover:bg-blue-700"
                onClick={() => setMenuAbierto(false)}
              >
                Iniciar sesión
              </a>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}