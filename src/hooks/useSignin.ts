import { useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from '../store/slices/AuthSlice';
import { RootState, AppDispatch } from '../store/Store';
import { UseAuthFormReturn } from '../types/authTypes';
import { NavigationProp } from '../types/authTypes'; 

export const useAuthForm = (navigation: NavigationProp): UseAuthFormReturn => { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const { status, error } = useSelector((state: RootState) => state.user);

  const handleSignIn = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all the fields.');
      return;
    }

    dispatch(signInUser({ email, password }))
      .unwrap()
      .then((user) => {
        setEmail('');
        setPassword('');
        navigation.navigate('MainApp');
      })
      .catch((err) => {
        Alert.alert('Error', err);
      });
  };

  return {
    email,
    password,
    status,
    error,
    setEmail,
    setPassword,
    handleSignIn,
  };
};
