import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, TouchableHighlight, StyleSheet, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import PostingDesc from '../screens/PostingDesc';

const AddingPost = ({ isVisible, onClose }) => {
  const navigation = useNavigation();
  const [isCreatePostPressed, setIsCreatePostPressed] = useState(false);
  const [isGoLivePressed, setIsGoLivePressed] = useState(false);

  const handleCreatePostPress = () => {
    setIsCreatePostPressed(true);
    navigation.navigate('PostingDesc');
  };

  const handleGoLivePress = () => {
    setIsGoLivePressed(true);
    // Add your logic for handling the "Go Live" press here
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
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
    bottom: 2.5,
    left: screenWidth * 0.02,
    borderBottomLeftRadius: screenWidth * 0.1,
    borderBottomRightRadius: screenWidth * 0.1,
    right: screenWidth * 0.02,
    minHeight: screenHeight * 0.3,
  },
  bottomSheetTitle: {
    bottom: screenHeight * 0.001,
    fontSize: screenWidth * 0.05,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: screenWidth * 0.04,
    color: 'black',
  },
  actionButton1: {
    bottom: screenHeight * 0.02,
    backgroundColor: 'white',
    borderRadius: screenWidth * 0.05,
    paddingHorizontal: screenWidth * 0.05,
    paddingVertical: screenWidth * 0.05,
  },
  actionButton2: {
    bottom: screenHeight * 0.01,
    backgroundColor: 'white',
    borderRadius: screenWidth * 0.05,
    paddingHorizontal: screenWidth * 0.05,
    paddingVertical: screenWidth * 0.05,
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: screenWidth * 0.15,
    height: screenWidth * 0.15,
    right: -screenWidth * 0.109,
    marginRight: screenWidth * 0.1,
  },
  subIconContainer: {
    bottom: 1, // Adjust the position as needed
    right: screenWidth * 0.08, // Adjust the position as needed
  },
  subIcon: {
    width: screenWidth * 0.04, // Adjust the sub-icon size as needed
    height: screenWidth * 0.04, // Adjust the sub-icon size as needed
  },
  actionButtonPressed: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  actionButtonText: {
    fontSize: screenWidth * 0.035,
    fontWeight: 'medium',
    textAlign: 'center',
    color: 'black',
  },
});

export default AddingPost;
