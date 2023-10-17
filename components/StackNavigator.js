// StackNavigator.js
import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Payment from '../screens/Payment';
import PostingDesc from '../screens/PostingDesc';
import PostingModal from '../screens/PostingModal'
import Subscribe from '../screens/Subscribe';
import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="AddingPost" component={AddingPost} />
      <Stack.Screen name="Subscribe" component={Subscribe} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="PostingDesc" component={PostingDesc} />
    </Stack.Navigator>
  );
}

export default StackNavigator;