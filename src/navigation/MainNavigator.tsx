import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import EventDetailScreen from '../screens/eventDetailScreen/EventDetailScreen';

export type RootStackParamList = {
  Auth: undefined;
  MainApp: undefined;
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

const Stack = createStackNavigator<RootStackParamList>();
const MainNavigator = () => {
  return (
    <NavigationContainer>
      
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Auth Navigator */}
        <Stack.Screen name="Auth" component={AuthNavigator} />
        
        {/* Main App (Tab Navigator) */}
        <Stack.Screen name="MainApp" component={TabNavigator} />
        
        {/* Screens that should be accessible from anywhere */}
        <Stack.Screen
          name="EventDetail"
          component={EventDetailScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
