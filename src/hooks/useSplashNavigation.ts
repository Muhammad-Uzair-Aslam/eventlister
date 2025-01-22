import { useEffect } from 'react';
import { SplashScreenNavigationProp } from '../types/authTypes';

const useSplashNavigation = (navigation: SplashScreenNavigationProp) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('SignUp'); // Navigate to SignUp screen
    }, 3000);

    return () => clearTimeout(timer); // Clear timer on unmount
  }, [navigation]);
};

export default useSplashNavigation;
