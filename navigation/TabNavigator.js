// TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Payment from '../screens/Payment';
import NewsCreation from '../screens/NewsCreationModal';
import Subscribe from '../screens/Subscribe';
import Profile from '../screens/Profile';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            backgroundColor: '#ffffff',
            display: 'flex',
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarIcon: ({ color, size }) => {
            let iconName;
  
            if (route.name === 'TabHome') {
              iconName = require('../assets/home-icon.png');
            } else if (route.name === 'Payment') {
              iconName = require('../assets/wallet-icon.png');
            } else if (route.name === 'NewsCreation') {
              iconName = require('../assets/addnews-icon.png');
            } else if (route.name === 'Subscribe') {
              iconName = require('../assets/mynews-icon.png');
            } else if (route.name === 'Profile') {
              iconName = require('../assets/profile-icon.png');
            }
  
            return (
              <Image
                source={iconName}
                style={{ width: size, height: size, tintColor: color }}
              />
            );
          },
        })}
      >
        <Tab.Screen name="TabHome" component={Home} />
        <Tab.Screen name="Payment" component={Payment} />
        <Tab.Screen name="NewsCreation" component={NewsCreation} />
        <Tab.Screen name="Subscribe" component={Subscribe} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  }

export default TabNavigator;
