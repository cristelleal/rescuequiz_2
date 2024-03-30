'use client';
import Quizz from '../components/quizz/Quizz';
import { data } from '@/assets/data/data';

const Quizz1 = () => {
  return (
    <>
      <Quizz quizzData={data} title={'Quiz numéro 1'} />
    </>
  );
};

export default Quizz1;
