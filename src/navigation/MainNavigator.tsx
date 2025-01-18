import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AuthNavigator from './AuthNavigator';

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default MainNavigator;
