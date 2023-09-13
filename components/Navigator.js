import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, TouchableOpacity, View } from 'react-native';

import Home from '../screens/Home';
import PostingDesc from '../screens/PostingDesc'
import Payment from '../screens/Payment';
import AddingPost from '../screens/AddingPost';
import Subscribe from '../screens/Subscribe';
import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }) {
  const [isAddingPostVisible, setAddingPostVisible] = React.useState(false);

  const handleAddingPostPress = () => {
    setAddingPostVisible(true);
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
        <Tab.Screen name="Subscribe" component={Subscribe} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>

      {isAddingPostVisible && (
        <AddingPost isVisible={isAddingPostVisible} onClose={() => setAddingPostVisible(false)} />
      )}

      {/* Add a button to trigger AddingPost */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
        onPress={handleAddingPostPress}
      >
        <Image
          source={require('../assets/addnews-icon.png')}
          style={{ width: 50, height: 50 }}
        />
      </TouchableOpacity>
    </View>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Payment" component={Payment} options={{ headerTitleAlign: 'center' }} />
        <Stack.Screen name="AddingPost" component={AddingPost} options={{ headerTitleAlign: 'center' }} />
        <Stack.Screen name="Subscribe" component={Subscribe} options={{ headerTitleAlign: 'center' }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerTitleAlign: 'center' }} />
        <Stack.Screen name="PostingDesc" component={PostingDesc} options={{ headerTitleAlign: 'center' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
