'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

const Page = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realiza una solicitud al backend para iniciar sesión utilizando fetch
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

      // Convierte la respuesta a JSON
      const responseData = await response.json();
      console.log(responseData);

      // Verifica si la solicitud fue exitosa y muestra el token
      if (responseData.status === 'success' && responseData.token) {
        console.log('Login successful!');

        // Establece la cookie en el cliente
        setCookie('jwt', responseData.token, 90); // Aquí '7' es la duración en días

        // Redirige a la página deseada, por ejemplo, el dashboard
        alert('Has iniciado sesión correctamente :)');
        router.push('/');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      alert('Ha ocurrido un error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 shadow-md rounded-md w-full max-w-md">
        <h1 className="text-2xl text-black font-semibold mb-6">Login</h1>
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
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
