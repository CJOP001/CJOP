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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    bottom: screenHeight * 0.065,
    backgroundColor: 'rgba(204, 204, 204, 0.8)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 2.5,
    left: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    right: 10,
    minHeight: 265,
  },
  bottomSheetTitle: {
    bottom: 35,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
    color: 'black',
  },
  actionButton1: {
    bottom: 24,
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  actionButton2: {
    bottom: 12,
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 55,
    height: 55,
    right: -28,
    marginRight: 50,
  },
  subIconContainer: {
    bottom: 1, // Adjust the position as needed
    right: 60, // Adjust the position as needed
  },
  subIcon: {
    width: 24, // Adjust the sub-icon size as needed
    height: 24, // Adjust the sub-icon size as needed
  },
  actionButtonPressed: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  actionButtonText: {
    fontSize: 17,
    fontWeight: 'medium',
    textAlign: 'center',
    color: 'black',
  },
  bottomSheetText2: {
    bottom: 48,
    fontSize: 17,
    fontWeight: 'medium',
    textAlign: 'left',
    padding: 20,
    color: 'black',
    left: 95,
  },
});

export default AddingPost;
