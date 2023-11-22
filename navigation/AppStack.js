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
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AppStack()
{
    return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>  
            <Stack.Screen name='TabNavigator' component={TabNavigator} /> 
        <Stack.Screen name='DrawerNavigator' component={DrawerNavigator}/>     
      <Stack.Screen name='EditProfile' component={EditProfile} />
      <Stack.Screen name='AddingPostStack' component={AddingPostStack} />
      <Stack.Screen name='PostStack' component={PostStack} />
      <Stack.Screen name='LiveStack' component={LiveStack} />
      <Stack.Screen name='TermsAndConditions' component={TermsAndConditions} />

    </Stack.Navigator>
    )
};

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