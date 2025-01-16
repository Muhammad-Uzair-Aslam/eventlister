import React, {useState} from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import InputField from '../../components/inputField/InputField';
import Button from '../../components/customButton/CustomButton';
import auth from '@react-native-firebase/auth';

const RecoverPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const handleRecoverPassword = async () => {
    if (email) {
      try {
        await auth().sendPasswordResetEmail(email);
        console.log('Password reset email sent successfully');
        Alert.alert('Success', 'Password reset email sent!');
        setEmail('');
      } catch (error: any) {
        console.error('Error sending password reset email:', error);
        Alert.alert('Error', error.message || 'Unable to send reset email');
      }
    } else {
      Alert.alert('Error', 'Please enter your email');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recover Password</Text>
      <InputField
        label="Email"
        value={email}
        placeholder="Enter your email"
        keyboardType="email-address"
        onChangeText={text => setEmail(text)}
      />
      <Button title="Send Reset Link" onPress={handleRecoverPassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 130,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 40,
    textAlign: 'center',
  },
});

export default RecoverPasswordScreen;
