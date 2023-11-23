// StackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import Home from '../screens/Home';
import PostingDesc from '../screens/PostingDesc';
import PaymentModal from '../screens/Payment/Payment_Modal';
import PostingModal from '../screens/PostingModal';
import DrawerNavigator from './DrawerNavigator';
import AddingPost from '../screens/AddingPost';
import LiveStream from '../screens/LiveStream';
import TermsAndConditions from '../screens/TermsAndConditions';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';

import Welcome from '../screens/welcome';
import Login from '../screens/login';
import Verification from '../screens/verification';
import AppSplash from '../screens/app_splash';
import SignUp from '../screens/signup';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='LoginStack'>
      <Stack.Screen name='TabNavigator' component={TabNavigator} />
      <Stack.Screen name='AddingPostStack' component={AddingPostStack} />
      <Stack.Screen name='PostStack' component={PostStack} />
      <Stack.Screen name='LiveStack' component={LiveStack} />
      <Stack.Screen name='TermsAndConditions' component={TermsAndConditions} />
      <Stack.Screen name='LoginStack' component={LoginStack} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='EditProfile' component={EditProfile} />
    </Stack.Navigator>
  );
}

function PostStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='PostingDesc' component={PostingDesc} />
      <Stack.Screen name='PostingModal' component={PostingModal} />
    </Stack.Navigator>
  );
}

function AddingPostStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='AddingPost' component={AddingPost} />
    </Stack.Navigator>
  );
}


function LiveStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='LiveStream' component={LiveStream} />
    </Stack.Navigator>
  );
}

function LoginStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      <Stack.Screen name="Welcome" component={Welcome}/>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="SignUp" component={SignUp}/>
      <Stack.Screen name="Verification" component={Verification}/>
      <Stack.Screen name="AppSplash" component={AppSplash}/>
    </Stack.Navigator>
  );
}




export default StackNavigator;