import React from 'react';
import { ButtonType } from '@/app/types';

const Button = ({ buttonText, handleClick }: ButtonType) => {
  return (
    <div className='col-span-6 sm:flex sm:items-center sm:gap-4 mt-4 mb-4'>
      <button
        className='inline-block shrink-0 rounded-md border border-red-500 bg-red-500 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-red-600 focus:outline-none focus:ring active:text-red-300'
        onClick={handleClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Button;
