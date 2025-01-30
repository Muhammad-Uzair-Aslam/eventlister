import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import EventDetailScreen from '../screens/eventDetailScreen/EventDetailScreen';
import EditEventScreen from '../screens/editEventScreen/EditEventScreen';
import ResetPasswordScreen from '../screens/resetPasswordScreen/ResetPasswordScreen';
import { RootStackParamList } from '../types/authTypes';

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="TabNavigator" 
        component={TabNavigator} 
      />
      <Stack.Screen 
        name="EventDetails" 
        component={EventDetailScreen} 
      />
      <Stack.Screen 
        name="EditEvent" 
        component={EditEventScreen} 
      />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
