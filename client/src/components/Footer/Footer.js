import { FaLinkedin, FaGithub, FaBriefcase } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-white footer p-3">
      <div className="flex flex-wrap justify-center">
        <div className="w-full sm:w-1/3 lg:w-1/3 mb-3">
          <h3 className="border-b-2 border-primary w-4/5 text-base mb-4">
            Sobre el proyecto
          </h3>
          <p className="text-xs">
            Nace de mi aspiración de unirme al equipo de desarrollo de Mercado
            Libre y mi entusiasmo por el juego "Higher or Lower". "Mercado
            Precio" combina la emoción de adivinar precios con la estética de
            Mercado Libre, siendo mi expresión personal en el mundo de la
            programación.
          </p>
        </div>
        <div className="w-full flex items-center justify-center sm:w-1/3 lg:w-1/3 mb-3 text-center">
          <p className="text-xs">Soporte de Juan Cruz Rausch 👨🏼‍💻</p>
        </div>
        <div className="w-full sm:w-1/3 lg:w-1/3 mb-3">
          <h3 className="border-b-2 border-primary w-4/5 text-base mb-4">
            Contacto
          </h3>
          <div className="flex p-5 w-4/5 justify-between mt-4">
            <a
              href="https://www.linkedin.com/in/juancruzrausch/"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2"
            >
              <FaLinkedin size={32} />
            </a>
            <a
              href="https://github.com/JuanCruzRausch"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2"
            >
              <FaGithub size={32} />
            </a>
            <a
              href="https://juancruzrausch.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2"
            >
              <FaBriefcase size={32} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
