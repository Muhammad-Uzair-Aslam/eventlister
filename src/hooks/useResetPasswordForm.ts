import {useState} from 'react';

const useResetPasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const currentPasswordHandler = (text: string) => setCurrentPassword(text);
  const newPasswordHandler = (text: string) => setNewPassword(text);
  const confirmPasswordHandler = (text: string) => setConfirmPassword(text);

  return {
    currentPassword: {value: currentPassword, onChange: currentPasswordHandler},
    newPassword: {value: newPassword, onChange: newPasswordHandler},
    confirmPassword: {value: confirmPassword, onChange: confirmPasswordHandler},
  };
};

export default useResetPasswordForm;
