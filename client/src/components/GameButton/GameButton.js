import React from 'react';
import Image from 'next/image';

function GameButton({ color, children, name, handleGuess }) {
  return (
    <div
      onClick={() => (color === 'red' ? handleGuess(false) : handleGuess(true))}
      className={`flex flex-col justify-center items-center mx-4 cursor-pointer hover-button-game-${color}`}
    >
      <Image
        src={`/${color}Logo.png`}
        alt={`${name}`}
        width={100}
        height={100}
      />
      <button
        className={`button-game-${color} text-white font-bold rounded-full p-2`}
      >
        {children}
      </button>
    </div>
  );
}

export default GameButton;
