import {
  signInWithEmailAndPassword,
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import handleFirebaseError from '../../firebase/handleFirebaseError';
import { validateEmail, validatePassword } from '../utils/utils';
import Form from '../components/form/Form';
import { useRouter } from 'next/navigation';

function Auth() {
  const errorMessage = '';
  const router = useRouter();

  const handleSignIn = async (email: string, password: string) => {
    if (!validateEmail(email)) {
      return 'Veuillez remplir une adresse e-mail valide';
    }
    if (!validatePassword(password)) {
      return 'Le mot de passe est invalide : Il doit contenir entre 6 et 20 caractères';
    }
    try {
      const authInstance = getAuth();
      await setPersistence(authInstance, browserSessionPersistence);
      await signInWithEmailAndPassword(authInstance, email, password);
      router.push('/quizzlist');
    } catch (error) {
      return handleFirebaseError(error);
    }
  };

  return (
    <>
      <Form
        handleFormSubmit={handleSignIn}
        setFormErrorMessage={errorMessage}
        buttonText='Se connecter'
      />
    </>
  );
}

export default Auth;
