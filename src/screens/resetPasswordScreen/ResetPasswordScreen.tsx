import React from 'react';
import {View, StyleSheet, Alert, TouchableOpacity, Text} from 'react-native';
import InputField from '../../components/inputField/InputField';
import Button from '../../components/customButton/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import useResetPasswordForm from '../../hooks/useResetPasswordForm';
import useResetPasswordDispatch from '../../hooks/useResetPasswordDispatch';
import useValidation from '../../hooks/useValidation';

const ResetPasswordScreen: React.FC = () => {
  const {currentPassword, newPassword, confirmPassword} =
    useResetPasswordForm();
  const {handleResetPassword, isLoading, error, successMessage} =
    useResetPasswordDispatch();
  const {isValid} = useValidation(newPassword.value, confirmPassword.value);
  const navigation = useNavigation();

  const handleSubmit = () => {
    if (!isValid) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    handleResetPassword(currentPassword.value, newPassword.value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reset Password</Text>
        <Text></Text>
      </View>

      <View style={styles.reset}>
        <View style={styles.inputs}>
          <InputField
            label="Current Password"
            placeholder="Enter current password"
            secureTextEntry
            onChangeText={currentPassword.onChange}
          />
          <InputField
            label="New Password"
            placeholder="Enter new password"
            secureTextEntry
            onChangeText={newPassword.onChange}
          />
          <InputField
            label="Confirm New Password"
            placeholder="Confirm new password"
            secureTextEntry
            onChangeText={confirmPassword.onChange}
          />
        </View>
      </View>

      <View style={styles.button}>
        <Button title="Reset Password" onPress={handleSubmit} />
      </View>

      {isLoading && <Text>Loading...</Text>}
      {error && <Text style={{color: 'red'}}>{error}</Text>}
      {successMessage && <Text style={{color: 'green'}}>{successMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  inputs: {
    paddingTop: 40,
  },
  reset: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  backButton: {},
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
  },
});

export default ResetPasswordScreen;
