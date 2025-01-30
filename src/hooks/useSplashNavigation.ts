import { useEffect } from 'react';
import { SplashScreenNavigationProp } from '../types/authTypes';

const useSplashNavigation = (navigation: SplashScreenNavigationProp) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('SignIn');
    }, 3000);

    return () => clearTimeout(timer); 
  }, [navigation]);
};

export default useSplashNavigation;
