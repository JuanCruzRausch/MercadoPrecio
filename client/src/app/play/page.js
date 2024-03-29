'use client';
import Card from '@/components/Card/Card';
import GameButton from '@/components/GameButton/GameButton';
import cookieExist from '@/utils/cookieExist';
import getCookie from '@/utils/getCookie';
import getUser from '@/utils/getUser';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [prevScore, setPrevScore] = useState(0);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showProd, setShowProd] = useState(false);
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
  const [saveScoreError, setSaveScoreError] = useState(null);
  const [saveScoreSuccess, setSaveScoreSuccess] = useState(null);
  const [isClickedSave, setIsClickedSave] = useState(false);

  const router = useRouter();

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
        setTimeout(() => {
          setShowProd(true);
        }, 500);
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
          gifUrl = '/0Messi.gif';
          message = 'Este puntaje es malo por demas!';
          message2 = 'Ponéle empeño, che...';
        } else if (score === 1) {
          gifUrl = '/1Messi.gif';
          message = '🫠 ¿1 punto nomás? 🫠';
          message2 = 'Ponele un poco mas de voluntad la proxima :)';
        } else if (score > 1 && score < 5) {
          gifUrl = '/2Messi.gif';
          message = 'Bueno... Nada mal!';
          message2 = 'Lo intentaste aunque sea, peor es... nada?';
        } else if (score >= 5 && score < 10) {
          gifUrl = '/3Messi.gif';
          message = 'Messirve!';
          message2 = 'Buen puntaje (Aunque podría ser mejor)';
        } else if (score >= 10) {
          gifUrl = '/4Messi.gif';
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
          score: userScore,
        },
      );

      setSaveScoreSuccess('Guardado con éxito');

      setTimeout(() => {
        router.push('/mis-puntajes');
      }, 2000);
    } catch (error) {
      setSaveScoreError('Debes estar logueado para subir puntajes');

      setTimeout(() => {
        router.push('/ingresa');
      }, 2000);
    }
  };

  return (
    <div className="flex text-black flex-col items-center min-h-screen h-full p-0 xl:p-8 lg:p-8 md:p-8">
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
            <div className="flex flex-col justify-center items-center md:flex-row lg:flew-row xl:flex-row">
              <div
                className=" text-white py-5 px-8 border-2 border-white text-xl m-5 rounded-full hover:bg-white hover:text-black transition-all cursor-pointer"
                onClick={() => {
                  setShowGameOver(false);
                  setSaveScoreError(null);
                  setSaveScoreSuccess(null);
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
                className={`text-white py-5 px-8 border-2 border-white text-xl m-5 rounded-full hover:bg-white hover:text-black transition-all cursor-pointer ${
                  isClickedSave ? 'invisible' : null
                }`}
                onClick={() => {
                  setIsClickedSave(true);
                  saveScore(prevScore);
                }}
              >
                Guardar Puntaje
              </div>
            </div>
            {saveScoreError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mt-4 rounded-full">
                {saveScoreError}
              </div>
            )}
            {saveScoreSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 mt-4 rounded-full">
                {saveScoreSuccess}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex w-full flex-col lg:flex-row xl:flex-row md:flex-row">
            {showProd ? (
              <Card product={products[currentIndex]} />
            ) : (
              <>
                <div
                  className="card border pulsating bg-white rounded-md overflow-hidden shadow-md m-4 flex flex-col lg:block xl:block md:block hidden"
                  style={{ width: '300px', height: '450px' }}
                ></div>
                <div
                  className="card border pulsating bg-white rounded-md overflow-hidden shadow-md m-4 flex flex-col lg:hidden xl:hidden sm:block md:hidden"
                  style={{ width: '200px', height: '225px' }}
                ></div>
              </>
            )}
            <div className="flex items-center flex-col justify-between">
              <h2 className="bg-blue-500 mb-2 text-sm py-1 px-3 font-semibold text-white rounded-sm md:mb-0 md:text-xl lg:mb-0 lg:text-xl xl:mb-0 xl:text-xl">
                Puntuación: {score}
              </h2>
              <div
                id="vsDiv"
                className="bg-navbar transition-bg-vs shadow-md font-semibold py-3 px-4 md:py-6 md:px-7 lg:py-6 lg:px-7 xl:py-6 xl:px-7"
              >
                VS
              </div>
              <div></div>
            </div>
            {showProd ? (
              <Card
                product={products[(currentIndex + 1) % products.length]}
                second={true}
              />
            ) : (
              <div className="flex justify-end">
                <div
                  className="card border pulsating bg-white rounded-md overflow-hidden shadow-md m-4 flex flex-col lg:block xl:block md:block hidden"
                  style={{ width: '300px', height: '450px' }}
                ></div>
                <div
                  className="card border pulsating bg-white rounded-md overflow-hidden shadow-md m-4 flex flex-col lg:hidden xl:hidden sm:block md:hidden"
                  style={{ width: '200px', height: '225px' }}
                ></div>
              </div>
            )}
          </div>

          <div className="flex w-full justify-center items-center flex-col">
            <h2 className="bg-navbar shadow-md my-5 md:p-2 md:text-2xl lg:p-2 lg:text-2xl xl:p-2 xl:text-2xl">
              ¿El producto de la derecha tendrá un precio más alto o más bajo?
            </h2>
            <div
              className={`flex flex-row ${isClicked ? 'invisible' : ''}`}
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
            {saveScoreError && (
              <div className="text-red-500 text-lg mt-3">{saveScoreError}</div>
            )}
            {saveScoreSuccess && (
              <div className="text-green-500 text-lg mt-3">
                {saveScoreSuccess}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
