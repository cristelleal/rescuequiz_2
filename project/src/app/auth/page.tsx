'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMutation } from 'react-query';
import { validateEmail, validatePassword } from '../utils/utils';
import Form from '../components/form/Form';
import { signIn, useSession } from 'next-auth/react';

const Auth = () => {
  const session = useSession();
  const errorMessage = '';

  const { mutate } = useMutation(
    ({ email, password }: { email: string; password: string }) => {
      return signIn('credentials', {
        email,
        password,
        callbackUrl: '/quizzlist',
      });
    },
    {
      onSuccess: () => {
        console.log('Sign in successful');
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  useEffect(() => {
    console.log(session);
  }, [session]);

  const handleSignIn = (email: string, password: string) => {
    if (!validateEmail(email)) {
      return 'Veuillez remplir une adresse e-mail valide';
    }
    if (!validatePassword(password)) {
      return 'Le mot de passe est invalide : Il doit contenir entre 6 et 20 caractères';
    }
    mutate({ email, password });
  };

  return (
    <>
      <section className='bg-white'>
        <div className='lg:grid lg:min-h-screen lg:grid-cols-12'>
          <section className='relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6'>
            <Image
              alt='Night'
              src='/ambulance.webp'
              className='absolute inset-0 h-full w-full object-cover opacity-80'
              height={1000}
              width={1000}
            />
            <div className='hidden lg:relative lg:block lg:p-12 lg:mb-8'>
              <div className='flex justify-center items-center space-x-2'>
                <svg
                  width='30'
                  height='30'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='mt-6 sm:w-[35px] sm:h-[35px]'
                >
                  <path
                    d='M1.70479 11.2022H6.61682C6.65634 11.2022 6.69216 11.1784 6.70821 11.1415L8.36748 7.32266C8.40266 7.24168 8.51507 7.24168 8.55025 7.32266L11.9281 15.0968C11.9622 15.1753 12.0701 15.1784 12.1085 15.102L14.0677 11.2022L14.9778 9.34026C15.0147 9.26488 15.1199 9.26488 15.1567 9.34026L16.0393 11.1457C16.0562 11.1803 16.0908 11.2022 16.1287 11.2022H22.2952M11.7709 3.848C11.8237 3.90074 11.8753 3.95418 11.9258 4.00829C11.9661 4.05153 12.0339 4.05153 12.0742 4.00829C12.1247 3.95418 12.1763 3.90074 12.2291 3.848C14.6917 1.3854 18.6859 1.3838 21.1505 3.84442C23.6151 6.30505 23.6167 10.2961 21.1541 12.7587C21.1513 12.7615 21.1485 12.7643 21.1457 12.767L12.7193 21.6878C12.3261 22.104 11.6738 22.1041 11.2807 21.6879L2.8459 12.7587C0.383301 10.2961 0.384905 6.30505 2.84949 3.84442C5.31407 1.3838 9.30834 1.3854 11.7709 3.848Z'
                    stroke='white'
                    strokeWidth='2'
                    strokeLinecap='round'
                  />
                </svg>
                <h2 className='mt-6 text-4xl font-extrabold text-white text-center'>
                  RESCUE QUIZ
                </h2>
              </div>
              <p className='mt-4 leading-relaxed text-white/90'>
                Bienvenue ! Identifiez-vous afin d&apos;accéder à votre espace
                personnel. Testez vos connaissances sur les gestes de secours en
                France et suivez votre évolution
              </p>
            </div>
          </section>
          <main className='flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6'>
            <div className='max-w-xl lg:max-w-3xl'>
              <div className='relative -mt-16 block lg:hidden'>
                <div className='flex justify-center items-center space-x-2'>
                  <svg
                    width='32'
                    height='32'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M1.70479 11.2022H6.61682C6.65634 11.2022 6.69216 11.1784 6.70821 11.1415L8.36748 7.32266C8.40266 7.24168 8.51507 7.24168 8.55025 7.32266L11.9281 15.0968C11.9622 15.1753 12.0701 15.1784 12.1085 15.102L14.0677 11.2022L14.9778 9.34026C15.0147 9.26488 15.1199 9.26488 15.1567 9.34026L16.0393 11.1457C16.0562 11.1803 16.0908 11.2022 16.1287 11.2022H22.2952M11.7709 3.848C11.8237 3.90074 11.8753 3.95418 11.9258 4.00829C11.9661 4.05153 12.0339 4.05153 12.0742 4.00829C12.1247 3.95418 12.1763 3.90074 12.2291 3.848C14.6917 1.3854 18.6859 1.3838 21.1505 3.84442C23.6151 6.30505 23.6167 10.2961 21.1541 12.7587C21.1513 12.7615 21.1485 12.7643 21.1457 12.767L12.7193 21.6878C12.3261 22.104 11.6738 22.1041 11.2807 21.6879L2.8459 12.7587C0.383301 10.2961 0.384905 6.30505 2.84949 3.84442C5.31407 1.3838 9.30834 1.3854 11.7709 3.848Z'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinecap='round'
                    />
                  </svg>
                  <h1 className='mt-0 text-4xl font-extrabold text-white'>
                    RESCUE QUIZ
                  </h1>
                </div>
                <p className='mt-8 leading-relaxed text-gray-500 mb-12'>
                  Identifiez-vous afin d&apos;accéder à votre compte
                </p>
              </div>
              <Form
                handleFormSubmit={handleSignIn}
                setFormErrorMessage={errorMessage}
                buttonText='Se connecter'
              />{' '}
              <Link href='/signup'>
                <p className='mt-12 text-sm text-gray-500 text-center sm:mt-4'>
                  <span className='text-gray-700 underline'>
                    Créér un compte
                  </span>
                </p>
              </Link>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default Auth;
