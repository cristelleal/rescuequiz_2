import { useState, useEffect } from 'react';
import {
  setPersistence,
  browserSessionPersistence,
  getAuth,
} from 'firebase/auth';
import { auth, db } from '../../firebase/firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { formatQuizCount } from '../utils/utils';
import Button from '../components/button/Button';
import './userAccount.css';

function UserAccount() {
  const [name, setName] = useState('');
  const [quizzCount, setQuizzCount] = useState(0);
  const [averageScore, setAverageScore] = useState(0);

  const fetchUserData = async () => {
    if (auth.currentUser) {
      const docRef = doc(db, 'users', auth.currentUser.uid);
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setName(userData.name);
          setQuizzCount(userData.quizzCount);
          const totalScore = userData.quizzScores.reduce(
            (a: number, b: number) => a + b,
            0
          );
          setAverageScore(Math.round(totalScore / userData.quizzCount));
        }
      } catch (error: any) {
        throw new Error('Error fetching user data:', error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authInstance = getAuth();
        await setPersistence(authInstance, browserSessionPersistence);
        await fetchUserData();
      } catch (error: any) {
        throw new Error('Error persistance user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
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
                styles={
                  buildStyles({
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
      </div>
    </>
  );
}

export default UserAccount;
