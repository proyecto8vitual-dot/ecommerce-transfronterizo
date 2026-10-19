"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import BarraNavegacion from "@/componentes/BarraNavegacion";

interface ProductoCarrito {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

interface ResultadoLandedCost {
  subtotal_productos: number;
  transporte: number;
  aranceles: number;
  impuestos: number;
  otros_costos: number;
  costo_total: number;
}

export default function CostoImportacion() {
  const router = useRouter();

  const [productos, setProductos] = useState<ProductoCarrito[]>([]);
  const [paisOrigen, setPaisOrigen] = useState("Estados Unidos");
  const [paisDestino, setPaisDestino] = useState("México");
  const [metodoTransporte, setMetodoTransporte] = useState("maritimo");

  const [resultado, setResultado] =
    useState<ResultadoLandedCost | null>(null);

  const [calculando, setCalculando] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  useEffect(() => {
    const tokenAcceso = localStorage.getItem("token_acceso");
    const usuarioGuardado = localStorage.getItem("usuario");

    if (!tokenAcceso || !usuarioGuardado) {
      router.replace("/iniciar-sesion");
      return;
    }

    const carritoGuardado = localStorage.getItem("carrito");

    if (carritoGuardado) {
      try {
        setProductos(JSON.parse(carritoGuardado));
      } catch {
        setProductos([]);
      }
    }
  }, [router]);

  const solicitarLandedCost = async () => {
    if (productos.length === 0) {
      setMensajeError(
        "No hay productos en el carrito."
      );
      return;
    }

    setCalculando(true);
    setMensajeError("");
    setResultado(null);

    try {
      const tokenAcceso = localStorage.getItem("token_acceso");
      const respuesta = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cuentas/landed-cost/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tokenAcceso}`,
          },
          body: JSON.stringify({
            productos: productos,
            pais_origen: paisOrigen,
            pais_destino: paisDestino,
            metodo_transporte: metodoTransporte,
          }),
        }
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        setMensajeError(
          datos.mensaje ||
            "No fue posible calcular el Landed Cost."
        );
        return;
      }

      setResultado(datos);
    } catch (error) {
      console.error(error);

      setMensajeError(
        "No fue posible conectar con el servidor."
      );
    } finally {
      setCalculando(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <BarraNavegacion />

      <section className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900">
          Cálculo de Landed Cost
        </h1>

        <p className="mt-3 text-gray-600">
          Calcula el costo estimado de importar tus productos
          hasta el país de destino.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">

          <section className="rounded-xl bg-white p-7 shadow-md">
            <h2 className="text-2xl font-bold text-gray-900">
              Datos de importación
            </h2>

            <div className="mt-6">
              <label className="block font-semibold text-gray-700">
                País de origen
              </label>

              <select
                value={paisOrigen}
                onChange={(evento) =>
                  setPaisOrigen(evento.target.value)
                }
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900"
              >
                <option>Estados Unidos</option>
                <option>China</option>
              </select>
            </div>

            <div className="mt-5">
              <label className="block font-semibold text-gray-700">
                País de destino
              </label>

              <select
                value={paisDestino}
                onChange={(evento) =>
                  setPaisDestino(evento.target.value)
                }
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900"
              >
                <option>México</option>
                <option>Estados Unidos</option>
                <option>China</option>
              </select>
            </div>

            <div className="mt-5">
              <label className="block font-semibold text-gray-700">
                Método de transporte
              </label>

              <select
                value={metodoTransporte}
                onChange={(evento) =>
                  setMetodoTransporte(evento.target.value)
                }
                className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900"
              >
                <option value="maritimo">
                  Transporte marítimo
                </option>

                <option value="aereo">
                  Transporte aéreo
                </option>

                <option value="terrestre">
                  Transporte terrestre
                </option>
              </select>
            </div>

            {mensajeError && (
              <div className="mt-5 rounded-lg bg-red-100 p-4 text-red-700">
                {mensajeError}
              </div>
            )}

            <button
              type="button"
              onClick={solicitarLandedCost}
              disabled={calculando}
              className="mt-7 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
            >
              {calculando
                ? "Calculando..."
                : "Solicitar Landed Cost"}
            </button>
          </section>

          <section className="rounded-xl bg-white p-7 shadow-md">
            <h2 className="text-2xl font-bold text-gray-900">
              Desglose estimado
            </h2>

            {!resultado ? (
              <div className="mt-6 rounded-lg bg-gray-100 p-6 text-center text-gray-500">
                Solicita el Landed Cost para visualizar
                el desglose calculado por el servidor.
              </div>
            ) : (
              <>
                <div className="mt-6 space-y-4 text-gray-700">
                  <div className="flex justify-between">
                    <span>Productos</span>
                    <span>
                      ${resultado.subtotal_productos.toFixed(2)} USD
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Transporte</span>
                    <span>
                      ${resultado.transporte.toFixed(2)} USD
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Aranceles</span>
                    <span>
                      ${resultado.aranceles.toFixed(2)} USD
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Impuestos</span>
                    <span>
                      ${resultado.impuestos.toFixed(2)} USD
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Otros costos</span>
                    <span>
                      ${resultado.otros_costos.toFixed(2)} USD
                    </span>
                  </div>
                </div>

                <div className="mt-6 border-t pt-6">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xl font-bold text-gray-900">
                      Landed Cost total
                    </span>

                    <span className="text-3xl font-bold text-blue-600">
                      ${resultado.costo_total.toFixed(2)} USD
                    </span>
                  </div>
                </div>

                <div className="mt-6 rounded-lg bg-blue-50 p-4 text-sm text-blue-900">
                  Este cálculo es una estimación. El costo final
                  dependerá de tarifas, clasificación arancelaria,
                  impuestos y condiciones de transporte.
                </div>
              </>
            )}
          </section>

        </div>
      </section>
    </main>
  );
}