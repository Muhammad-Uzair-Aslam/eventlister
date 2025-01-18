import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/splashScreen/SplashScreen';
import SignIn from '../screens/signInScreen/SignInScreen';
import SignUp from '../screens/signUpScreen/SignUpScreen';
import RecoverPassword from '../screens/recoverPasswordScreen/RecoverPasswordScreen';
import ResetPassword from '../screens/resetPasswordScreen/ResetPasswordScreen';
import Home from '../screens/homeScreen/HomeScreen'; // Add Home for redirection after authentication

export type AuthStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  RecoverPassword: undefined;
  ResetPassword:undefined;
  Home: undefined; // Add Home as part of the navigation flow
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      {/* Splash Screen */}
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />

      {/* Authentication Screens */}
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecoverPassword"
        component={RecoverPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ title: "Reset Password"}}
      />

      {/* Home Screen */}
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
