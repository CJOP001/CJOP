// Navigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import DrawerNavigator from './DrawerNavigator';

function AppNavigator() {
  return (
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
  );
}

export default AppNavigator;

/*
    {
    <StackNavigator>
      <DrawerNavigator/>              
    </StackNavigator>
    }
*/

/*
    {
    <DrawerNavigator>
        <StackNavigator />
      </DrawerNavigator>
    }
*/