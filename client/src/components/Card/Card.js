import React from 'react';
import Image from 'next/image';

function Card({ product, second }) {
  return (
    <div className={`flex ${second ? 'justify-end' : ''}`}>
      {/* Tarjeta para pantallas grandes (lg, xl, md) */}
      <div
        className="card border bg-white rounded-md overflow-hidden shadow-md m-4 flex flex-col lg:block xl:block md:block hidden"
        style={{ width: '300px', height: '450px' }}
      >
        <div className="h-60 relative">
          <Image
            src={product?.imageUrl}
            alt={product?.name}
            layout="fill"
            objectFit="contain"
            sizes="(max-width: 640px) 100vw, 300px"
          />
        </div>
        <div className="p-4 flex-grow">
          <span className="bg-blue-500 text-xs p-1 font-semibold text-white rounded-sm">
            OFERTA DEL DÍA
          </span>
          <h2 className="text-2xl my-2 font-semibold mb-2">
            ${' '}
            {second ? '?????' : new Intl.NumberFormat().format(product?.price)}
          </h2>
          <p className="text-green-600">Envío gratis</p>
          <p className="text-gray-600 text-sm">
            {product?.name.length > 45
              ? `${product?.name.slice(0, 41)}...`
              : product?.name}
          </p>
        </div>
      </div>

      {/* Tarjeta para pantallas pequeñas (sm) */}
      <div
        className="card border bg-white rounded-md overflow-hidden shadow-md m-4 flex flex-col lg:hidden xl:hidden sm:block md:hidden"
        style={{ width: '200px', height: '225px' }}
      >
        <div className="h-60 relative">
          <Image
            src={product?.imageUrl}
            alt={product?.name}
            layout="fill"
            objectFit="contain"
            sizes="(max-width: 640px) 100vw, 150px"
          />
        </div>
        <div className="p-4 h-40 flex-grow">
          <span className="bg-blue-500 text-xs p-1 font-semibold text-white rounded-sm">
            OFERTA DEL DÍA
          </span>
          <h2 className="text-sm my-2 font-semibold mb-2">
            ${' '}
            {second ? '?????' : new Intl.NumberFormat().format(product?.price)}
          </h2>
          <p className="text-gray-600 text-xs">
            {product?.name.length > 45
              ? `${product?.name.slice(0, 41)}...`
              : product?.name}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
