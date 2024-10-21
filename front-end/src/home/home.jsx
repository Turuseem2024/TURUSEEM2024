

const Home = () => {
  return (
    <>
      <h1 className="text-stone-900 font-black text-3xl sm:text-4xl text-center">
        BIENVENIDOS A <span className="text-botones">TURUSEEM</span>
      </h1>
      <div className="flex flex-col sm:flex-row justify-evenly items-center mt- sm:mt-20">
        <img src="/IMG/LOGOTURUSEEM.png" className="w-48 sm:w-64 mb-6 sm:mb-0" />
        <h2 className="text-center font-bold text-lg sm:text-xl px-4">
          Desarrollar e implementar un software para la gestión
          <br className="hidden sm:block" /> de turnos Sena Empresa del Centro
          Agropecuario “La Granja”
          <br className="hidden sm:block" /> Sena Regional Tolima
          <span className="text-botones"> “TURUSEEM”</span>.
        </h2>
        <img src="/IMG/SenaEmpresa.png" className="w-48 sm:w-64 mt-6 sm:mt-0" />
      </div>
    </>
  );
};

export default Home;