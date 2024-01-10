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
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/login`,
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

        setSuccessMessage('Has iniciado sesión correctamente');
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        setError(
          responseData.message || 'Ha ocurrido un error al iniciar sesión',
        );
        setTimeout(() => {
          setIsClicked(false);
        }, 2000);
      }
    } catch (error) {
      setError('Ha ocurrido un error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 shadow-md rounded-md w-full max-w-md">
        <h1 className="text-2xl text-black font-semibold mb-6">Ingresá</h1>
        <form onSubmit={handleSubmit}>
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
          <div className="mb-6">
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
              Iniciar sesión
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
