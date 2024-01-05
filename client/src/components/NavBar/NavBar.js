import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">Inicio</Link>
        {/* Agrega más enlaces según sea necesario */}
      </div>
    </nav>
  );
};

export default Navbar;
