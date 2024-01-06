import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.png";
import logoName from "../../../public/logoName.png";

const Navbar = () => {
  return (
    <nav className="bg-navbar p-1 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center text-center">
          <Image src={logo} alt="Logo de la app" width={75} height={50} />
          <Image src={logoName} alt="Nombre de la app" width={80} height={50} />
        </Link>
        <div className="link-text flex space-x-4">
          <Link href="/">Inicio</Link>
          <Link href="/mejores-puntajes">Mejores Puntajes</Link>
          <Link href="/crea-cuenta">Creá tu cuenta</Link>
          <Link href="/ingresa">Ingresá</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
