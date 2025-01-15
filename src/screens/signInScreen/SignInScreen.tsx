import React, { useState } from 'react';
import { View, Text,  StyleSheet, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import InputField from '../../components/inputField/InputField';
import CustomButton from '../../components/customButton/CustomButton';
import DividerComponent from '../../components/dividerComponent/DividerComponent';
import ImageComponent from '../../components/ImageComponent/ImageComponent';

type Props = StackScreenProps<AuthStackParamList, 'SignIn'>;

const SignInScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    console.log('Email:', email);
    console.log('Password:', password);
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
      <Text>Don't have an account? <TouchableOpacity  onPress={()=>navigation.navigate('SignUp')}><Text style={styles.touchable}>SignUp Instead</Text></TouchableOpacity></Text>
      <CustomButton title="Sign In" onPress={handleSignIn} />
      <CustomButton title='Recover Password' onPress={()=>navigation.navigate('RecoverPassword')}/>
      <DividerComponent/>
      <ImageComponent/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
    height:'100%'
  },
  title: {
    fontSize: 32,
    marginVertical:60,
    fontWeight: '600',
    textAlign: 'center',
  },
  touchable:{
    color:'#6F3DE9'
  }
});

export default SignInScreen;
