'use client'; // Agrega la directiva "use client" al principio del archivo

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUserData } from '@/redux/features/userSlice';
import Image from 'next/image';
import logo from '../../public/logo.png';
import logoName from '../../public/logoName.png';
import HorL from '../../public/higherOrLower.png';
import Link from 'next/link';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Cargar la información del usuario al montar el layout
    dispatch(fetchUserData());
  }, [dispatch]);

  return (
    <div className="relative">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/HomeBackGround.webp)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(20%)',
          zIndex: -1,
        }}
      />
      <div className="flex flex-col items-center min-h-screen p-8 text-white">
        <div className="mb-8">
          <div style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255))' }}>
            <Image src={logo} alt="Logo de la app" width={300} height={50} />
          </div>
          <div style={{ filter: 'drop-shadow(0 0 5px rgba(255, 255, 255))' }}>
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
            Mercado Precio se inspira en el juego{' '}
            <span className="inline-block align-middle">
              <Image
                src={HorL}
                alt="Higher or Lower image"
                width={70}
                height={50}
              />
            </span>{' '}
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
