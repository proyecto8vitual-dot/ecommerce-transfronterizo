import BarraNavegacion from "@/componentes/BarraNavegacion";

export default function IniciarSesion() {
  return (
    <main className="min-h-screen bg-gray-100">
      <BarraNavegacion />

      <section className="flex min-h-[calc(100vh-72px)] items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Iniciar sesión
            </h1>

            <p className="mt-3 text-gray-600">
              Ingresa a tu cuenta de Comercio Global.
            </p>
          </div>

          <form className="mt-8">
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
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-blue-600"
              />
            </div>

            <button
              type="submit"
              className="mt-7 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Iniciar sesión
            </button>
          </form>

          <div className="mt-6 border-t pt-6 text-center">
            <p className="text-gray-600">
              ¿No tienes una cuenta?
            </p>

            <button
              type="button"
              className="mt-2 font-semibold text-blue-600 hover:underline"
            >
              Crear una cuenta
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}