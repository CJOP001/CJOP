// StackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import TabNavigator from './TabNavigator';
import LiveStream from '../screens/LiveStream/LiveStream';
import HostPage from '../screens/LiveStream/HostPage';
import PostingDesc from '../screens/NewsCreation/PostingDesc';
import TermsAndConditions from '../screens/TermsAndConditions';
import Payment from '../screens/Payment/Payment';
import Welcome from '../screens/Auth/welcome';
import Login from '../screens/Auth/login';
import Verification from '../screens/Auth/verification';
import SignUp from '../screens/Auth/signup';
import AudiencePage from '../screens/LiveStream/AudiencePage';


const Stack = createNativeStackNavigator();

function StackNavigator() {
    return(
        <Stack.Navigator initialRouteName='LoginStack' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeStack" component={TabNavigator} />
            <Stack.Screen name='LiveStreamStack' component={LiveStreamStack} />
            <Stack.Screen name='PostingStack' component={PostingStack} />
            <Stack.Screen name="PaymentStack" component={PaymentStack} />
            <Stack.Screen name='TermsAndConditions' component={TermsAndConditions} />
            <Stack.Screen name='LoginStack' component={LoginStack} />
            <Stack.Screen name='Login' component={Login} />
        </Stack.Navigator>
    );
}

function PostingStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='PostingDesc' component={PostingDesc} />
        {/*<Stack.Screen name='PostingModal' component={PostingModal} />*/}
      </Stack.Navigator>
    );
}

function LiveStreamStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='LiveStream' component={LiveStream} />
      <Stack.Screen name='HostPage' component={HostPage} />
      <Stack.Screen name='AudiencePage' component={AudiencePage} />
    </Stack.Navigator>
  );
}

function PaymentStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Payment" component={Payment} />
      {/* Other screens in the Payment stack */}
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
    </Stack.Navigator>
  );
}


export default StackNavigator;