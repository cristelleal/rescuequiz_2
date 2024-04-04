'use client';
import React, { useState } from 'react';
import Navigation from '../components/navigation/Navigation';
import FooterElement from '../components/footerElement/FooterElement';
import Link from 'next/link';
import Button from '../components/button/Button';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { formatQuizCount } from '../utils/utils';
import './userAccount.css';

const ClientComponentUserAccount = () => {
  const [name, setName] = useState('');
  const [quizzCount, setQuizzCount] = useState(0);
  const [averageScore, setAverageScore] = useState(0);

  // Get score et quizCount from API

  return (
    <div className='min-h-screen flex flex-col justify-start'>
      <Navigation />
      <section className='bg-white/95 mt-4 mx-2 sm:mx-12 shadow-sm border border-gray-100 rounded'>
        <div className='mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8'>
          <div className='mx-auto max-w-3xl text-center'>
            <h2 className='text-2xl font-bold text-gray-900 sm:text-3xl'>
              Bienvenue {name} 👋
            </h2>
          </div>
          <div className='mt-6 flex justify-center items-center'>
            <Link href='/quizzlist'>
              <Button buttonText='Accéder aux quiz' />
            </Link>
          </div>
          <div className='mt-6'>
            <dl className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div className='bg-white flex flex-col rounded-lg border border-gray-100 p-4 shadow-sm px-4 py-8 text-center'>
                <dt className='order-last text-lg font-medium text-gray-500'>
                  Score total
                </dt>
                <dd className='text-3xl font-extrabold text-red-500 md:text-5xl flex justify-center align-center'>
                  <div className='circular-progress-bar'>
                    <CircularProgressbar
                      styles={buildStyles({
                        textColor: '#EF4444',
                        pathColor: `#EF4444`,
                      })}
                      value={averageScore}
                      text={`${averageScore}%`}
                    />
                  </div>
                </dd>
              </div>

              <div className='bg-white flex flex-col rounded-lg border border-gray-100 p-4 shadow-sm px-4 py-8 text-center flex justify-center align-center'>
                <dt className='order-last text-lg font-medium text-gray-500'>
                  {formatQuizCount(quizzCount)}
                </dt>
                <dd className='text-4xl font-extrabold text-red-500 md:text-5xl'>
                  {quizzCount}
                </dd>
              </div>
            </dl>
          </div>{' '}
        </div>
      </section>
      <FooterElement />
    </div>
  );
};

export default ClientComponentUserAccount;
