// pages/signup.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realiza una solicitud al backend para registrarse utilizando fetch
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

      // Convierte la respuesta a JSON
      const responseData = await response.json();
      console.log(responseData);

      // Verifica si la solicitud fue exitosa y muestra el token
      if (responseData.status === 'success' && responseData.token) {
        console.log('Registration successful!');
        // Redirige a la página deseada, por ejemplo, el dashboard
        alert('Te has registrado correctamente :)');
        router.push('/');
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
      alert('Ha ocurrido un error a la hora de registrarte');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 shadow-md rounded-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name:
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
              Password:
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
              Confirm Password:
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
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
