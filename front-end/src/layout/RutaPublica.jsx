import { Outlet } from "react-router-dom";
import HeaderPublic from "../components/HeaderPublic.jsx";
import Footer from "../components/Footer.jsx";

const RutaPublica = () => {
  return (
    <>
      <div className="flex w-full flex-col min-h-screen">
        <HeaderPublic />
        <div className="flex-grow px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default RutaPublica;
