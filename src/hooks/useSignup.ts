import { useState } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/Store';
import { signUpUser } from '../store/slices/AuthSlice';
import { useAppDispatch } from '../store/hook';
import { SignUpFormData, UseSignUpFormReturn } from '../types/authTypes';
import { NavigationProp } from '../types/authTypes'; 

const initialFormState: SignUpFormData = {
  name: '',
  email: '',
  password: '',
};

export const useSignUpForm = (navigation: NavigationProp): UseSignUpFormReturn => {
  const [formData, setFormData] = useState<SignUpFormData>(initialFormState);
  const dispatch = useAppDispatch();
  const { status, error } = useSelector((state: RootState) => state.user);

  const handleInputChange = (name: keyof SignUpFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = () => {
    const { name, email, password } = formData;
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill all the fields.');
      return;
    }

    dispatch(signUpUser({ name, email, password }))
      .unwrap()
      .then(() => {
        setFormData(initialFormState);
        navigation.navigate('MainApp');
      })
      .catch(err => {
        Alert.alert('Error', err);
      });
  };

  return {
    formData,
    status,
    error,
    handleSignUp,
    handleInputChange,
  };
};
