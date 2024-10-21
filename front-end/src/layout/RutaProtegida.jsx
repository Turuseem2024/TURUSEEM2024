import { Outlet, Navigate } from "react-router-dom";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";
import VerticalNav from "../components/verticalNav";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();

  if (cargando) {
    return (
      <>
        <h1 className="uppercase text-center font-bold">
          No se ha podido cargar la pagina.
        </h1>
        <h1 className="uppercase text-center font-bold">
          Intenta volviendo a recargar
        </h1>
      </>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-72 bg-sidebar text-white fixed h-full overflow-y-auto z-10">
        <VerticalNav />
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-grow ml-72 overflow-hidden">
        <div className="flex-grow overflow-auto p-10">
          <main>
            {auth?.usuario?.Id_User || auth?.Id_User ? (
              <>
                <Outlet />
              </>
            ) : (
              <Navigate to="/" />
            )}
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default RutaProtegida;
