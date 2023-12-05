// Navigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import DrawerNavigator from './DrawerNavigator';
import TabNavigator from './TabNavigator';

function AppNavigator() {
  return (
    <NavigationContainer>
        <StackNavigator />
    </NavigationContainer>
  );
}
  
export default AppNavigator;