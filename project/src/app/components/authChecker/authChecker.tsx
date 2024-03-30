import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

function AuthChecker({ children }: any) {
  const router = useRouter();
  
  useEffect(() => {
    const authInstance = getAuth();
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      if (!user) {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return <>{children}</>;
}

export default AuthChecker;
