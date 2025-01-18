// src/components/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: object;
}

const CustomButton: React.FC<ButtonProps> = ({ title, onPress, disabled = false, style = {} }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#6F3DE9',
    paddingVertical: 12,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:48
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  disabled: {
    backgroundColor: '#B0C4DE',
  },
});

export default CustomButton;
