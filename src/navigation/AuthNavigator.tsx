import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/splashScreen/SplashScreen';
import SignIn from '../screens/signInScreen/SignInScreen';
import SignUp from '../screens/signUpScreen/SignUpScreen';
import RecoverPassword from '../screens/recoverPasswordScreen/RecoverPasswordScreen';
import ResetPassword from '../screens/resetPasswordScreen/ResetPasswordScreen';
import Home from '../screens/homeScreen/HomeScreen';
import MyPostingScreen from '../screens/myPostingScreen/MyPostingScreen';
import EventDetailScreen from '../screens/eventDetailScreen/EventDetailScreen';
import CreateEventScreen from '../screens/createEventScreen/CreateEventScreen';
import TicketDetailScreen from '../screens/ticketDetailScreen/TicketDetailScreen';
import ProfileSettingsScreen from '../screens/profileSetting/ProfileSetting';

export type AuthStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  RecoverPassword: undefined;
  ResetPassword: undefined;
  Home: undefined;
  MyPosting: undefined;
  CreateEvent:undefined;
  TicketDetail:undefined;
  ProfileSetting:undefined
  EventDetail: {
    event: {
      title: string;
      price: number;
      participants: number;
      date: string;
      description: string;
      organizer: {
        name: string;
        avatar?: string;
      };
    };
  };
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
        options={{ title: 'Reset Password' }}
      />

      {/* Home Screen */}
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />

      {/* My Posting Screen */}
      <Stack.Screen
        name="MyPosting"
        component={MyPostingScreen}
        options={{ headerShown: false }}
      />

      {/* Event Detail Screen */}
      <Stack.Screen
        name="EventDetail"
        component={EventDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateEvent"
        component={CreateEventScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TicketDetail"
        component={TicketDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfileSetting"
        component={ProfileSettingsScreen}
        options={{ headerShown: false }}
      />
    
    </Stack.Navigator>
    
  );
};

export default AuthNavigator;
