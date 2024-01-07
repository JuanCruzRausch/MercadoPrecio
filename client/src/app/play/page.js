'use client';
import Card from '@/components/Card/Card';
import GameButton from '@/components/GameButton/GameButton';
import React, { useState, useEffect } from 'react';

export default function Page() {
  const [currentProduct, setCurrentProduct] = useState(null);
  const [nextProduct, setNextProduct] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/product/rand');
        if (!response.ok) {
          throw new Error('Error al obtener el producto aleatorio');
        }

        const data = await response.json();
        setCurrentProduct(nextProduct);
        setNextProduct(data.data.product[0]);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchRandomProduct();
  }, []);

  const handleGuess = (isHigher) => {
    fetchRandomProduct();

    if (isHigher && nextProduct?.price > currentProduct?.price) {
      setScore((prevScore) => prevScore + 1);
    } else if (!isHigher && nextProduct?.price < currentProduct?.price) {
      setScore((prevScore) => prevScore + 1);
    } else {
      alert(`¡Fin del juego! Tu puntuación final es: ${score}`);
      setScore(0);
    }
  };

  const fetchRandomProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/product/rand');
      if (!response.ok) {
        throw new Error('Error al obtener el producto aleatorio');
      }

      const data = await response.json();
      setCurrentProduct(nextProduct);
      setNextProduct(data.data.product[0]);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex text-black flex-col items-center min-h-screen h-full p-8">
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="flex flex-col w-full px-64">
          <div className="flex w-full justify-between">
            <Card product={currentProduct} />
            <div className="flex items-center">VS</div>
            <Card product={nextProduct} second={true} />
          </div>
          <div className="flex w-full justify-center items-center flex-col">
            <h2>¿El próximo producto tendrá un precio más alto o más bajo?</h2>
            <div className="flex flex-row">
              <GameButton
                color="green"
                name="greenButton"
                handleGuess={handleGuess}
              >
                Mas Alto
              </GameButton>
              <GameButton
                color="red"
                name="redButton"
                handleGuess={handleGuess}
              >
                Mas Bajo
              </GameButton>
            </div>
            <h2>Puntuación: {score}</h2>
          </div>
        </div>
      )}
    </div>
  );
}
