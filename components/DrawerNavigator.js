// DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import Payment from '../screens/Payment';
import Profile from '../screens/Profile';

const Drawer = createDrawerNavigator();

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

export default DrawerNavigator;
