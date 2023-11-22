import Login from '../screens/login';
import Verification from '../screens/verification';
import SignUp from '../screens/signup';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Login'>        
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="Verification" component={Verification}/>
      </Stack.Navigator>
    );
  }