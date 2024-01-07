'use client';
import Card from '@/components/Card/Card';
import GameButton from '@/components/GameButton/GameButton';
import React, { useState, useEffect } from 'react';

export default function Page() {
  const [products, setProducts] = useState({ current: null, next: null });
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleFetchError = (error) => {
      console.error(error.message);
    };

    const fetchRandomProductInit = async () => {
      try {
        setLoading(true);
        const [response1, response2] = await Promise.all([
          fetch('http://localhost:8080/product/rand'),
          fetch('http://localhost:8080/product/rand'),
        ]);

        if (!response1.ok || !response2.ok) {
          throw new Error('Error al obtener el producto aleatorio');
        }

        const [data1, data2] = await Promise.all([
          response1.json(),
          response2.json(),
        ]);
        setProducts({
          current: data1.data.product[0],
          next: data2.data.product[0],
        });
        setLoading(false);
      } catch (error) {
        handleFetchError(error);
      }
    };

    fetchRandomProductInit();
  }, []);

  const fetchRandomProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/product/rand');

      if (!response.ok) {
        throw new Error('Error al obtener el producto aleatorio');
      }

      const data = await response.json();
      setProducts({ current: products.next, next: data.data.product[0] });
      setLoading(false);
    } catch (error) {
      handleFetchError(error);
    }
  };
  const handleGuess = (isHigher) => {
    const { price: nextPrice } = products.next || {};
    const { price: currentPrice } = products.current || {};

    if (
      (isHigher && nextPrice > currentPrice) ||
      (!isHigher && nextPrice < currentPrice)
    ) {
      setScore((prevScore) => prevScore + 1);
      handleVSColorChange('success');
    } else {
      setScore(0);
      handleVSColorChange('fail');
    }
  };

  const handleVSColorChange = (colorClass) => {
    const vsDiv = document.getElementById('vsDiv');
    console.log(vsDiv);
    if (vsDiv) {
      vsDiv.classList.remove(
        'bg-navbar',
        'transition-bg-vs',
        'success',
        'fail',
      );
      vsDiv.classList.add('transition-bg-vs', colorClass);

      setTimeout(() => {
        vsDiv.classList.remove(colorClass);
        vsDiv.classList.add('bg-navbar');
        setTimeout(() => {
          fetchRandomProduct();
        }, 1000);
      }, 1000); // Change the duration (in milliseconds) as needed
    }
  };

  return (
    <div className="flex text-black flex-col items-center min-h-screen h-full p-8">
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="flex flex-col w-full px-64">
          <div className="flex w-full justify-between">
            <Card product={products.current} />
            <div className="flex items-center flex-col justify-between">
              <h2 className="bg-blue-500 text-xl py-1 px-3 font-semibold text-white rounded-sm">
                Puntuación: {score}
              </h2>
              <div
                id="vsDiv"
                className="bg-navbar transition-bg-vs shadow-md font-semibold py-6 px-7"
              >
                VS
              </div>
              <div></div>
            </div>
            <Card product={products.next} second={true} />
          </div>
          <div className="flex w-full justify-center items-center flex-col">
            <h2
              className="bg-navbar shadow-md my-5"
              style={{
                fontSize: '1.5rem',
                padding: '5px 10px',
              }}
            >
              ¿El producto de la derecha tendrá un precio más alto o más bajo?
            </h2>
            <div className="flex flex-row">
              <GameButton
                color="green"
                name="greenButton"
                handleGuess={() => handleGuess(true)}
              >
                Mas Alto
              </GameButton>
              <GameButton
                color="red"
                name="redButton"
                handleGuess={() => handleGuess(false)}
              >
                Mas Bajo
              </GameButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
