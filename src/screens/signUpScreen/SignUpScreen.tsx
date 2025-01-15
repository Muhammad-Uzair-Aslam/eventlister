import React, { useState } from 'react';
import { View, Text,  Button, StyleSheet, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import InputField from '../../components/inputField/InputField';
import CustomButton from '../../components/customButton/CustomButton';
import DividerComponent from '../../components/dividerComponent/DividerComponent';
import ImageComponent from '../../components/ImageComponent/ImageComponent';

type Props = StackScreenProps<AuthStackParamList, 'SignUp'>;

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Add registration logic here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <InputField
        label='Name'
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <InputField
      label="Email"
      placeholder="Enter your email"
      value={email}
      onChangeText={setEmail}
      keyboardType="email-address"
      />
      <InputField
        label='Password'
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
        <Text>Already have an account? <TouchableOpacity  onPress={()=>navigation.navigate('SignIn')}><Text style={styles.touchable}>Login Instead</Text></TouchableOpacity></Text>
      <CustomButton title="Sign Up" onPress={handleSignUp} />
      <DividerComponent/>
      <ImageComponent/>
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
    marginTop:40,
    marginBottom:10,
    fontWeight: '600',
    textAlign: 'center',
  },
  touchable:{
    color:'#6F3DE9'
  }
});

export default SignUpScreen;
