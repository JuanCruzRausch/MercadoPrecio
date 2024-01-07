'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import logo from '../../../public/logo.png';
import logoName from '../../../public/logoName.png';

const links = [
  {
    name: 'Inicio',
    href: '/',
  },
  {
    name: 'Mejores Puntajes',
    href: '/mejores-puntajes',
  },
  {
    name: 'Creá tu cuenta',
    href: '/crea-tu-cuenta',
  },
  {
    name: 'Ingresá',
    href: '/ingresa',
  },
];

const Navbar = () => {
  const pathName = usePathname();
  console.log(pathName);
  return (
    <nav className="bg-navbar p-1 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center text-center">
          <Image src={logo} alt="Logo de la app" width={75} height={50} />
          <Image src={logoName} alt="Nombre de la app" width={80} height={50} />
        </Link>
        <div className="link-text flex space-x-4">
          <>
            {links.map((link) => {
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`${
                    pathName === link.href
                      ? 'shadow-lg bg-yellow-400 text-white font-bold rounded-lg'
                      : null
                  } px-2 py-1`}
                >
                  {link.name}
                </Link>
              );
            })}
          </>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
