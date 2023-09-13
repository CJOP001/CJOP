import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, TouchableOpacity, View } from 'react-native';

import Home from '../screens/Home';
import PostingDesc from '../screens/PostingDesc';
import Payment from '../screens/Payment';
import AddingPost from '../screens/AddingPost';
import Subscribe from '../screens/Subscribe';
import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }) {
  const [isAddingPostVisible, setAddingPostVisible] = React.useState(false);

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
            height: 60, // Adjust the height as needed
            borderTopWidth: 0, // Remove top border
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
        })}
        tabBar={({ state, descriptors, navigation }) => (
          <View style={{ flexDirection: 'row', height: 60, backgroundColor: '#ffffff' }}>
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];
              const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

              if (route.name === 'AddingPost') {
                return (
                  <TouchableOpacity
                    key={route.key}
                    onPress={handleAddingPostPress}
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Image
                      source={require('../assets/addnews-icon.png')}
                      style={{ width: 30, height: 30 }}
                    />
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
        <Tab.Screen name="TabHome" component={Home} />
        <Tab.Screen name="Payment" component={Payment} />
        <Tab.Screen name="AddingPost" component={AddingPost} />
        <Tab.Screen name="Subscribe" component={Subscribe} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>

      {isAddingPostVisible && (
        <AddingPost isVisible={isAddingPostVisible} onClose={() => setAddingPostVisible(false)} />
      )}
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
