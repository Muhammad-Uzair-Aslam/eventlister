import { useState } from 'react';
import { signUpUser } from '../store/slices/AuthSlice';
import { useAppDispatch } from '../store/hook'; // Import the dispatch hook

// Define the type for form data
interface FormData {
  name: string;
  email: string;
  password: string;
}

const useSignUp = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', password: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'succeeded' | 'failed'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = () => {
    const { name, email, password } = formData;
    if (!name || !email || !password) {
      setError('Please fill all the fields.');
      return;
    }

    setStatus('loading');
    setError(null);

    dispatch(signUpUser({ name, email, password }))
      .unwrap()
      .then(() => {
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
    handleSignUp,
  };
};

export default useSignUp;
