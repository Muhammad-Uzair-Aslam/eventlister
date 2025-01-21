import { useState } from 'react';
import { signInUser } from '../store/slices/AuthSlice';
import { useAppDispatch } from '../store/hook'; // Adjust the path
import { SignInFormData } from '../types/AuthTypes'; // Import types

const useSignIn = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<SignInFormData>({ email: '', password: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'succeeded' | 'failed'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = () => {
    const { email, password } = formData;
    if (!email || !password) {
      setError('Please fill all the fields.');
      return;
    }

    setStatus('loading');
    setError(null);

    dispatch(signInUser({ email, password }))
      .unwrap()
      .then((user) => {
        setStatus('succeeded');
      })
      .catch((err) => {
        setStatus('failed');
        setError(err.message || 'Something went wrong');
      });
  };

  return {
    formData,
    setFormData,
    status,
    error,
    handleSignIn,
  };
};

export default useSignIn;
