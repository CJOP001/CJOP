// DrawerNavigator.js
import React, { useState, useEffect } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Divider, Portal, Dialog, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import supabase from '../supabase/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserData } from '../components/UserInfo';

import TabNavigator from './TabNavigator';
import Payment from '../screens/Payment/Payment';
import Profile from '../screens/Profile';
import FriendsList from '../screens/FriendList';
import Home from '../screens/Home';
import TermsAndConditions from '../screens/TermsAndConditions';
import StackNavigator from './StackNavigator';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {

  const { color, userFullName, userNameID, userImage, followersCount, followingCount } = props;
  const handleLogout = async () => {
    try {
      // Clear user session 
      await AsyncStorage.clear();
  
      // Navigate to the login screen 
      props.navigation.navigate('LoginStack');
  
      // Hide the logout dialog
      props.hideLogoutDialog();
    } catch (error) {
      console.error("Error during logout:", error);
      // Handle any errors that occurred during the logout process
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      {/* Avatar and Username Section */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatarAndInfo}>
        {userImage ? (
                    <Image
                        style={styles.avatar}
                        source={{ uri: userImage }}
                    />
                ) : null}
          <View style={styles.infoContainer}>
            <Text style={styles.username}>{userFullName}</Text>
            <Text style={styles.alias}>@{userNameID}</Text>
          </View>
        </View>
      </View>

      <View style={styles.countContainer}>
        <View style={styles.countRow}>
          <Text style={styles.countText}>{followersCount}</Text>
          <Text style={styles.countLabel}>Followers</Text>
          <Text style={styles.countText}>{followingCount}</Text>
          <Text style={styles.countLabel}>Following</Text>
        </View>
      </View>

      {/* Standard Drawer Items */}
      <DrawerItemList {...props} />

      {/* Divider for separation */}
      <Divider />

      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
        {/* Terms & Conditions */}
        <TouchableOpacity
          onPress={() => {
            // Navigate to the Terms & Conditions screen
            props.navigation.navigate('TermsAndConditions');
            props.navigation.closeDrawer();
          }}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CustomDrawerIcon source={require('../assets/tc.png')} iconStyle={{ tintColor: color }} />
            <Text
              style={{
                fontSize: 14,
                marginLeft: 30,
                color: 'gray'
              }}
            >
              About Us
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // Show the logout dialog
            props.showLogoutDialog();
          }}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CustomDrawerIcon source={require('../assets/logout96.png')} iconStyle={{ tintColor: color }} />
            <Text
              style={{
                fontSize: 14,
                marginLeft: 30,
                color: 'gray'
              }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
        </View>

        <Portal>
          <Dialog
            visible={props.isLogoutDialogVisible}
            onDismiss={props.hideLogoutDialog}
            style={{ backgroundColor: '#ffffff' }}
          >
            <Dialog.Title>Are You Sure?</Dialog.Title>
            <Dialog.Content>
              <Text>You will be Logout.</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <TouchableOpacity activeOpacity={1} onPress={props.hideLogoutDialog}>
                <Button labelStyle={styles.cancelButton}>Cancel</Button>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1} onPress={handleLogout}>
                <Button labelStyle={styles.logoutButton}>Logout</Button>
              </TouchableOpacity>
            </Dialog.Actions>
          </Dialog>
        </Portal>

    </DrawerContentScrollView>
  );
}

const CustomDrawerIcon = ({ source, iconStyle }) => (
  <Image source={source} style={[styles.icon, iconStyle]} />
);

function DrawerNavigator() {


  const [isLogoutDialogVisible, setLogoutDialogVisible] = useState(false);
  const showLogoutDialog = () => setLogoutDialogVisible(true);
  const hideLogoutDialog = () => setLogoutDialogVisible(false);
  const [userFullName, setUserFullName] = useState('');
  const [userID, setUserID] = useState(null);
  const [userNameID, setUserNameID] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [followersCount, setFollowersCount] = useState([]);
  const [followingCount, setFollowingCount] = useState([]);
  const [loading, setLoading] = useState(true);

// Function to fetch user ID from async storage
const fetchUserID = async () => {
  try {
    const storedUserID = await AsyncStorage.getItem('uid');
    if (storedUserID) {
      //console.log('(Home)UserID:',storedUserID);
      setUserID(storedUserID);
      return storedUserID;
    } else {
      console.error('User ID not found in async storage.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user ID from async storage:', error);
    return null;
  }
};

useEffect(() => {
  const initializeData = async () => {
    try {
      // Fetch user ID from async storage
      const userID = await fetchUserID();
      console.log('(Drawer)User ID:', userID);

      if (userID) {
        setUserID(userID);
        setUserImage(userID.user_image);

        const { data: userData, error: userError } = await supabase
            .from('app_users')
            .select('*')
            .eq('id', userID);

          if (userError) {
            console.error('Error fetching user data:', userError);
          } else { 

            setUserFullName(userData[0].fullname || '');
            setUserNameID(userData[0].nameid || '');
            setUserImage(userData[0].user_image);
          }
          console.log('Got image:', userData[0].user_image);
          console.log('FName:',userData[0].fullname);
          console.log('NameId:',userData[0].nameid);

      
        await getFollowing(userID);
        await getFollowers(userID);
        
      } else {
        console.error('User ID not available.');
      }
    } catch (error) {
      console.error('Error initializing data:', error);
    }
  };

  // Initialize data when the component mounts
  initializeData();
}, []);



    const getFollowing = async (userID) => {
      const { data, error, count } = await supabase
        .from("friends")
        .select(`user_id`, `friend_id`, { count: "exact", head: true })
        .eq("user_id", userID);
      setFollowingCount(data.length);
    };
  
    const getFollowers = async (userID) => {
      const { data, error, count } = await supabase
        .from("friends")
        .select(`user_id`, `friend_id`, { count: "exact", head: true })
        .eq("friend_id", userID);
      setFollowersCount(data.length);
    };
    
      return (
        <View style={{ flex: 1 }}>
        <Drawer.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{
            swipeEnabled: false
          }}
          drawerContent={(props) => (
            <CustomDrawerContent
              {...props}
              isLogoutDialogVisible={isLogoutDialogVisible}
              showLogoutDialog={showLogoutDialog}
              hideLogoutDialog={hideLogoutDialog}
              userFullName={userFullName}
              userID={userID}
              userNameID={userNameID}
              userImage={userImage}
              followersCount={followersCount}
              followingCount={followingCount}
            />
          )}
        >
        <Drawer.Screen
          name="DrawerHomeScreen"
          component={Home}
          options={{
            headerShown: false,
            drawerLabel: ({ focused, color }) => (
              <Text style={{ color: focused ? color : 'gray' }}>Home</Text>
            ),
            drawerIcon: ({ color }) => (
              <CustomDrawerIcon
                source={require('../assets/home-icon.png')}
                iconStyle={{ tintColor: color }} // Set the icon's tint color to match the label color
              />
            ),
          }}
          listeners={({ navigation }) => ({
            // Close the drawer when an item is pressed
            itemPress: () => {
              navigation.closeDrawer();
            },
          })}
        />
        <Drawer.Screen
          name="DrawerProfile"
          component={Profile}
          options={{
            headerShown: false,
            drawerLabel: ({ focused, color }) => (
              <Text style={{ color: focused ? color : 'gray' }}>Profile</Text>
            ),
            drawerIcon: ({ color }) => (
              <CustomDrawerIcon
                source={require('../assets/profile-icon.png')}
                iconStyle={{ tintColor: color }} // Set the icon's tint color to match the label color
              />
            ),
          }}
          listeners={({ navigation }) => ({
            // Close the drawer when an item is pressed
            itemPress: () => {
              navigation.closeDrawer();
            },
          })}
        />
        <Drawer.Screen
          name="Friends"
          component={FriendsList} 
          options={{
            headerShown: false,
            drawerLabel: ({ focused, color }) => (
              <Text style={{ color: focused ? color : 'gray' }}>Friends</Text>
            ),
            drawerIcon: ({ color }) => (
              <CustomDrawerIcon source={require('../assets/friends-icon.png')} iconStyle={{ tintColor: color }} /> 
              ),
          }}
          listeners={({ navigation }) => ({
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
            drawerLabel: ({ focused, color }) => (
              <Text style={{ color: focused ? color : 'gray' }}>Wallet</Text>
            ),
            drawerIcon: ({ color }) => (
              <CustomDrawerIcon source={require('../assets/wallet-icon.png')} iconStyle={{ tintColor: color }} /> 
              ),
          }}
          listeners={({ navigation }) => ({
            // Close the drawer when an item is pressed
            itemPress: () => {
              navigation.closeDrawer();
            },
          })}
        />

        </Drawer.Navigator>

        
        </View>
        
      );
  }

const styles = StyleSheet.create({
  avatarContainer: {
    padding: 16,
  },
  avatarAndInfo: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infoContainer: {
    marginLeft: 16, 
    flexDirection: 'column',
  },
  username: {
    fontSize: 18,
  },
  alias: {
    fontSize: 16,
    color: 'gray',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'gray', 
  },
  countContainer: {
    margin: 18,
  },
  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8
  },
  countLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: 'gray',
  },
  cancelButton: {
    color: 'gray',
  },
  logoutButton: {
    color: '#72E6FF', 
  },
});

export default DrawerNavigator;