import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ActivityIndicator, View} from 'react-native';
import SplashScreen from '../screens/splashScreen/SplashScreen';
import SignIn from '../screens/signInScreen/SignInScreen';
import SignUp from '../screens/signUpScreen/SignUpScreen';
import MainNavigator from './MainNavigator';
import useAuthentication from '../hooks/useLogout';
import useLoading from '../hooks/useLoading';
import {AuthStackParamList} from '../types/authTypes';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  const isAuthenticated = useAuthentication();
  const isLoading = useLoading();

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#6F3DE9" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isAuthenticated ? (
        <Stack.Screen name="MainApp" component={MainNavigator} />
      ) : (
        <>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
