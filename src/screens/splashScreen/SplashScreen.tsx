import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { SplashScreenNavigationProp } from '../../types/authTypes';
import useSplashNavigation from '../../hooks/useSplashNavigation';

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  // Call the custom hook
  useSplashNavigation(navigation);

  return (
    <LinearGradient
      colors={['#43116A', '#6F3DE9']}
      start={{ x: 0.3, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.headingText}>EventLister!</Text>
      <Text style={styles.text}>Nearby Event Mobile App!</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontSize: 52,
    fontWeight: '600',
    color: '#fff', // White text for better contrast on the gradient background
  },
  text: {
    fontSize: 24,
    fontWeight: '400',
    color: '#fff',
  },
});

export default SplashScreen;
