'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { fetchUserData } from '@/redux/features/userSlice';

const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  const [formData, setFormData] = useState({
    name: null,
    surname: null,
    email: null,
    password: null,
    passwordConfirm: null,
    photo: '/UserIcon.jpeg',
  });

  const profilePhotos = [
    '1ProfilePhoto.png',
    '2ProfilePhoto.png',
    '3ProfilePhoto.png',
    '4ProfilePhoto.png',
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (photo) => {
    setFormData({ ...formData, photo: `/${photo}` });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    if (formData.password !== formData.passwordConfirm) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (
      (formData.name && formData.name.length > 15) ||
      (formData.surname && formData.surname.length > 15)
    ) {
      setError(
        'Los campos de nombre y apellido no pueden tener más de 15 caracteres',
      );
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );

      const responseData = await response.json();

      if (responseData.status === 'success' && responseData.token) {
        setCookie('jwt', responseData.token, 90);

        await dispatch(fetchUserData());

        setSuccessMessage('Has registrado tu cuenta correctamente');

        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        setError('Ha ocurrido un error al registrarse');
        setTimeout(() => {
          setIsClicked(false);
        }, 2000);
      }
    } catch (error) {
      setError('Ha ocurrido un error al registrarse');
      setTimeout(() => {
        setIsClicked(false);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 shadow-md rounded-md w-full max-w-md">
        <h1 className="text-2xl text-black font-semibold mb-6">
          Creá tu cuenta
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Nombre:
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </label>
          </div>
          <div className="mb-4">
            <label
              htmlFor="surname"
              className="block text-sm font-medium text-gray-600"
            >
              Apellido:
              <input
                type="text"
                id="surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </label>
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email:
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </label>
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Contraseña:
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </label>
          </div>
          <div className="mb-6">
            <label
              htmlFor="passwordConfirm"
              className="block text-sm font-medium text-gray-600"
            >
              Confirmar Contraseña:
              <input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </label>
          </div>
          <div className="mb-4">
            <p className="block text-sm font-medium text-gray-600 mb-2">
              Elige tu imagen de Perfil:
            </p>
            <div className="flex space-x-4">
              {profilePhotos.map((photo, index) => (
                <label key={index} className="flex items-center">
                  <input
                    type="radio"
                    name="photo"
                    value={photo}
                    onChange={() => handlePhotoChange(photo)}
                    className="mr-2"
                  />
                  <img
                    src={`/${photo}`}
                    alt={`Profile ${index + 1}`}
                    className="w-12 h-12 rounded-full border border-gray-300"
                  />
                </label>
              ))}
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className={`w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none transition-all ${
                isClicked
                  ? 'bg-gray-500 hover:bg-gray-600 cursor-not-allowed'
                  : null
              }`}
              onClick={(e) => {
                if (!isClicked) {
                  setIsClicked(true);
                } else {
                  e.preventDefault();
                }
              }}
            >
              Crear cuenta
            </button>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mt-4 rounded">
                {error}
              </div>
            )}
            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 mt-4 rounded">
                {successMessage}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
