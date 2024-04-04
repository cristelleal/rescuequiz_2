"use client"
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQueryClient } from 'react-query';

function Navigation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleSignOut = async () => {
    try {
      queryClient.clear();
      router.push('/');
    } catch (error: any) {
      throw new Error('Logout error:', error);
    }
  };

  const handleClick = () => {
    router.push('/userAccount');
  };

  return (
    <nav
      aria-label='Breadcrumb'
      className='mt-12 flex justify-center items-center'
    >
      <ol className='flex items-center gap-1 text-sm text-white'>
        <li>
          <Link href='/quizzlist'>
            <div className='block transition cursor-pointer'>
              <span className='sr-only'> Home </span>

              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                />
              </svg>
            </div>
          </Link>
        </li>

        <li>
          <span className='mx-2 text-white'>•</span>
        </li>

        <li>
          <div
            onClick={handleClick}
            className='block transition hover:underline cursor-pointer'
          >
            Espace personnel
          </div>
        </li>

        <li>
          <span className='mx-2 text-white'>•</span>
        </li>

        <li>
          <div
            onClick={handleSignOut}
            className='block transition hover:underline cursor-pointer'
          >
            Se déconnecter
          </div>
        </li>
      </ol>
    </nav>
  );
}

export default Navigation;
