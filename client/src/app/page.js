import Image from "next/image";
import logo from "../../public/logo.png";
import logoName from "../../public/logoName.png";
import HorL from "../../public/higherOrLower.png";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen p-8 text-black">
      <div className="mb-8">
        <Image src={logo} alt="Logo de la app" width={300} height={50} />
        <Image src={logoName} alt="Nombre de la app" width={300} height={50} />
      </div>
      <div className="mb-8 text-center">
        <p className="text-xl font-bold">¿Qué tan experto en precios eres?</p>
      </div>
      <div className="mb-8 flex items-center text-center">
        <p>
          Mercado Precio está basado en el juego{" "}
          <span className="inline-block align-middle">
            <Image
              src={HorL}
              alt="Higher or Lower image"
              width={70}
              height={50}
            />
          </span>{" "}
          y adopta una apariencia similar a la de Mercado Libre
        </p>
      </div>
      <Link
        href="/play"
        className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-all focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
      >
        Jugar
      </Link>
    </div>
  );
}
