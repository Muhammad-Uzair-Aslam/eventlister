import React, { useEffect } from 'react';
import {  Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

type SplashScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Splash'>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('MyPosting'); // Navigate to EventDetail after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Clear timer on unmount
  }, [navigation]);

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
  text:{
    fontSize:24,
    fontWeight:'400',
    color:'#fff',
  }
});

export default SplashScreen;
