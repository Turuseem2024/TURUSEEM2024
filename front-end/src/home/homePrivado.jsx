import { Link } from "react-router-dom";

const HomePrivado = () => {
  return (
    <div className=" flex flex-col items-center justify-center p-4">
      <h1 className="text-zinc-900 font-extrabold text-4xl md:text-5xl text-center mb-8 " >
        Bienvenidos a <span className="text-blue-700">TURUSEEM</span>
      </h1>

        <div className="bg-white p-6 md:p-8 rounded-lg  w-full max-w-md md:max-w-2xl">
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">
            Módulos Disponibles
          </h2>
          <div className="p-5">
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="aprendices" className="bg-white p-4 rounded-lg shadow-lg min-w-max transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gray-100">
                <h3 className="text-center text-lg font-semibold select-none">Aprendices</h3>
              </Link>
              <Link to="turnos-especiales" className="bg-white p-4 rounded-lg shadow-lg min-w-max transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gray-100">
                <h3 className="text-center text-lg font-semibold select-none">Turnos Especiales</h3>
              </Link>
              <Link to="turnos-rutinarios" className="bg-white p-4 rounded-lg shadow-lg min-w-max transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gray-100">
                <h3 className="text-center text-lg font-semibold select-none">Turnos Rutinarios</h3>
              </Link>
              <Link to="memorandos" className="bg-white p-4 rounded-lg shadow-lg min-w-max transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gray-100">
                <h3 className="text-center text-lg font-semibold select-none">Memorandos</h3>
              </Link>
              <Link to="programa-formacion" className="bg-white p-4 rounded-lg shadow-lg min-w-max transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gray-100">
                <h3 className="text-center text-lg font-semibold select-none">Programas de Formación</h3>
              </Link>
              <Link to="unidades" className="bg-white p-4 rounded-lg shadow-lg min-w-max transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gray-100">
                <h3 className="text-center text-lg font-semibold select-none">Unidades</h3>
              </Link>
              <Link to="fichas" className="bg-white p-4 rounded-lg shadow-lg min-w-max transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gray-100 ">
                <h3 className="text-center text-lg font-semibold select-none">Fichas</h3>
              </Link>
              <Link to="funcionarios" className="bg-white p-4 rounded-lg shadow-lg min-w-max transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gray-100">
                <h3 className="text-center text-lg font-semibold select-none">Funcionarios</h3>
              </Link>
              <Link to="talentohumano" className="bg-white p-4 rounded-lg shadow-lg min-w-max transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gray-100">
                <h3 className="text-center text-lg font-semibold select-none">Talento Humano</h3>
              </Link>
              <Link to="inasistencias" className="bg-white p-4 rounded-lg shadow-lg min-w-max transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gray-100 ">
                <h3 className="text-center text-lg font-semibold select-none ">Inasistencias</h3>
              </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePrivado;