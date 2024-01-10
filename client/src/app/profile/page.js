'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '@/redux/features/userSlice';

function Page() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // Usa useEffect para realizar la solicitud asincrónica cuando el componente se monta
  useEffect(() => {
    // Dispatch la acción para obtener la información del usuario
    dispatch(fetchUserData());
  }, [dispatch]); // Asegúrate de incluir dispatch en la dependencia para evitar advertencias

  // Renderiza el componente con la información del usuario después de que la solicitud asincrónica se complete
  return (
    <div className="flex flex-col items-center min-h-screen p-8 text-black">
      {user ? (
        <>
          <div>{user.name}aa</div>
          {/* Agrega el resto de tu lógica de renderizado aquí */}
        </>
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
}

export default Page;
