import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Image } from 'react-native';

import Home from '../screens/Home';
import Payment from '../screens/Payment';
import NewsCreation from '../screens/NewsCreation';
import Subscribe from '../screens/Subscribe';
import Profile from '../screens/Profile';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        let tabName;

        // Define the icon name and tab name based on the route
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
};

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="HomeScreen" component={HomeScreen}   
        options={{
            headerShown: false
          }} />
        <Stack.Screen name="Payment" component={Payment} 
         options={{
            headerTitleAlign: 'center',
          }}/>
        <Stack.Screen name="NewsCreation" component={NewsCreation} 
         options={{
            headerTitleAlign: 'center',
          }}/>
        <Stack.Screen name="Subscribe" component={Subscribe} 
         options={{
            headerTitleAlign: 'center',
          }}/>
        <Stack.Screen name="Profile" component={Profile}
         options={{
            headerTitleAlign: 'center',
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;