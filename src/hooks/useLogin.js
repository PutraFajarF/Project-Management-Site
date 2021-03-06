import { useState, useEffect } from 'react';
import { projectAuth, projectFirestore } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);
  
    try {
      // login
      const response = await projectAuth.signInWithEmailAndPassword(email, password);

      // update online status
      await projectFirestore.collection('users').doc(response.user.uid).update({ online: true });

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: response.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  }

  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { login, isPending, error };
}