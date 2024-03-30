import { useRef, useState, useEffect } from 'react';
import Link from 'next/link'; 
import { db, auth } from '../../../firebase/firebase.config';
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { increment, doc, setDoc, arrayUnion } from 'firebase/firestore';
import FooterElement from '../footerElement/FooterElement';
import Button from '../button/Button';
import AuthChecker from '../authChecker/authChecker';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './quizz.css';
import Navigation from '../navigation/Navigation';
import { quizzType } from '@/app/types';

function Quizz({ quizzData, title }: quizzType) {
  let [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(quizzData[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [showAdvice, setShowAdvice] = useState(false);

  let option1 = useRef<HTMLLIElement>(null);
  let option2 = useRef<HTMLLIElement>(null);
  let option3 = useRef<HTMLLIElement>(null);

  const optionArray = [option1, option2, option3];

  const checkAnswer = (element: any, answer: number) => {
    if (lock === false) {
      if (question.answer === answer) {
        element.target.classList.add('correct');
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        element.target.classList.add('wrong');
        setLock(true);
        optionArray[question.answer - 1].current!.classList.add('correct');
        setShowAdvice(true);
      }
    }
  };

  const next = async () => {
    if (lock) {
      if (index === quizzData.length - 1) {
        setResult(true);
        if (auth.currentUser) {
          const userRef = doc(db, 'users', auth.currentUser.uid);
          try {
            await setDoc(
              userRef,
              {
                quizzCount: increment(1),
                quizzScores: arrayUnion(percentage),
              },
              { merge: true }
            );
          } catch (error: any) {
            throw new Error('Error updating quizzCount:', error);
          }
        }
        return 0;
      }
      setIndex((index += 1));
      setQuestion(quizzData[index]);
      setLock(false);
      setShowAdvice(false);
      optionArray.forEach((option) => {
        option.current!.classList.remove('wrong', 'correct');
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(quizzData[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  const calculateSuccessPercentage = () => {
    return Math.round((score / quizzData.length) * 100);
  };

  const percentage = calculateSuccessPercentage();
  const isScoreAboveHalf = calculateSuccessPercentage() > 50;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authInstance = getAuth();
        await setPersistence(authInstance, browserSessionPersistence);
      } catch (error: any) {
        throw new Error('Error :', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='min-h-screen flex flex-col justify-start'>
      <AuthChecker>
      <Navigation />
        <div className='p-2'></div>
        <main className='main-section'>
          <div className='container'>
            <div className='title'>
              <h1>{title}</h1>
              <div className='loader'></div>
            </div>
            {result ? (
              <></>
            ) : (
              <>
                <h2>
                  {index + 1}. {question.question}
                </h2>
                <ul>
                  <li
                    ref={option1}
                    onClick={(element) => {
                      checkAnswer(element, 1);
                    }}
                  >
                    {question.option1}
                  </li>
                  <li
                    ref={option2}
                    onClick={(element) => {
                      checkAnswer(element, 2);
                    }}
                  >
                    {question.option2}
                  </li>
                  <li
                    ref={option3}
                    onClick={(element) => {
                      checkAnswer(element, 3);
                    }}
                  >
                    {question.option3}
                  </li>
                </ul>
                <div className='flex justify-center'>
                  <Button buttonText='Suivant' handleClick={next} />
                </div>
                {showAdvice && (
                  <div className='bg-red-50 p-4 rounded text-gray-700 text-sm'>
                    <p>
                      💡 {question.advice}
                    </p>
                  </div>
                )}
                <div className='index'>
                  {index + 1} sur {quizzData.length} questions
                </div>
              </>
            )}
            {result ? (
              <>
                <div className='percentage-box'>
                  <div className='percentage'>
                    <CircularProgressbar
                      styles={buildStyles({
                        textColor: '#EF4444',
                        pathColor: `#EF4444`,
                      })}
                      value={percentage}
                      text={`${percentage}%`}
                    />
                  </div>
                </div>
                {isScoreAboveHalf ? (
                  <div className='result-container'>
                    <p className='score-infos'>
                      Félicitations ! Vous avez obtenu un score supérieur à la
                      moyenne, continuez comme ça !
                    </p>
                  </div>
                ) : (
                  <div className='result-container'>
                    <p className='score-infos'>
                      Vous avez obtenu un score inférieur ou égal à la moyenne.
                      <br />
                      <a
                        className='link'
                        href='https://www.croix-rouge.fr/les-gestes-de-premiers-secours'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        🔗 Se renseigner sur les gestes de premiers secours
                      </a>
                    </p>
                  </div>
                )}
                <div className='flex justify-center'>
                  <Button buttonText='Recommencer' handleClick={reset} />
                </div>
                <Link href='/userAccount'>
                  <p className='text-sm text-gray-500 text-center sm:mt-4'>
                    <span className='text-gray-700 underline'>
                      Espace personnel
                    </span>
                  </p>
                </Link>
              </>
            ) : (
              <></>
            )}
          </div>
        </main>
        <FooterElement />
      </AuthChecker>
    </div>
  );
}

export default Quizz;
