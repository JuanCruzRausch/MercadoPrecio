'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import logo from '../../../public/logo.png';
import logoName from '../../../public/logoName.png';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser, fetchUserData } from '@/redux/features/userSlice';
import { useRouter } from 'next/navigation';

const links = [
  {
    name: 'Inicio',
    href: '/',
  },
  {
    name: 'Mejores Puntajes',
    href: '/mejores-puntajes',
  },
];

const linksNotLoggued = [
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
  const router = useRouter();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [openUserSettings, setOpenUserSettings] = useState(false);

  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

  console.log(user.name);
  const toggleUserSettings = () => {
    setOpenUserSettings(!openUserSettings);
  };

  const logout = () => {
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    dispatch(clearUser());
    setOpenUserSettings(false);
    router.push('/');
  };

  return (
    <nav className="bg-navbar p-1 text-white shadow-md">
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
                      ? 'shadow-lg bg-yellow-200 font-bold rounded-md'
                      : null
                  } px-2 py-1 transition-all flex justify-center items-center`}
                >
                  {link.name}
                </Link>
              );
            })}
          </>
          {user.name != '' ? (
            <div className="relative">
              <div
                className={`flex flex-row justify-center items-center px-2 py-1 cursor-pointer ${
                  openUserSettings ? 'bg-white rounded-t-md' : null
                }`}
                onClick={toggleUserSettings}
              >
                <Image
                  className="mr-1 rounded-full"
                  src={user.photo}
                  width={30}
                  height={30}
                  alt={user.name}
                />
                <p>{user.name}</p>
              </div>
              {openUserSettings && (
                <div className="absolute flex flex-col right-0 bg-white p-2 border-t-2 border-t-yellow-500 rounded-b-md shadow-md z-20">
                  <Link
                    href="/profile"
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200 transition-all"
                  >
                    Mi Perfil
                  </Link>
                  <Link
                    href="/mis-puntajes"
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200 transition-all"
                  >
                    Mis Puntajes
                  </Link>

                  <div
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200 transition-all"
                    onClick={logout}
                  >
                    Log out
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {linksNotLoggued.map((link) => {
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`${
                      pathName === link.href
                        ? 'shadow-lg bg-yellow-200 font-bold rounded-md'
                        : null
                    } px-2 py-1 transition-all flex justify-center items-center`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
