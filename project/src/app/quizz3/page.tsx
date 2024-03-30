'use client';
import Quizz from '../components/quizz/Quizz';
import { data3 } from '@/assets/data/data3';

const Quizz3 = () => {
  return (
    <>
      <Quizz quizzData={data3} title={'Quiz numéro 3'} />
    </>
  );
};

export default Quizz3;
