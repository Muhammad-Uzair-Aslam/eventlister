// src/screens/signInScreen/SignInScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import InputField from '../../components/inputField/InputField';
import CustomButton from '../../components/customButton/CustomButton';
import DividerComponent from '../../components/dividerComponent/DividerComponent';
import ImageComponent from '../../components/ImageComponent/ImageComponent';
import { useAuthForm } from '../../hooks/useSignin';
import { SignInScreenProps } from '../../types/authTypes';

const SignInScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
  const {
    email,
    password,
    status,
    error,
    setEmail,
    setPassword,
    handleSignIn
  } = useAuthForm(navigation);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <InputField
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <InputField
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Text style={styles.linkText}>
        Don't have an account?{' '}
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.touchable}>Sign Up Instead</Text>
        </TouchableOpacity>
      </Text>
      <CustomButton title="Sign In" onPress={handleSignIn} disabled={status === 'loading'} />
      {status === 'loading' && <ActivityIndicator size="large" color="#6F3DE9" />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      <DividerComponent />
      <ImageComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
    height: '100%',
  },
  title: {
    fontSize: 32,
    marginVertical: 60,
    fontWeight: '600',
    textAlign: 'center',
  },
  touchable: {
    color: '#6F3DE9',
    fontWeight: 'bold',
  },
  linkText: {
    textAlign: 'center',
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default SignInScreen;