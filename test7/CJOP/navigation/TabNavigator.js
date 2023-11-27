import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, TouchableOpacity, View, Modal, Text, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Avatar } from 'react-native-paper';

import DrawerNavigator from './DrawerNavigator';
import LiveStream from '../screens/LiveStream/LiveStream';
import PostingDesc from '../screens/NewsCreation/PostingDesc';
import Payment from '../screens/Payment/Payment';
import Subscribe from '../screens/Subscribe/Subscribe';
import Profile from '../screens/Profile';
import StackNavigator from './StackNavigator';


const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    style ={{
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onPress}
    >

    <View style ={{
      padding: 30,
    }}>
      {children}
    </View>
  </TouchableOpacity>
)


function TabNavigator({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const Placeholder = () => <View />

    return(
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
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
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            },
            tabBarLabelStyle: {
              fontSize: 12,
            },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'HomeTab') {
                iconName = focused ? require('../assets/estate2.png') : require('../assets/estate1.png');
              } else if (route.name === 'AddPostModal') {
                iconName = focused ? require('../assets/add-box2.png') : require('../assets/add-box1.png');
              } else if (route.name === 'Payment') {
                iconName = focused ? require('../assets/wallet2.png') : require('../assets/wallet-icon.png');
              } else if (route.name === 'Subscribe') {
                iconName = focused ? require('../assets/group2.png') : require('../assets/group1.png');
              } else if (route.name === 'Profile') {
                iconName = focused ? require('../assets/user2.png') : require('../assets/user1.png');
              }
  
              return <Image source={iconName} style={{ width: 30, height: 30, tintColor: color }} resizeMode="contain" />;
            },
          })}
        >
            <Tab.Screen name="HomeTab" component={DrawerNavigator} />
            
            <Tab.Screen name="Payment" component={Payment} />
            <Tab.Screen name="AddPostModal" component={Placeholder}
            options={{
              tabBarButton: (props) => <CustomTabBarButton {...props} onPress={() => setModalVisible(true)} />,
            }}/>
            <Tab.Screen name="Subscribe" component={Subscribe} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>

        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Create Post / Go Live</Text>
              <View style={styles.buttonContainer}>
              <Button
                  mode="text"
                  onPress={() => {
                    navigation.navigate('PostingStack');
                    setModalVisible(!modalVisible);
                  }}
                  style={styles.button}
                  labelStyle={{ fontSize: 20, color: 'black' }}
                  icon={({ color, size }) => (
                    <Avatar.Image
                      size={30}
                      source={require('../assets/photo_blue_icon.png')}
                      style={{ backgroundColor: "#E9EFF7", alignSelf: 'center', }} 
                    />
                  )}
                >
                  Create a Post
                </Button>
                <Button
                  mode="text"
                  onPress={() => {
                    navigation.navigate('LiveStreamStack');
                    setModalVisible(!modalVisible);
                  }}
                  style={styles.button}
                  labelStyle={{ fontSize: 20, color: 'black' }}
                  textColor="black"
                  icon={({ color, size }) => (
                    <Avatar.Image
                      size={30}
                      source={require('../assets/play_icon.png')}
                      style={{ backgroundColor: "#E9EFF7", alignSelf: 'center', }} 
                    />
                  )}
                >
                  Go Live
                </Button>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
    </KeyboardAvoidingView>
    );
}
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default TabNavigator;


const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      marginBottom: 60
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    modalText: {
        color: 'black', 
        fontSize: 25,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center', 
    },
    button: {
      marginTop: 10,
      marginVertical: 10,
      width: '50%',
      alignSelf: 'center',
      justifyContent: 'center',
    },
  });