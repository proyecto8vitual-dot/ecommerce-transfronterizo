export default function LogoComercio() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-24">

        {/* Poste de la grúa */}
        <div className="absolute left-3 top-2 w-2 h-16 bg-blue-950 rounded-sm" />

        {/* Brazo de la grúa */}
        <div className="absolute left-3 top-2 w-20 h-2 bg-blue-950 rounded-sm" />

        {/* Cable */}
        <div className="absolute left-[78px] top-4 w-[2px] h-6 bg-blue-800" />

        {/* Gancho */}
        <div className="absolute left-[74px] top-9 w-3 h-2 border-b-2 border-blue-800 rounded-full" />

        {/* Contenedor */}
        <div className="absolute left-11 top-12 w-14 h-8 border-2 border-blue-950 rounded-sm bg-blue-50">

          {/* Líneas del contenedor */}
          <div className="flex justify-evenly h-full">
            <span className="border-l border-blue-800" />
            <span className="border-l border-blue-800" />
            <span className="border-l border-blue-800" />
            <span className="border-l border-blue-800" />
          </div>

        </div>

        {/* Base */}
        <div className="absolute left-1 bottom-2 w-24 h-2 bg-blue-950 rounded-full" />

      </div>

      <span className="text-blue-950 font-bold text-lg">
        Comercio Global
      </span>
    </div>
  );
}