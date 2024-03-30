import { useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { db } from '../../firebase/firebase.config';
import { setDoc, doc } from 'firebase/firestore';
import handleFirebaseError from '../../firebase/handleFirebaseError';
import { validateName, validateEmail, validatePassword } from '../utils/utils';
import Form from '../components/form/Form';
import Input from '../components/input/Input';
import { useRouter } from 'next/navigation';

function SignUp() {
  const [name, setName] = useState('');
  const errorMessage = '';
  const router = useRouter();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSignUp = async (email: string, password: string) => {
    if (!validateName(name)) {
      return 'Veuillez remplir un nom valide (3 à 16 caractères)';
    }
    if (!validateEmail(email)) {
      return 'Veuillez remplir une adresse e-mail valide';
    }
    if (!validatePassword(password)) {
      return 'Le mot de passe est invalide : Il doit contenir entre 6 et 20 caractères';
    }
    try {
      const authInstance = getAuth();
      await setPersistence(authInstance, browserSessionPersistence);
      const userCredential = await createUserWithEmailAndPassword(
        authInstance,
        email,
        password
      );
      const userRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(
        userRef,
        {
          uid: userCredential.user.uid,
          quizzCount: 0,
          name: name,
        },
        { merge: true }
      );
      router.push('/quizzlist');
    } catch (error) {
      return handleFirebaseError(error);
    }
  };

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
    <>
      <Input
        type='text'
        placeholder=''
        value={name}
        onChange={handleNameChange}
      />
      <Form
        handleFormSubmit={handleSignUp}
        setFormErrorMessage={errorMessage}
        buttonText='Créer un compte'
      />
    </>
  );
}

export default SignUp;
