import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Payment from '../screens/Payment/Payment';
import Subscribe from '../screens/Subscribe';

import AddingPost from '../screens/AddingPost';
import { Image, TouchableOpacity, View } from 'react-native';
import DrawerNavigator from './DrawerNavigator';
import AddingPostStack from './AppStack';
import Profile from '../screens/Profile';


const Tab = createBottomTabNavigator();

function TabNavigator({ navigation }) {
  const [isAddingPostVisible, setAddingPostVisible] = useState(false);

  const handleAddingPostPress = () => {
    setAddingPostVisible(!isAddingPostVisible); // Toggle visibility
  };

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            backgroundColor: '#ffffff',
            height: 60,
            borderTopWidth: 0,
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
        })}
        tabBar={({ state, descriptors, navigation }) => (
          <View style={{ flexDirection: 'row', height: 50, backgroundColor: '#ffffff' }}>
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;

              if (route.name === 'AddingPost') {
                return (
                  <TouchableOpacity
                    key={route.key}
                    onPress={handleAddingPostPress}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Image source={require('../assets/addnews-icon.png')} style={{ width: 30, height: 30 }} />
                  </TouchableOpacity>
                );
              }

              const isFocused = state.index === index;

              return (
                <TouchableOpacity
                  key={route.key}
                  onPress={() => {
                    const event = navigation.emit({
                      type: 'tabPress',
                      target: route.key,
                      canPreventDefault: true,
                    });

                    console.log(`Navigating to: ${route.name}`);
                    if (!isFocused && !event.defaultPrevented) {
                      navigation.navigate(route.name);
                    }
                  }}
                  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                >
                  <Image
                    source={
                      route.name === 'TabHome'
                        ? require('../assets/home-icon.png')
                        : route.name === 'Payment'
                        ? require('../assets/wallet-icon.png')
                        : route.name === 'Subscribe'
                        ? require('../assets/mynews-icon.png')
                        : route.name === 'Profile'
                        ? require('../assets/profile-icon.png')
                        : null
                    }
                    style={{ width: 30, height: 30, tintColor: isFocused ? 'blue' : 'gray' }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      >
        <Tab.Screen name="TabHome" component={DrawerNavigator} />
        <Tab.Screen name="Payment" component={Payment} />
        <Tab.Screen name="AddingPost" component={AddingPostStack}/>
        <Tab.Screen name="Subscribe" component={Subscribe} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>

      {isAddingPostVisible && (
        <AddingPost isVisible={isAddingPostVisible} onClose={() => setAddingPostVisible(false)} />
      )}
    </View>
  );
}

export default TabNavigator;