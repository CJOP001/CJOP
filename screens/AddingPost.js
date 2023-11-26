import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, TouchableHighlight, StyleSheet, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import PostingDesc from './NewsCreation/PostingDesc';

const AddingPost = ({ isVisible, onClose }) => {
  const navigation = useNavigation();
  const [isCreatePostPressed, setIsCreatePostPressed] = useState(false);
  const [isGoLivePressed, setIsGoLivePressed] = useState(false);

  const handleCreatePostPress = () => {
    setIsCreatePostPressed(true);
    const currentScreen = navigation.getState().routes[navigation.getState().index];
    console.log('Current Screen:', currentScreen.name);
    navigation.navigate('PostStack');
  };

  const handleGoLivePress = () => {
    setIsGoLivePressed(true);
    const currentScreen = navigation.getState().routes[navigation.getState().index];
    console.log('Current Screen:', currentScreen.name);
    navigation.navigate('LiveStack');
  };

  if (isVisible) {
    const currentScreen = navigation.getState().routes[navigation.getState().index];
    console.log('Current Screen:', currentScreen.name);
  }

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={onClose}
        >
          <View style={styles.bottomSheet}>
            <Text style={styles.bottomSheetTitle}>Create</Text>
            <TouchableHighlight
              style={[
                styles.actionButton1,
                isCreatePostPressed ? styles.actionButtonPressed : null,
              ]}
              underlayColor="#DDDDDD"
              onPress={handleCreatePostPress}
              onHideUnderlay={() => setIsCreatePostPressed(false)}
            >
              <View style={styles.actionButtonContent}>
                <Image
                  source={require('../assets/eclipse_Post.png')}
                  style={styles.icon}
                />
                <View style={styles.subIconContainer}>
                  <Image
                    source={require('../assets/photo_blue_icon.png')}
                    style={styles.subIcon}
                  />
                </View>
                <Text style={styles.actionButtonText}>Create a Post</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={[
                styles.actionButton2,
                isGoLivePressed ? styles.actionButtonPressed : null,
              ]}
              underlayColor="#DDDDDD"
              onPress={handleGoLivePress}
              onHideUnderlay={() => setIsGoLivePressed(false)}
            >
              <View style={styles.actionButtonContent}>
                <Image
                  source={require('../assets/eclipse_Post.png')}
                  style={styles.icon}
                />
                <View style={styles.subIconContainer}>
                  <Image
                    source={require('../assets/play_icon.png')}
                    style={styles.subIcon}
                  />
                </View>
                <Text style={styles.actionButtonText}>Go Live</Text>
              </View>
            </TouchableHighlight>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    bottom: screenHeight * 0.065,
    backgroundColor: 'rgba(204, 204, 204, 0.8)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: screenWidth * 0.1,
    borderTopRightRadius: screenWidth * 0.1,
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: '2.5%',
    left: screenWidth * 0.02,
    borderBottomLeftRadius: screenWidth * 0.1,
    borderBottomRightRadius: screenWidth * 0.1,
    right: screenWidth * 0.02,
    minHeight: screenHeight * 0.345,
  },
  bottomSheetTitle: {
    bottom: screenHeight * 0.0015,
    fontSize: screenWidth * 0.05,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: screenWidth * 0.1,
    color: 'black',
  },
  actionButton1: {
    bottom: screenHeight * 0.02,
    backgroundColor: 'white',
    borderRadius: screenWidth * 0.05,
    paddingHorizontal: screenWidth * 0.03,
    paddingVertical: screenWidth * 0.03,
  },
  actionButton2: {
    bottom: screenHeight * 0.01,
    backgroundColor: 'white',
    borderRadius: screenWidth * 0.05,
    paddingHorizontal: screenWidth * 0.03,
    paddingVertical: screenWidth * 0.03,
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    borderRadius: 50,
    width: screenWidth * 0.16,
    height: screenWidth * 0.16,
    right: -screenWidth * 0.109,
    marginRight: screenWidth * 0.1,
  },
  subIconContainer: {
    bottom: 0.7,
    right: screenWidth * 0.0855,
  },
  subIcon: {
    marginRight: '10%',
    right: '10%',
    width: screenWidth * 0.065,
    height: screenWidth * 0.065,
  },
  actionButtonPressed: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  actionButtonText: {
    paddingHorizontal: '-15%',
    fontSize: screenWidth * 0.035,
    fontWeight: 'medium',
    textAlign: 'center',
    color: 'black',
  },
});

export default AddingPost;
