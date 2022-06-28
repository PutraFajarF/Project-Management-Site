import { useState, useEffect } from "react";
import { projectAuth, projectStorage } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";


export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (displayName, email, password, thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      // signup user
      const response = await projectAuth.createUserWithEmailAndPassword(email, password);

      if (!response) {
        throw new Error('Could not complete signup');
      }

      // upload user thumbnail
      const uploadPath = `thumbnails/${response.user.uid}/${thumbnail.name}`;
      const img = await projectStorage.ref(uploadPath).put(thumbnail);
      const imgUrl = await img.ref.getDownloadURL();

      // add display name to user
      await response.user.updateProfile({ displayName, photoURL: imgUrl });

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: response.user })

      // update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }

    } catch (err) {
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

  return { error, isPending, signup }
}