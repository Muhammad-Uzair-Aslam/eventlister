import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import InputField from '../../components/inputField/InputField';
import Button from '../../components/customButton/CustomButton';
import { resetPassword } from '../../store/slices/AuthSlice';
import {  AppDispatch }  from '../../store/Store';
const ResetPasswordScreen: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const dispatch: AppDispatch = useDispatch();

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    dispatch(resetPassword({ currentPassword, newPassword }))
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'Password updated successfully');
      })
      .catch((error) => {
        Alert.alert('Error', error);
      });
  };

  return (
    <View style={styles.container}>
      <InputField
        label="Current Password"
        placeholder="Enter current password"
        secureTextEntry
        onChangeText={setCurrentPassword}
      />
      <InputField
        label="New Password"
        placeholder="Enter new password"
        secureTextEntry
        onChangeText={setNewPassword}
      />
      <InputField
        label="Confirm New Password"
        placeholder="Confirm new password"
        secureTextEntry
        onChangeText={setConfirmPassword}
      />
      <View style={styles.button}>
        <Button title="Reset Password" onPress={handleResetPassword} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 20,
  },
});

export default ResetPasswordScreen;
