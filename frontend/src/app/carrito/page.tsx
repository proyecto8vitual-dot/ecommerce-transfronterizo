"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import BarraNavegacion from "@/componentes/BarraNavegacion";

interface ProductoCarrito {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  origen: string;
  bandera: string;
  cantidad: number;
}

export default function Carrito() {
  const router = useRouter();

  const [productosCarrito, setProductosCarrito] =
    useState<ProductoCarrito[]>([]);

  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const tokenAcceso = localStorage.getItem("token_acceso");
    const usuarioGuardado = localStorage.getItem("usuario");

    // Proteger la página del carrito
    if (!tokenAcceso || !usuarioGuardado) {
      router.replace("/iniciar-sesion");
      return;
    }

    // Recuperar los productos guardados
    const carritoGuardado = localStorage.getItem("carrito");

    if (carritoGuardado) {
      try {
        const productosGuardados =
          JSON.parse(carritoGuardado);

        setProductosCarrito(productosGuardados);
      } catch (error) {
        console.error(
          "Error al recuperar el carrito:",
          error
        );

        localStorage.removeItem("carrito");
      }
    }

    setCargando(false);
  }, [router]);

  const guardarCarrito = (
    productos: ProductoCarrito[]
  ) => {
    setProductosCarrito(productos);

    localStorage.setItem(
      "carrito",
      JSON.stringify(productos)
    );
  };

  const cambiarCantidad = (
    idProducto: number,
    nuevaCantidad: number
  ) => {
    if (nuevaCantidad < 1) {
      return;
    }

    const productosActualizados =
      productosCarrito.map((producto) =>
        producto.id === idProducto
          ? {
              ...producto,
              cantidad: nuevaCantidad,
            }
          : producto
      );

    guardarCarrito(productosActualizados);
  };

  const eliminarProducto = (
    idProducto: number
  ) => {
    const productosActualizados =
      productosCarrito.filter(
        (producto) =>
          producto.id !== idProducto
      );

    guardarCarrito(productosActualizados);
  };

  const subtotal = productosCarrito.reduce(
    (total, producto) =>
      total +
      producto.precio * producto.cantidad,
    0
  );

  const cantidadProductos =
    productosCarrito.reduce(
      (total, producto) =>
        total + producto.cantidad,
      0
    );

  if (cargando) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-lg font-medium text-gray-600">
          Cargando carrito...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <BarraNavegacion />

      <section className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-900">
          Carrito de compras
        </h1>

        <p className="mt-3 text-gray-600">
          Revisa los productos antes de calcular
          el costo de importación.
        </p>

        {productosCarrito.length === 0 ? (
          <div className="mt-10 rounded-xl bg-white p-8 text-center shadow-md">
            <p className="text-lg text-gray-600">
              Tu carrito está vacío.
            </p>

            <a
              href="/catalogo"
              className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Ir al catálogo
            </a>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-3">

            <div className="space-y-5 lg:col-span-2">
              {productosCarrito.map(
                (producto) => (
                  <article
                    key={producto.id}
                    className="flex items-center gap-5 rounded-xl bg-white p-5 shadow-md"
                  >
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-4xl">
                      📦
                    </div>

                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-900">
                        {producto.nombre}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        {producto.bandera} Origen:{" "}
                        {producto.origen}
                      </p>

                      <p className="mt-2 font-bold text-blue-600">
                        ${producto.precio} USD
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600">
                        Cantidad
                      </label>

                      <input
                        type="number"
                        min="1"
                        value={producto.cantidad}
                        onChange={(evento) =>
                          cambiarCantidad(
                            producto.id,
                            Number(
                              evento.target.value
                            )
                          )
                        }
                        className="mt-1 w-20 rounded-lg border border-gray-300 px-3 py-2 text-gray-900"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          eliminarProducto(
                            producto.id
                          )
                        }
                        className="mt-2 block text-sm font-semibold text-red-600 hover:underline"
                      >
                        Eliminar
                      </button>
                    </div>
                  </article>
                )
              )}
            </div>

            <aside className="h-fit rounded-xl bg-white p-6 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900">
                Resumen
              </h2>

              <div className="mt-6 flex justify-between text-gray-600">
                <span>Productos</span>
                <span>{cantidadProductos}</span>
              </div>

              <div className="mt-4 flex justify-between border-t pt-4 text-xl font-bold text-gray-900">
                <span>Subtotal</span>
                <span>
                  ${subtotal} USD
                </span>
              </div>

              <p className="mt-4 text-sm text-gray-500">
                El subtotal todavía no incluye
                transporte, impuestos, aranceles
                ni otros costos de importación.
              </p>

              <a
                href="/costo-importacion"
                className="mt-6 block rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white hover:bg-blue-700"
              >
                Calcular Landed Cost
              </a>
            </aside>

          </div>
        )}
      </section>
    </main>
  );
}