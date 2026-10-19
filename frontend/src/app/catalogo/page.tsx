"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import BarraNavegacion from "@/componentes/BarraNavegacion";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  origen: string;
  bandera: string;
}

interface ProductoCarrito extends Producto {
  cantidad: number;
}

const productos: Producto[] = [
  {
    id: 1,
    nombre: "Laptop profesional",
    descripcion: "Equipo portátil para trabajo y productividad.",
    precio: 899,
    origen: "Estados Unidos",
    bandera: "🇺🇸",
  },
  {
    id: 2,
    nombre: "Audífonos inalámbricos",
    descripcion: "Audífonos Bluetooth con estuche de carga.",
    precio: 79,
    origen: "China",
    bandera: "🇨🇳",
  },
  {
    id: 3,
    nombre: "Monitor 27 pulgadas",
    descripcion: "Monitor de alta resolución para oficina y hogar.",
    precio: 249,
    origen: "Estados Unidos",
    bandera: "🇺🇸",
  },
  {
    id: 4,
    nombre: "Teclado mecánico",
    descripcion: "Teclado mecánico para trabajo y entretenimiento.",
    precio: 65,
    origen: "China",
    bandera: "🇨🇳",
  },
];

export default function Catalogo() {
  const router = useRouter();

  const [verificandoSesion, setVerificandoSesion] = useState(true);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const tokenAcceso = localStorage.getItem("token_acceso");
    const usuarioGuardado = localStorage.getItem("usuario");

    // Si no existe una sesión, regresar al inicio de sesión
    if (!tokenAcceso || !usuarioGuardado) {
      router.replace("/iniciar-sesion");
      return;
    }

    setVerificandoSesion(false);
  }, [router]);

  const agregarAlCarrito = (producto: Producto) => {
    const carritoGuardado = localStorage.getItem("carrito");

    let carrito: ProductoCarrito[] = carritoGuardado
      ? JSON.parse(carritoGuardado)
      : [];

    const productoExistente = carrito.find(
      (productoCarrito) => productoCarrito.id === producto.id
    );

    if (productoExistente) {
      carrito = carrito.map((productoCarrito) =>
        productoCarrito.id === producto.id
          ? {
              ...productoCarrito,
              cantidad: productoCarrito.cantidad + 1,
            }
          : productoCarrito
      );
    } else {
      carrito.push({
        ...producto,
        cantidad: 1,
      });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    setMensaje(`${producto.nombre} agregado al carrito.`);

    setTimeout(() => {
      setMensaje("");
    }, 2000);
  };

  // Evita mostrar el catálogo mientras se comprueba la sesión
  if (verificandoSesion) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-lg font-medium text-gray-600">
          Verificando sesión...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <BarraNavegacion />

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">
            Catálogo de productos
          </h1>

          <p className="mt-3 text-gray-600">
            Explora productos disponibles para comercio transfronterizo.
          </p>

          {mensaje && (
            <div className="mt-5 rounded-lg bg-green-100 px-4 py-3 font-medium text-green-800">
              {mensaje}
            </div>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productos.map((producto) => (
            <article
              key={producto.id}
              className="overflow-hidden rounded-xl bg-white shadow-md"
            >
              <div className="flex h-44 items-center justify-center bg-slate-200 text-6xl">
                📦
              </div>

              <div className="p-5">
                <span className="text-sm text-gray-500">
                  {producto.bandera} {producto.origen}
                </span>

                <h2 className="mt-2 text-xl font-bold text-gray-900">
                  {producto.nombre}
                </h2>

                <p className="mt-2 text-sm text-gray-600">
                  {producto.descripcion}
                </p>

                <p className="mt-4 text-2xl font-bold text-blue-600">
                  ${producto.precio} USD
                </p>

                <button
                  type="button"
                  onClick={() => agregarAlCarrito(producto)}
                  className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  Agregar al carrito
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="/carrito"
            className="inline-block rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800"
          >
            Ver carrito
          </a>
        </div>
      </section>
    </main>
  );
}