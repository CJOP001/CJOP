// StackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import Home from '../screens/Home';
import PostingDesc from '../screens/NewsCreation/PostingDesc';
import PaymentModal from '../screens/Payment/Payment_Modal';
import PostingModal from '../screens/NewsCreation/PostingModal';
import DrawerNavigator from './DrawerNavigator';
import AddingPost from '../screens/AddingPost';
import LiveStream from '../screens/LiveStream/LiveStream';
import TermsAndConditions from '../screens/TermsAndConditions';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';

import Welcome from '../screens/welcome';
import Login from '../screens/login';
import Verification from '../screens/verification';
import AppSplash from '../screens/app_splash';
import SignUp from '../screens/signup';
import Payment from '../screens/Payment/Payment';
import TransferModal from '../screens/Payment/TransferModal';
import WithdrawModal from '../screens/Payment/WithdrawModal';
import ArticlesDetails from '../screens/NewsDetails/ArticlesDetails';
//import HostPage from '../screens/LiveStream/HostPage';

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
      <Stack.Screen name='PaymentStack' component={PaymentStack} />
      <Stack.Screen name='ArticlesDetails' component={ArticlesDetails} />
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
     {/*<Stack.Screen name='HostPage' component={HostPage} />*/}
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

function PaymentStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true}}>
      <Stack.Screen name='Payment' component={Payment} />
      <Stack.Screen name='PaymentModal' component={PaymentModal} />
      <Stack.Screen name='TransferModal' component={TransferModal} />
      <Stack.Screen name='WithdrawModal' component={WithdrawModal} />
    </Stack.Navigator>
  );
}




export default StackNavigator;