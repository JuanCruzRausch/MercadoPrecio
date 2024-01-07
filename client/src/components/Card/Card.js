import React from 'react';
import Image from 'next/image';

function Card({ product, second }) {
  return (
    <div
      className="card border bg-white rounded-md overflow-hidden shadow-md m-4 flex flex-col"
      style={{ width: '300px', height: '450px' }}
    >
      <div className="h-60 flex justify-center items-center">
        <Image
          src={product?.imageUrl}
          alt={product?.name}
          width={200}
          height={250}
        />
      </div>
      <div className="p-4 flex-grow">
        <span className="bg-blue-500 text-xs p-1 font-semibold text-white rounded-sm">
          OFERTA DEL DÍA
        </span>
        <h2 className="text-2xl my-2 font-semibold mb-2">
          $ {second ? '?????' : product?.price}
        </h2>
        <p className="text-green-600">Envío gratis</p>
        <p className="text-gray-600 text-sm">
          {product?.name.length > 45
            ? `${product?.name.slice(0, 41)}...`
            : product?.name}
        </p>
      </div>
    </div>
  );
}

export default Card;
