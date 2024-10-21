function Manual() {
  return (
    <>
      <div className="flex flex-col w-full items-center">
        <h1 className="font-extrabold text-3xl uppercase mb-5">
          Manual de Consulta{" "}
          <span className="text-botones">Turnos</span>
        </h1>
        <iframe
          src="Public/PDFs/Manual-Consulta-TURUSEEM.pdf"
          height="600"  // Ajuste de altura
          className="w-3/4"  // Ajuste de ancho al 75% del contenedor

        ></iframe>
      </div>
    </>
  );
}

export default Manual;