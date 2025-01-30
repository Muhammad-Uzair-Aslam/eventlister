import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import InputField from '../../components/inputField/InputField';
import CustomButton from '../../components/customButton/CustomButton';
import DividerComponent from '../../components/dividerComponent/DividerComponent';
import ImageComponent from '../../components/ImageComponent/ImageComponent';
import {useSignUpForm} from '../../hooks/useSignup';
import {SignUpScreenProps} from '../../types/authTypes';
import useGoogleSignIn from '../../hooks/useGoogleSignin';
import useGoogleSignInConfig from '../../hooks/useGoogleSignInConfig';

const SignUpScreen: React.FC<SignUpScreenProps> = ({navigation}) => {
  const {formData, status, error, handleSignUp, handleInputChange} =
    useSignUpForm(navigation);
  useGoogleSignInConfig();
  const {onGoogleButtonPress} = useGoogleSignIn();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <InputField
        label="Name"
        placeholder="Enter your name"
        value={formData.name}
        onChangeText={text => handleInputChange('name', text)}
      />
      <InputField
        label="Email"
        placeholder="Enter your email"
        value={formData.email}
        onChangeText={text => handleInputChange('email', text)}
        keyboardType="email-address"
      />
      <InputField
        label="Password"
        placeholder="Password"
        value={formData.password}
        onChangeText={text => handleInputChange('password', text)}
        secureTextEntry
      />

      <CustomButton
        title="Sign Up"
        onPress={handleSignUp}
        disabled={status === 'loading'}
      />
      {status === 'loading' && (
        <ActivityIndicator size="large" color="#6F3DE9" />
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Text style={styles.linkText}>
        Already have an account?{' '}
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.touchable}>Login Instead</Text>
        </TouchableOpacity>
      </Text>
      <DividerComponent />
      <TouchableOpacity onPress={onGoogleButtonPress}>
        <ImageComponent />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 32,
    marginTop: 40,
    marginBottom: 10,
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

export default SignUpScreen;
