'user client'
import Link from 'next/link';
import Image from 'next/image';

function Error() {
  return (
    <div className='flex h-screen flex-col bg-white'>
      <Image
        src='/health.webp'
        alt='first aid kit background'
        className='h-64 w-full object-cover'
        height={1000}
        width={1000}
      />

      <div className='flex flex-1 items-center justify-center'>
        <div className='mx-auto max-w-xl px-4 py-8 text-center'>
          <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Erreur 404
          </h1>

          <p className='mt-4 text-gray-500'>
            Malheureusement nous ne trouvons pas la page recherchée
          </p>

          <Link href='/useraccount'>
            <p className='text-sm text-gray-500 text-center sm:mt-4'>
              <span className='text-gray-700 underline'>
                Retour à l&apos;espace personnel
              </span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Error;
