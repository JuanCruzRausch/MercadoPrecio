import Image from "next/image";
import logo from "../../public/logo.png";
import logoName from "../../public/logoName.png";
import HorL from "../../public/higherOrLower.png";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('https://media.ambito.com/p/5cea00255f158c68d3d421b8ad3a9faf/adjuntos/239/imagenes/036/712/0036712212/1200x675/smart/marcado-libre-1jpg.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(20%)",
          zIndex: -1,
        }}
      />
      <div className="flex flex-col items-center min-h-screen p-8 text-white">
        <div className="mb-8">
          <div style={{ filter: "drop-shadow(0 0 10px rgba(255, 255, 255))" }}>
            <Image src={logo} alt="Logo de la app" width={300} height={50} />
          </div>
          <div style={{ filter: "drop-shadow(0 0 5px rgba(255, 255, 255))" }}>
            <Image
              src={logoName}
              alt="Nombre de la app"
              width={300}
              height={50}
            />
          </div>
        </div>
        <div className="mb-8 text-center">
          <p className="text-xl font-bold">¿Qué tan experto en precios eres?</p>
        </div>
        <div className="mb-8 flex items-center text-center">
          <p>
            Mercado Precio se inspira en el juego{" "}
            <span className="inline-block align-middle">
              <Image
                src={HorL}
                alt="Higher or Lower image"
                width={70}
                height={50}
              />
            </span>{" "}
            y presenta una estética similar a la de Mercado Libre
          </p>
        </div>
        <Link
          href="/play"
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-all focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Jugar
        </Link>
      </div>
    </div>
  );
}
