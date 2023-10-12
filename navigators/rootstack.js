import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../components/styles';
const {primary, tertiary} = Colors;


import Welcome from '../screens/welcome';
import Login from '../screens/login';
import SignUp from '../screens/signup';
import Verification from '../screens/verification';

const Stack = createNativeStackNavigator();

const RootStack = () => 
{
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={
                {headerStyle: {backgroundColor: "transparent"},
                headerTintColor: tertiary,
                headerTransparent: true,
                headerTitle:''
                
            }
                
                }>
                <Stack.Screen name="Welcome" component={Welcome}/>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="SignUp" component={SignUp}/>
                <Stack.Screen name="Verification" component={Verification}/>

            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default RootStack;