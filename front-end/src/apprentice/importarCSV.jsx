import { useState } from 'react';
import { ReactSession } from 'react-client-session';
import clienteAxios from '../config/axios.jsx';
const URI = import.meta.env.VITE_BACKEND_URL + '/aprendiz/';
import Alerta from '../components/Alerta.jsx';
import { FaFileCsv } from 'react-icons/fa6';

const ImportarCSV = () => {
  const [file, setFile] = useState(null);
  const [alerta, setAlerta] = useState({});

  const expectedHeaders = [
    "Id_Aprendiz", "Nom_Aprendiz", "Ape_Aprendiz", "Id_Ficha", "Id_Ciudad", "Edad"
  ];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      setAlerta({
        msg: 'Por favor selecciona un archivo CSV.',
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 4000);
      return;
    }

    // Leer el contenido del archivo para validarlo
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;

      // Validar si el archivo está vacío
      if (!fileContent.trim()) {
        setAlerta({
          msg: 'El archivo CSV está vacío.',
          error: true,
        });
        setTimeout(() => {
          setAlerta({});
        }, 4000);
        return;
      }

      // Dividir el contenido en líneas y columnas
      const lines = fileContent.trim().split('\n');
      const headers = lines[0].split(',').map(header => header.trim());

      // Validar que los headers coincidan con los esperados
      if (JSON.stringify(headers) !== JSON.stringify(expectedHeaders)) {
        setAlerta({
          msg: 'El archivo CSV no tiene la estructura esperada. Asegúrate de que contenga los campos: ' + expectedHeaders.join(', '),
          error: true,
        });
        setTimeout(() => {
          setAlerta({});
        }, 4000);
        return;
      }

      // Validar que hay al menos una fila de datos después de la cabecera
      if (lines.length <= 1) {
        setAlerta({
          msg: 'El archivo CSV no contiene datos. Debe haber al menos una fila con datos.',
          error: true,
        });
        setTimeout(() => {
          setAlerta({});
        }, 4000);
        return;
      }

      // Continuar con el proceso de envío del archivo al servidor
      uploadFile();
    };

    reader.readAsText(file);
  };

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = ReactSession.get('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await clienteAxios.post(`${URI}import-csv`, formData, config);

      if (response.status === 200) {
        setAlerta({
          msg: 'Archivo CSV subido y procesado correctamente.',
          error: false,
        });
      } else {
        setAlerta({
          msg: 'Hubo un error al procesar el archivo.',
          error: true,
        });
      }
    } catch (error) {
      setAlerta({
        msg: 'Hubo un error al procesar el archivo.',
        error: true,
      });
    } finally {
      // Limpiar el archivo y el estado después de la carga o error
      setFile(null);
      document.querySelector('input[type="file"]').value = '';

      setTimeout(() => {
        setAlerta({});
      }, 4000);
    }
  };

  const { msg } = alerta;

  return (
    <div className="">
      {msg && <Alerta alerta={alerta} setAlerta={setAlerta}/>}
      <div className="flex items-center space-x-4">
        <input
          id="fileInput"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
        />
        <label
          htmlFor="fileInput"
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-800 cursor-pointer"
        >
          <FaFileCsv className="mr-0" />
        </label>
        <button
          onClick={handleUpload}
          className="bg-botones text-white px-4 py-2 rounded hover:bg-blue-800 font-semibold"
        >
          Traer Datos a Tabla
        </button>
      </div>
      {file && <p className="mt-2 text-gray-700">Archivo seleccionado: {file.name}</p>}
    </div>
  );
};

export default ImportarCSV;
