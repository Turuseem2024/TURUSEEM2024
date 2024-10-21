/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

const ContactCard = ({
  name,
  info,
  age,
  imageUrl,
  whatsappLink,
  socialLink,
}) => {
  return (
    <div className="flex flex-col items-center bg-white shadow-md rounded-lg w-full px-9 py-5">
      <img
        src={imageUrl}
        alt={name}
        className="w-48 h-48 rounded-full object-cover mb-4"
      />
      <h2 className="text-xl font-semibold">{name}</h2>
      <h5 className="text-xl font-semibold text-center">{info}</h5>
      <p className="text-gray-600">Edad: {age}</p>
      <div className="flex space-x-4 mt-4">
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
          <img
            src="https://img.icons8.com/color/48/000000/whatsapp.png"
            alt="WhatsApp"
            className="w-6 h-6"
          />
        </a>
        <a href={socialLink} target="_blank" rel="noopener noreferrer">
          <img
            src="https://img.icons8.com/color/48/000000/facebook.png"
            alt="Facebook"
            className="w-6 h-6"
          />
        </a>
      </div>
    </div>
  );
};

const Contacto = () => {
  function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear()
    const mes = hoy.getMonth() - nacimiento.getMonth();
    
    // Ajustar la edad si el cumpleaños aún no ha ocurrido este año
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    
    return edad;
  }
  const fechaNacimientoLinares = "2005-09-13";
  const fechaNacimientoKaleth = '2006-04-18';
  const fechaNacimientoNatalia = '2004-08-18';
  const fechaNacimientoKimberly = '2003-11-02';
  const fechaNacimientoLina = '1997-02-02';
  
  const contacts = [
    {
      name: "Juan David Linares Barragán",
      info: "Tecnologo en Analisis y Desarrollo de Software",
      age: `${calcularEdad(fechaNacimientoLinares)} Años`,
      imageUrl: "/IMG/JuanLinares.jpeg",
      whatsappLink: "https://wa.me/573209455659",
      socialLink: "https://www.facebook.com/profile.php?id=100095190046582",
    },
    {
      name: "Marlon Kaleth Sarmiento Mosquera",
      info: "Tecnologo en Analisis y Desarrollo de Software",
      age: `${calcularEdad(fechaNacimientoKaleth)} Años`,
      imageUrl: "/IMG/Kaleth.jpeg",
      whatsappLink: "https://wa.me/573213554763",
      socialLink: "https://www.facebook.com/marlon.mosquera.5855",
    },
    {
      name: "Natalia Torres Rodriguez",
      info: "Tecnologo en Analisis y Desarrollo de Software",
      age: `${calcularEdad(fechaNacimientoNatalia)} Años`,
      imageUrl: "/IMG/Natalia.jpeg",
      whatsappLink: "https://wa.me/573203453824",
      socialLink: "https://www.facebook.com/profile.php?id=100024303797798",
    },
    {
      name: "Kimberly Sharlot Hernadez Acosta",
      info: "Tecnologo en Analisis y Desarrollo de Software",
      age: `${calcularEdad(fechaNacimientoKimberly)} Años`,
      imageUrl: "/IMG/Kim.jpeg",
      whatsappLink: "https://wa.me/573173933137",
      socialLink: "https://www.facebook.com/profile.php?id=100078628960697",
    },
    {
      name: "Lina Julieth Carvajal Mendoza",
      info: "Tecnologo en Analisis y Desarrollo de Software",
      age: `${calcularEdad(fechaNacimientoLina)} Años`,
      imageUrl: "/IMG/Lina.jpeg",
      whatsappLink: "https://wa.me/573114620179",
      socialLink: "https://www.facebook.com/LJCM97",
    },
  ];


  return (
    <>
      <h1 className="text-stone-900 font-black text-3xl sm:text-4xl text-center">
        EQUIPO DE <span className="text-botones">DESARROLLO</span>
      </h1>
      <div className="flex flex-wrap justify-center gap-6 mt-5">
        {contacts.map((contact, index) => (
          <div className="w-full sm:w-1/2 lg:w-1/3">
            <ContactCard key={index} {...contact} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Contacto;