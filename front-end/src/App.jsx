import { BrowserRouter, Routes, Route } from "react-router-dom";
// import AuthLayout from "./layout/authLayout";

//Rutas Protegidas
import RutaProtegida from "./layout/RutaProtegida.jsx";
import HomePrivado from "./home/homePrivado.jsx";
import CrudApprentices from "./apprentice/crudApprentices.jsx";
import ImportarCSV from "./apprentice/importarCSV";
import CrudTurnosEspeciales from "./turnosEspeciales/CrudTurnosEspeciales.jsx";
import CrudTurnosRutinarios from "./turnosRutinarios/CrudTurnosRutinarios.jsx";
import CrudMemorandum from "./memorandum/crudMemorandum.jsx";
import CrudUnidades from "./unit/CrudUnidad.jsx";
import CrudFichas from "./fichas/CrudFichas.jsx";
import CrudFuncionarios from "./funcionarios/CrudFuncionarios.jsx";
import CrudPrograma from "./programasFormacion/CrudProgramaFormacion.jsx";
import CrudTalentoHumano from "./talentoHumano/CrudTalentoHumano.jsx";
import CrudInasistencia from "./inasistencias/CrudInasistencia.jsx";





//Rutas Publicas
import RutaPublica from "./layout/RutaPublica.jsx";
import Home from "./home/home.jsx"
import Contacto from "./home/Contacto.jsx"
import ConsultarTurno from "./home/ConsultarTurno.jsx"
import Manual from "./home/Manual.jsx";
import LoginForm from "./users/LoginUser";
import UserForm from "./users/CreateAccount";
import OlvidePassword from "./users/OlvidePassword";
import ConfirmarCuenta from "./users/ConfirmarCuenta";
import CambiarPassword from "./users/CambiarPassword";
import ConsultarTurnoEspecial from "./home/ConsultarTurnoEspecial.jsx";

//APP DONDE SE TRAEN LOS CRUD
import { AuthProvider } from "./context/authProvider";

import VerPdf from "./memorandum/verPDF";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<RutaPublica />}>   {/*ESTA ES LA RUTA ANTES DE QUE SE AUTENTICA SOLO MUESTRA EL HEADER */}
              <Route index element={<Home />} />
              <Route path="contacto" element={<Contacto />} />
              <Route path="consultarturno" element={<ConsultarTurno />} />
              <Route path="consultarturnoespecial" element={<ConsultarTurnoEspecial />} />
              <Route path="manual" element={<Manual />} />
              <Route path="login" element={<LoginForm />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route path="olvide-password/:token" element={<CambiarPassword />} />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>

            <Route path="/admin" element={<RutaProtegida />}>   {/*ESTA ES LA RUTA DESPUES DE QUE SE AUTENTICA LE MOSTRARA TODOS LOS CRUDS  */}
              <Route index element={<HomePrivado />} />
              <Route path="aprendices/" element={<CrudApprentices />}>
                <Route path="importCSV" element={<ImportarCSV />} />
              </Route>
              <Route path="turnos-especiales" element={<CrudTurnosEspeciales />}/>
              <Route path="turnos-rutinarios" element={<CrudTurnosRutinarios />}/>
              <Route path="memorandos" element={<CrudMemorandum />} />
              <Route path="unidades" element={<CrudUnidades />} />
              <Route path="fichas" element={<CrudFichas />} />
              <Route path="funcionarios" element={<CrudFuncionarios />} />
              <Route path="programa-formacion" element={<CrudPrograma />} />
              <Route path="talentohumano" element={<CrudTalentoHumano />} />
              <Route path="inasistencias" element={<CrudInasistencia />} />
              <Route path="registrar" element={<UserForm />} />

              {/* <Route path='/perfil' element={<MemorandumPDF/>}/> */}
              <Route path="PdfView" element={<VerPdf />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
export default App;