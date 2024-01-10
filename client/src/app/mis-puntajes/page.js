'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

function Page() {
  const [scores, setScores] = useState([]);
  const user = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const router = useRouter();

  useEffect(() => {
    getScores(itemsPerPage, currentPage);
  }, [currentPage]);

  const getScores = async (limit, page) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/score/${user._id}?sort=-score&limit=${limit}&page=${page}`,
      );

      // Modificar los datos antes de establecerlos en el estado
      const formattedScores = response.data.data.scores.map((score, index) => {
        return {
          posicion: index + 1,
          puntaje: score.score,
          nombre: `${score.userId.name} ${score.userId.surname}`,
          fecha: new Date(score.date).toLocaleDateString(),
          photo: score.userId.photo,
        };
      });

      setScores(formattedScores);
      setTotalPages(Math.ceil(response.data.total / itemsPerPage));
    } catch (error) {}
  };

  return (
    <div className="relative text-black">
      {scores.length == 0 ? (
        <div className="flex flex-col items-center min-h-screen p-8 rounded-xl">
          <h2
            className="bg-navbar shadow-md my-5"
            style={{
              fontSize: '1.5rem',
              padding: '5px 10px',
            }}
          >
            No tienes puntajes guardados, ve a jugar y demuestra quien manda 😎
          </h2>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white text-2xl font-bold py-4 px-6 rounded"
            onClick={() => {
              router.push('/play');
            }}
          >
            Jugar
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center min-h-screen p-8 rounded-xl">
          <table className="bg-white shadow-lg" style={{ width: '60%' }}>
            <thead className="bg-navbar">
              <tr>
                <th className="py-3 px-4 border-b-2 border-yellow-400 font-normal">
                  Puntaje
                </th>
                <th className="py-3 px-4 border-b-2 border-yellow-400 font-normal">
                  Nombre
                </th>
                <th className="py-3 px-4 border-b-2 border-yellow-400 font-normal">
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score) => (
                <tr
                  key={score.posicion}
                  className={
                    score.posicion % 2 === 0 ? 'bg-gray-100' : 'bg-yellow-100'
                  }
                >
                  <td className="py-3 px-4 ">
                    <div
                      className={`flex justify-center items-center  font-semibold ${
                        currentPage === 1
                          ? score.posicion === 1
                            ? 'text-yellow-500 text-3xl'
                            : score.posicion === 2
                              ? 'text-gray-400 text-2xl'
                              : score.posicion === 3
                                ? ' text-amber-700 text-xl'
                                : null
                          : null
                      }`}
                    >
                      {score.puntaje}
                    </div>
                  </td>
                  <td className="py-3 px-4 ">
                    <div
                      className={`flex justify-center items-center  font-semibold ${
                        currentPage === 1
                          ? score.posicion === 1
                            ? 'text-yellow-500 text-3xl'
                            : score.posicion === 2
                              ? 'text-gray-400 text-2xl'
                              : score.posicion === 3
                                ? ' text-amber-700 text-xl'
                                : null
                          : null
                      }`}
                    >
                      <Image
                        src={score.photo}
                        width={
                          currentPage === 1
                            ? score.posicion === 1
                              ? 60
                              : score.posicion === 2
                                ? 50
                                : score.posicion === 3
                                  ? 40
                                  : 30
                            : 30
                        }
                        height={30}
                        className={`rounded-full mr-2 ${
                          currentPage === 1
                            ? score.posicion === 1
                              ? 'border-yellow-500 border-4'
                              : score.posicion === 2
                                ? 'border-gray-400 border-2'
                                : score.posicion === 3
                                  ? ' border-amber-700 border-2'
                                  : null
                            : ''
                        }`}
                      />
                      <p>{score.nombre}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 ">
                    <div className="flex justify-center items-center text-green-600">
                      {score.fecha}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`hover:text-blue-700 text-blue-500 py-2 px-4 mx-1 ${
                currentPage === 1 ? 'invisible' : null
              }`}
            >
              {'< Anterior'}
            </button>
            <span className="flex justify-center items-center mx-2 text-gray-500">
              Página {currentPage} de {totalPages < 1 ? '1' : totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`hover:text-blue-700 text-blue-500 py-2 px-4 mx-1 ${
                totalPages <= currentPage ? 'invisible' : null
              }`}
            >
              {'Siguiente >'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
