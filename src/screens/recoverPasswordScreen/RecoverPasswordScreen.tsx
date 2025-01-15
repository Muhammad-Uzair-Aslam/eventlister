import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import InputField from '../../components/inputField/InputField';
import Button from '../../components/customButton/CustomButton';

const RecoverPasswordScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recover Password</Text>
      <InputField
        label='Email'
        value='name'
        placeholder='Enter your email'
        keyboardType="email-address"
        onChangeText={(text) => console.log('Email:', text)}
      />
      <Button
        title="Send Reset Link"
        onPress={() => console.log('Reset link sent')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height:'100%',
    paddingTop:130, 
    paddingHorizontal:20,
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
