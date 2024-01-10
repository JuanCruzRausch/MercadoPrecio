'use client';
import Card from '@/components/Card/Card';
import GameButton from '@/components/GameButton/GameButton';
import cookieExist from '@/utils/cookieExist';
import getCookie from '@/utils/getCookie';
import getUser from '@/utils/getUser';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Page() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [prevScore, setPrevScore] = useState(0);
  const [showGameOver, setShowGameOver] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState({
    message: '',
    message2: '',
    gifUrl: '',
  });
  const [isClicked, setIsClicked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    surname: '',
    email: '',
    photo: '',
    role: '',
  });

  useEffect(() => {
    const handleFetchError = (error) => {
      console.error(error.message);
    };

    setIsLoggedIn(cookieExist(document));
    if (isLoggedIn === true) {
      getUser(document, process.env.NEXT_PUBLIC_API_URL, setUser);
    }

    const fetchRandomProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/product/rand`,
        );

        if (!response.ok) {
          throw new Error('Error al obtener los productos aleatorios');
        }

        const data = await response.json();
        setProducts(data.data.products);
      } catch (error) {
        handleFetchError(error);
      }
    };

    if (products.length === 0) {
      fetchRandomProducts();
    }
  }, [products]);

  const fetchNextProducts = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleClick = () => {
    if (!isClicked) {
      setIsClicked(true);
    }
    setTimeout(() => {
      setIsClicked(false);
    }, 2000);
  };

  const handleGuess = (isHigher) => {
    const currentProduct = products[currentIndex];
    const nextProduct = products[(currentIndex + 1) % products.length];

    if (
      (isHigher && nextProduct.price > currentProduct.price) ||
      (!isHigher && nextProduct.price < currentProduct.price)
    ) {
      setScore((prevScore) => prevScore + 1);
      handleVSColorChange('success');
    } else {
      setPrevScore(score);
      setTimeout(() => {
        let message = '';
        let message2 = '';
        let gifUrl = '';
        if (score === 0) {
          gifUrl =
            'https://i.pinimg.com/originals/32/c4/2f/32c42f1cfd2ad0b6978b15c811356b21.gif';
          message = 'Este puntaje es malo por demas!';
          message2 = 'Ponéle empeño, che...';
        } else if (score === 1) {
          gifUrl =
            'https://i.pinimg.com/originals/67/89/8a/67898a4a9b640896e06e0eb6637decfe.gif';
          message = '🫠 ¿1 punto nomás? 🫠';
          message2 = 'Ponele un poco mas de voluntad la proxima :)';
        } else if (score > 1 && score < 5) {
          gifUrl =
            'https://i.pinimg.com/originals/c2/f5/d5/c2f5d5feddb9e95cb071198f7c6f80f3.gif';
          message = 'Bueno... Nada mal!';
          message2 = 'Lo intentaste aunque sea, peor es... nada?';
        } else if (score >= 5 && score < 10) {
          gifUrl =
            'https://i.pinimg.com/originals/5c/92/48/5c92483871c83c469f10b94e3f08b1f5.gif';
          message = 'Messirve!';
          message2 = 'Buen puntaje (Aunque podría ser mejor)';
        } else if (score >= 10) {
          gifUrl =
            'https://i.pinimg.com/originals/fb/f1/6d/fbf16df54626dc47097536dfb899698a.gif';
          message = 'ufff excelente puntaje che...';
          message2 = "Messi está orgulloso de vos :')";
        }
        setGameOverMessage({ message, message2, gifUrl });
        setShowGameOver(true);
      }, 2000);

      setScore(0);
      handleVSColorChange('fail');
    }
  };

  const handleVSColorChange = (colorClass) => {
    const vsDiv = document.getElementById('vsDiv');

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
          fetchNextProducts();
        }, 1000);
      }, 1000);
    }
  };

  const saveScore = async (userScore) => {
    const jwt = getCookie(document);
    console.log(jwt);
    console.log(userScore);

    const axiosInstance = axios.create({
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    try {
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/score`,
        {
          // Aquí puedes incluir los datos que desees enviar en el cuerpo del POST
          // Por ejemplo, si `score` es un objeto con propiedades como `name`, `userId`, etc.
          // puedes hacer algo como:
          score: userScore,
        },
      );

      console.log(response.data); // Puedes manejar la respuesta según tus necesidades
    } catch (error) {
      console.error(error);
      // Puedes manejar el error según tus necesidades
    }
  };

  return (
    <div className="flex text-black flex-col items-center min-h-screen h-full p-8">
      {showGameOver ? (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${gameOverMessage.gifUrl})`,
            }}
          ></div>

          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80"></div>
          <div className="flex flex-col justify-center items-center relative z-10">
            <p className="text-white mb-3 text-3xl">Tu puntaje:</p>
            <p className="text-yellow-500 font-bold text-6xl">{prevScore}</p>
            <p className="text-white mt-6 text-xl">{gameOverMessage.message}</p>
            <p className="text-white text-xl">{gameOverMessage.message2}</p>
            <div className="flex flex-row justify-center items-center">
              <div
                className=" text-white py-5 px-8 border-2 border-white text-xl m-5 rounded-full hover:bg-white hover:text-black transition-all cursor-pointer"
                onClick={() => {
                  setShowGameOver(false);
                }}
              >
                Volver a jugar
              </div>
              <Link
                href="/"
                className=" text-white py-5 px-8 border-2 border-white text-xl m-5 rounded-full hover:bg-white hover:text-black transition-all"
              >
                Volver al Menu
              </Link>
              <div
                className=" text-white py-5 px-8 border-2 border-white text-xl m-5 rounded-full hover:bg-white hover:text-black transition-all cursor-pointer"
                onClick={() => {
                  saveScore(prevScore);
                }}
              >
                Guardar Puntaje
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col ">
          <div className="flex w-full justify-between">
            {products.length > 0 ? (
              <Card product={products[currentIndex]} />
            ) : (
              <div
                className="card border pulsating bg-white rounded-md overflow-hidden shadow-md m-4 flex flex-col"
                style={{ width: '300px', height: '450px' }}
              ></div>
            )}
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
            {products.length > 0 ? (
              <Card
                product={products[(currentIndex + 1) % products.length]}
                second={true}
              />
            ) : (
              <div
                className="card pulsating border bg-white rounded-md overflow-hidden shadow-md m-4 flex flex-col"
                style={{ width: '300px', height: '450px' }}
              ></div>
            )}
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
            <div
              className={`flex flex-row ${isClicked ? 'hidden' : ''}`}
              onClick={() => handleClick()}
            >
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
