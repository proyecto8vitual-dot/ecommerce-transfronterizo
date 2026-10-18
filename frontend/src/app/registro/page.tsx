import BarraNavegacion from "@/componentes/BarraNavegacion";

export default function Registro() {
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

          <form className="mt-8">
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
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-600"
              />
            </div>

            <button
              type="submit"
              className="mt-7 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Crear cuenta
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