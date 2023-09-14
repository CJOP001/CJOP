// StackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Payment from '../screens/Payment';
import NewsCreation from '../screens/NewsCreationModal';
import Subscribe from '../screens/Subscribe';
import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="NewsCreation" component={NewsCreation} />
      <Stack.Screen name="Subscribe" component={Subscribe} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
