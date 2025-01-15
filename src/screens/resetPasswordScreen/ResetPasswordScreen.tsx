import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import InputField from '../../components/inputField/InputField';
import Button from '../../components/customButton/CustomButton';

const ResetPasswordScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <InputField
        label='Old Password'
        placeholder="Enter Old password"
        secureTextEntry
        onChangeText={(text) => console.log('Old Password:', text)}
      />
      <InputField
        
        label='New password'
        placeholder="Enter new password"
        secureTextEntry
        onChangeText={(text) => console.log('New Password:', text)}
      />
      <InputField
        
        label='Confirm new password'
        placeholder="Confirm password"
        secureTextEntry
        onChangeText={(text) => console.log('Confirm Password:', text)}
      />
      <View style={styles.button}>
      <Button
        title="Reset Password"
        onPress={() => console.log('Password Reset')}
        
      />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    paddingTop:100,
    padding: 16,
    backgroundColor: '#fff',
  },
  button: {
    alignSelf:'center',
    margin:'auto',
    position: 'absolute',
    bottom:50,
    width:'100%'
  },
});

export default ResetPasswordScreen;
