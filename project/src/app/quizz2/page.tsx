'use client';
import Quizz from '../components/quizz/Quizz';
import { data2 } from '@/assets/data/data2';

const Quizz2 = () => {
  return (
    <>
      <Quizz quizzData={data2} title={'Quiz numéro 2'} />
    </>
  );
};

export default Quizz2;
