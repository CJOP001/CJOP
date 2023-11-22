// Navigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import Welcome from '../screens/welcome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Welcome' component={Welcome}/>
        <Stack.Screen name='App' component={AppStack}/>
        <Stack.Screen name='Auth' component={AuthStack}/>
      </Stack.Navigator>
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