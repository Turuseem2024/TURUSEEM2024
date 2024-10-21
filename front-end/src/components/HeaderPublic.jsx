/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { IoLogIn } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function HeaderPublic() {
  let arr = [true, false, false, false, false, false];
  const [style, setStyle] = useState(arr);
  const [dropDown, setDropDown] = useState(true);
  const [text, setText] = useState("");

  const selected = (props) => {
    let newArr = [...arr];
    for (let i = 0; i < newArr.length; i++) {
      newArr[i] = false;
    }
    newArr[props] = true;
    setStyle(newArr);
  };

  const setSelectedText = (txt) => {
    setText(txt);
    setDropDown(true);
  };

  return (
    <div className="w-full">  
      <div className="bg-header shadow py-5 px-7">
        <nav className="flex justify-between">
          <div className="flex items-center space-x-3 lg:pr-16 pr-6">
            <img src="/IMG/LOGOTURUSEEM.png" className="w-11 drop-shadow-2xl" />
            <h2 className="font-bold text-2xl leading-6 text-black ">
              TURUSEEM
            </h2>
          </div>
          <ul className="hidden md:flex flex-auto space-x-2 items-center">
            <Link to='/'
              onClick={() => selected(0)}
              className={`${
                style[0]
                  ? "text-black border-b-4 border-blue-700"
                  : "text-black"
              } cursor-pointer px-3 py-2.5 font-bold text-xs leading-3 rounded uppercase`}
            >
              INICIO
            </Link>
            <Link to='contacto'
              onClick={() => selected(1)}
              className={`${
                style[1]
                  ? "text-black border-b-4 border-blue-700"
                  : "text-black"
              } cursor-pointer px-3 py-2.5 font-bold text-xs leading-3 rounded uppercase`}
            >
              Contacto
            </Link>
            <Link to='consultarturno'
              onClick={() => selected(2)}
              className={`${
                style[2]
                  ? "text-black border-b-4 border-blue-700"
                  : "text-black"
              } cursor-pointer px-3 py-2.5 font-bold text-xs leading-3 rounded uppercase`}
            >
              Consultar Turno Rutinario
            </Link>
            <Link to='consultarturnoespecial'
              onClick={() => selected(4)}
              className={`${
                style[4]
                  ? "text-black border-b-4 border-blue-700"
                  : "text-black"
              } cursor-pointer px-3 py-2.5 font-bold text-xs leading-3 rounded uppercase`}
            >
              Consultar Turno Especial
            </Link>
            <Link to='manual'
              onClick={() => selected(3)}
              className={`${
                style[3]
                  ? "text-black border-b-4 border-blue-700"
                  : "text-black"
              } cursor-pointer px-3 py-2.5 font-bold text-xs leading-3 rounded uppercase`}
            >
              Manual Consulta Turno
            </Link>
          </ul>
          <div className=" flex space-x-5 justify-center items-center pl-2">
            <Link to="/login" className="text-black font-medium" onClick={() => selected(null)}>
              <IoLogIn size={28} title="Login" />
              Login
            </Link>
          </div>
        </nav>
        {/* for smaller devcies */}
        <div className="block md:hidden w-full mt-5 ">
          <div
            onClick={() => setDropDown(!dropDown)}
            className="cursor-pointer px-4 py-3 text-white bg-botones rounded flex justify-between items-center w-full"
          >
            <div className="flex space-x-2">
              <span
                id="s1"
                className={`${
                  text.length != 0 ? "" : "hidden"
                } font-semibold text-sm leading-3 uppercase`}
              >
                Seleccionado:{" "}
              </span>
              <p
                id="textClicked"
                className="font-bold uppercase text-sm leading-3 focus:outline-none hover:bg-gray-800 duration-100 cursor-pointer "
              >
                {text ? text : "Inicio"}
              </p>
            </div>
            <svg
              id="ArrowSVG"
              className={`${
                dropDown ? "" : "rotate-180"
              } transform duration-100`}
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className=" relative">
            <ul
              id="list"
              className={`${
                dropDown ? "hidden" : "block"
              } font-normal text-base leading-4 absolute top-2  w-full flex flex-col rounded shadow-md`}
            >
              <Link to='/'
                onClick={() => setSelectedText("Inicio")}
                className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-bold uppercase"
              >
                Inicio
              </Link>
              <Link to='contacto'
                onClick={() => setSelectedText("Contacto")}
                className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-bold uppercase"
              >
                Contacto
              </Link>
              <Link to='consultarturno'
                onClick={() => setSelectedText("Consultar Turno")}
                className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-bold uppercase"
              >
                Consultar Turno
              </Link>

              <Link to='manual'
                onClick={() => setSelectedText("Manual")}
                className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-bold uppercase"
              >
                Manual
              </Link>
              <Link to='consultarturnoespecial'
                onClick={() => setSelectedText("Consultar Especial")} 
                className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-bold uppercase"
              >
                Consultar Turno Especial
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}