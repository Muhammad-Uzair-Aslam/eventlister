import {useDispatch} from 'react-redux';
import {resetPassword} from '../store/slices/AuthSlice';
import {AppDispatch} from '../store/Store';
import {useState} from 'react';

const useResetPasswordDispatch = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleResetPassword = async (
    currentPassword: string,
    newPassword: string,
  ) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await dispatch(resetPassword({currentPassword, newPassword})).unwrap();
      setSuccessMessage('Password updated successfully');
    } catch (err) {
      setError(err as string);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleResetPassword,
    isLoading,
    error,
    successMessage,
  };
};

export default useResetPasswordDispatch;
