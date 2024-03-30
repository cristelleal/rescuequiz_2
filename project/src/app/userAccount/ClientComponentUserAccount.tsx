'use client'
import React, { ReactNode } from 'react';
import Navigation from '../components/navigation/Navigation';
import FooterElement from '../components/footerElement/FooterElement';
import AuthChecker from '../components/authChecker/authChecker';

const ClientComponentUserAccount = ({ children }: { children: ReactNode }) => {
  return (
    <div className='min-h-screen flex flex-col justify-start'>
      <AuthChecker>
        <Navigation />
        <section className='bg-white/95 mt-4 mx-2 sm:mx-12 shadow-sm border border-gray-100 rounded'>
          <div className='mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8'>
           {children}
          </div>
        </section>
        <FooterElement />
      </AuthChecker>
    </div>
  );
};

export default ClientComponentUserAccount;
