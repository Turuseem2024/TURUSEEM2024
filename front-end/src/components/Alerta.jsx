/* eslint-disable react/prop-types */
import { useEffect } from 'react';

function Alerta({ alerta, setAlerta }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            setAlerta({ ...alerta, msg: '' }); // Resetea el mensaje para que desaparezca la alerta
        }, 3000); // Desaparece después de 3 segundos

        return () => clearTimeout(timer); // Limpia el timeout si el componente se desmonta
    }, [alerta, setAlerta]);

    if (!alerta.msg) {
      return null;
    } // Si no hay mensaje, no se muestra nada

    return (
        <div className={`${alerta.error ? "from-red-400  to-red-600" : "from-blue-600 text-center to-blue-700" } bg-gradient-to-r text-center p-2 rounded-xl text-white font-bold mb-2`}>
            {alerta.msg}
        </div>
    );
}

export default Alerta;
