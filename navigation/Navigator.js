import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Image } from 'react-native';

import Home from '../screens/Home';
import Payment from '../screens/Payment';
import NewsCreation from '../screens/NewsCreationModal';
import Subscribe from '../screens/Subscribe';
import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#ffffff',
          display: 'flex',
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'TabHome') {
            iconName = require('../assets/home-icon.png');
          } else if (route.name === 'Payment') {
            iconName = require('../assets/wallet-icon.png');
          } else if (route.name === 'NewsCreation') {
            iconName = require('../assets/addnews-icon.png');
          } else if (route.name === 'Subscribe') {
            iconName = require('../assets/mynews-icon.png');
          } else if (route.name === 'Profile') {
            iconName = require('../assets/profile-icon.png');
          }

          return (
            <Image
              source={iconName}
              style={{ width: size, height: size, tintColor: color }}
            />
          );
        },
      })}
    >
      <Tab.Screen name="TabHome" component={Home} />
      <Tab.Screen name="Payment" component={Payment} />
      <Tab.Screen name="NewsCreation" component={NewsCreation} />
      <Tab.Screen name="Subscribe" component={Subscribe} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="HomeScreen">
      <Drawer.Screen
        name="HomeScreen"
        component={TabNavigator}
        options={{
          headerShown: false,
          drawerLabel: 'Home',
        }}
        listeners={({ navigation }) => ({
          // Close the drawer when an item is pressed
          itemPress: () => {
            navigation.closeDrawer();
          },
        })}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          drawerLabel: 'Profile',
        }}
        listeners={({ navigation }) => ({
          // Close the drawer when an item is pressed
          itemPress: () => {
            navigation.closeDrawer();
          },
        })}
      />
      <Drawer.Screen
        name="Payment"
        component={Payment}
        options={{
          headerShown: false,
          drawerLabel: 'Wallet',
        }}
        listeners={({ navigation }) => ({
          // Close the drawer when an item is pressed
          itemPress: () => {
            navigation.closeDrawer();
          },
        })}
      />
    </Drawer.Navigator>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator}   
          options={{
            headerShown: false,
          }}
        />
        {/* Add other screens to the stack navigator */}
        <Stack.Screen name="Payment" component={Payment} 
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen name="NewsCreation" component={NewsCreation} 
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen name="Subscribe" component={Subscribe} 
          options={{
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen name="Profile" component={Profile}
          options={{
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
