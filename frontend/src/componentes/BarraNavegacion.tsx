export default function BarraNavegacion() {
  return (
    <nav className="bg-slate-900 px-8 py-5 text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <a href="/" className="text-2xl font-bold">
          Comercio Global
        </a>

        <div className="flex items-center gap-8">
          <a
            href="/"
            className="font-medium transition hover:text-blue-400"
          >
            Inicio
          </a>

          <a
            href="/iniciar-sesion"
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-700"
          >
            Iniciar sesión
          </a>
        </div>
      </div>
    </nav>
  );
}