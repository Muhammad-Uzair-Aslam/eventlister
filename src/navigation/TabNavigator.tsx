import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/homeScreen/HomeScreen';
import {View} from 'react-native';
import MyPostingScreen from '../screens/myPostingScreen/MyPostingScreen';
import CreateEventScreen from '../screens/createEventScreen/CreateEventScreen';
import TicketDetailScreen from '../screens/ticketDetailScreen/TicketDetailScreen';
import ProfileSettingsScreen from '../screens/profileSetting/ProfileSetting';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {TabStackParamList} from '../types/authTypes';

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: '#B6C5CD',
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingTop: 15,
          height: 80,
          backgroundColor: '#ffffff',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icons name="favorite-border" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MyPosting"
        component={MyPostingScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="compass-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="CreateEvent"
        component={CreateEventScreen}
        options={{
          tabBarIcon: ({color}) => (
            <View
              style={{
                backgroundColor: '#6F3DE9',
                width: 50,
                height: 50,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name="add" color="white" size={35} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="TicketDetail"
        component={TicketDetailScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="ticket-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileSetting"
        component={ProfileSettingsScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
