import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import InputField from '../../components/inputField/InputField';
import CustomButton from '../../components/customButton/CustomButton';
import DividerComponent from '../../components/dividerComponent/DividerComponent';
import ImageComponent from '../../components/ImageComponent/ImageComponent';
import { signInUser } from '../../store/slices/AuthSlice';
import { RootState, AppDispatch } from '../../store/Store';
import { useDispatch, useSelector } from 'react-redux';

type Props = StackScreenProps<AuthStackParamList, 'SignIn'>;

const SignInScreen: React.FC<Props> = ({ navigation }) => {
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
        Alert.alert('Success', `Welcome back, ${user.name}!`);
        setEmail('');
        setPassword('');
        navigation.navigate('Home'); // Adjust navigation target as needed
      })
      .catch((err) => {
        Alert.alert('Error', err);
        // status:'failed'
      });
  };

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
