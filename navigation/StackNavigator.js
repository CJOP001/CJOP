// StackNavigator.js
import {React, useEffect, useReducer, useState, useMemo, createContext, useContext} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const AuthContext = createContext();

export async function SignedIn()
{
  const { signIn } = useContext(AuthContext);

  console.log("im here in signed in");
  const getToken = () =>
  {
    let userToken;
    try{
      AsyncStorage.getItem('token').then(
      (value) => 
      userToken = value,
      );
    console.log(userToken);
  }
  catch(e)
  {}
}
  getToken();
  () => signIn({userToken});

}
export async function SignedOut()
{
  const {signOut} = useContext(AuthContext);
  signOut;


  /*try {
    const { error} = await supabase.auth.signOut();
    if(error)
    {
        throw error;
    }
    else 
    {
        signOut;
    }
}
catch (error)
{
    console.log(error);
}*/
}

function StackNavigator() {
  const [token, setToken] = useState([]); //start of user session input

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
          case 'SIGN_UP':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        const{data} = await AsyncStorage.getItem('token');
        console.log(data);
        //const {data, error} = await supabase.auth.getSession();
        if(data== "" || data == null)
        {
          userToken = null;
          setToken(userToken);

        }
        else{
          //console.log(data.session.access_token);
          //userToken = data.session.access_token;
          userToken = data;
          setToken(userToken);
        }
      } catch (e) {
       
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, [token]);


  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        let userToken;

        try {
          const{data} = AsyncStorage.getItem('token');
          //const {data, error} = await supabase.auth.getSession();
          if(data== "" || data == null)
          {
            userToken = null;
            setToken(userToken);
  
          }
          else{
            //console.log(data.session.access_token);
            //userToken = data.session.access_token;
            userToken = data;
            setToken(userToken);
          }
        } catch (e) {
          // Restoring token failed
        }

        dispatch({ type: 'SIGN_IN', token: userToken });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      }),
    []
  );
  //end of user session input
  return (
      //use this when testing the user session
      <AuthContext.Provider value={authContext}>
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='LoginStack'>
      {state.userToken == null ? (
        <>
      <Stack.Screen name='LoginStack' component={LoginStack} />
      <Stack.Screen name='Login' component={Login} />
      </>
      ) : (
        <>
      <Stack.Screen name='TabNavigator' component={TabNavigator} />
      <Stack.Screen name='EditProfile' component={EditProfile} />
      <Stack.Screen name='AddingPostStack' component={AddingPostStack} />
      <Stack.Screen name='PostStack' component={PostStack} />
      <Stack.Screen name='LiveStack' component={LiveStack} />
      <Stack.Screen name='TermsAndConditions' component={TermsAndConditions} />
      </>
      )} 
    </Stack.Navigator>
    </AuthContext.Provider>
    
 
    //remove this when switch between no user session and have user session
    /*<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='LoginStack'>
    
    <Stack.Screen name='LoginStack' component={LoginStack} />
    <Stack.Screen name='Login' component={Login} />

    <Stack.Screen name='EditProfile' component={EditProfile} />
    <Stack.Screen name='TabNavigator' component={TabNavigator} />
    <Stack.Screen name='AddingPostStack' component={AddingPostStack} />
    <Stack.Screen name='PostStack' component={PostStack} />
    <Stack.Screen name='LiveStack' component={LiveStack} />
    <Stack.Screen name='TermsAndConditions' component={TermsAndConditions} />

  </Stack.Navigator>
    */
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