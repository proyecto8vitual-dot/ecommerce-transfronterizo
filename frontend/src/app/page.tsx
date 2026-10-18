export default function Inicio() {
  return (
    <main className="min-h-screen bg-gray-100">
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="text-5xl font-bold text-gray-900">
          E-Commerce Transfronterizo
        </h1>

        <p className="mt-6 max-w-2xl text-xl text-gray-600">
          Plataforma B2B y B2C para la compra y venta de productos
          entre Estados Unidos y China.
        </p>

        <button className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
          Ver catálogo
        </button>
      </section>
    </main>
  );
}