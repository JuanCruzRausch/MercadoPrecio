'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function Page() {
  const user = useSelector((state) => state.user);
  const router = useRouter();

  const redirectToHome = () => {
    router.push('/');
  };

  const redirectToScores = () => {
    router.push('/mis-puntajes');
  };

  const redirectToPlay = () => {
    router.push('/play');
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 text-black">
      {user ? (
        <div className="flex justify-center flex-col items-center bg-white p-4 rounded-md shadow-md">
          <Image
            src={user.photo}
            width={200}
            height={100}
            alt="Foto de perfil"
          />
          <div className="text-xl font-bold mt-5 mb-2">
            {user.name} {user.surname}
          </div>
          <div className="text-gray-600 mb-2">{user.email}</div>
          <div className="flex justify-between mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={redirectToHome}
            >
              Ir a Inicio
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 mx-2 text-white font-bold py-2 px-4 rounded"
              onClick={redirectToScores}
            >
              Mis Puntajes
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={redirectToPlay}
            >
              Jugar
            </button>
          </div>
        </div>
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
}

export default Page;
