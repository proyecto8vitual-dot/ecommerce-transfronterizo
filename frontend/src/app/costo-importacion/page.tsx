import BarraNavegacion from "@/componentes/BarraNavegacion";

export default function CostoImportacion() {
  // Valores de ejemplo para el maquetado
  const subtotalProductos = 1057;
  const transporte = 120;
  const aranceles = 84.56;
  const impuestos = 201.88;
  const otrosCostos = 25;

  const costoTotal =
    subtotalProductos +
    transporte +
    aranceles +
    impuestos +
    otrosCostos;

  return (
    <main className="min-h-screen bg-gray-100">
      <BarraNavegacion />

      <section className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900">
          Cálculo de Landed Cost
        </h1>

        <p className="mt-3 text-gray-600">
          Calcula el costo estimado de importar tus productos hasta el país de
          destino.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Datos de la importación */}
          <section className="rounded-xl bg-white p-7 shadow-md">
            <h2 className="text-2xl font-bold text-gray-900">
              Datos de importación
            </h2>

            <div className="mt-6">
              <label className="block font-semibold text-gray-700">
                País de origen
              </label>

              <select className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900">
                <option>Estados Unidos</option>
                <option>China</option>
              </select>
            </div>

            <div className="mt-5">
              <label className="block font-semibold text-gray-700">
                País de destino
              </label>

              <select className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900">
                <option>México</option>
                <option>Estados Unidos</option>
                <option>China</option>
              </select>
            </div>

            <div className="mt-5">
              <label className="block font-semibold text-gray-700">
                Método de transporte
              </label>

              <select className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900">
                <option>Transporte marítimo</option>
                <option>Transporte aéreo</option>
                <option>Transporte terrestre</option>
              </select>
            </div>

            <button className="mt-7 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700">
              Solicitar Landed Cost
            </button>
          </section>

          {/* Desglose del costo */}
          <section className="rounded-xl bg-white p-7 shadow-md">
            <h2 className="text-2xl font-bold text-gray-900">
              Desglose estimado
            </h2>

            <div className="mt-6 space-y-4 text-gray-700">
              <div className="flex justify-between">
                <span>Productos</span>
                <span>${subtotalProductos.toFixed(2)} USD</span>
              </div>

              <div className="flex justify-between">
                <span>Transporte</span>
                <span>${transporte.toFixed(2)} USD</span>
              </div>

              <div className="flex justify-between">
                <span>Aranceles</span>
                <span>${aranceles.toFixed(2)} USD</span>
              </div>

              <div className="flex justify-between">
                <span>Impuestos</span>
                <span>${impuestos.toFixed(2)} USD</span>
              </div>

              <div className="flex justify-between">
                <span>Otros costos</span>
                <span>${otrosCostos.toFixed(2)} USD</span>
              </div>
            </div>

            <div className="mt-6 border-t pt-6">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">
                  Landed Cost total
                </span>

                <span className="text-3xl font-bold text-blue-600">
                  ${costoTotal.toFixed(2)} USD
                </span>
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-blue-50 p-4 text-sm text-blue-900">
              Este cálculo es una estimación. El costo final dependerá de
              tarifas, clasificación arancelaria, impuestos y condiciones de
              transporte.
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}