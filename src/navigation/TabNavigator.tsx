import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/homeScreen/HomeScreen';
import { View } from 'react-native';
import MyPostingScreen from '../screens/myPostingScreen/MyPostingScreen';
import CreateEventScreen from '../screens/createEventScreen/CreateEventScreen';
import TicketDetailScreen from '../screens/ticketDetailScreen/TicketDetailScreen';
import ProfileSettingsScreen from '../screens/profileSetting/ProfileSetting';
import Icon from 'react-native-vector-icons/Ionicons'; // Adjust based on your icon library
import Icons from 'react-native-vector-icons/MaterialIcons'; // Adjust based on your icon library

export type TabStackParamList = {
  Home: undefined;
  MyPosting: undefined;
  CreateEvent: undefined;
  TicketDetail: undefined;
  ProfileSetting: undefined;
};

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#B6C5CD',
        tabBarShowLabel: false, // Hide text labels
        tabBarStyle: {
          paddingTop:15, // Add padding below the icons
          height: 80, // Adjust the total height of the tab bar
          backgroundColor: '#ffffff', // Optional: Change tab bar background color
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icons name="favorite-border" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MyPosting"
        component={MyPostingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon  name="compass-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
  name="CreateEvent"
  component={CreateEventScreen}
  options={{
    tabBarIcon: ({ color }) => (
      <View
        style={{
          backgroundColor: '#6F3DE9', // Background color
          width: 50, // Set a fixed width
          height: 50, // Set a fixed height
          borderRadius: 30, // Half of width/height for a perfect circle
          alignItems: 'center', // Center icon horizontally
          justifyContent: 'center', // Center icon vertically
        }}
      >
        <Icon 
          name="add" 
          color="white" // White icon color for contrast
          size={35} // Icon size
        />
      </View>
    ),
  }}
/>


      <Tab.Screen
        name="TicketDetail"
        component={TicketDetailScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="ticket-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileSetting"
        component={ProfileSettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
