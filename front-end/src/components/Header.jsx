import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { IoLogOut,  IoHome  } from "react-icons/io5";
// import { FaUserCircle } from "react-icons/fa";


const Header = () => {
    const { cerrarSesion } = useAuth()
    return (
        <>
            <header className="py-4 bg-green-500">
                <div className="container flex pr-12 flex-col lg:flex-row justify-end">
                  <nav className="flex gap-5 lg:flex-row mt-5 lg:mt-0 items-center">
                    <Link to="/admin" className="text-white text-base uppercase font-bold"><IoHome size={22} title="Inicio"/></Link>


                    <button type="button" onClick={cerrarSesion} className="text-white text-base uppercase font-bold h-16"><IoLogOut size={22} title="Cerrar Sesion"/></button>
                 

                  </nav>
                </div>

            </header>

        </>
    )
}

export default Header
