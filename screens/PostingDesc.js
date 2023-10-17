import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Image, TextInput, ScrollView, Dimensions } from 'react-native';
import { Appbar } from 'react-native-paper';
import OverlaySheetModal from './PostingModal';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

// Create a CameraModal component
const CameraModal = ({ isVisible, onClose, onPictureTaken }) => {
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync();
        onPictureTaken(uri);
        onClose();
      } catch (e) {
        console.log('Error taking picture:', e);
      }
    }
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.cameraModal}>
        <Camera
          style={styles.camera}
          type={cameraType}
          flashMode={flashMode}
          ref={cameraRef}
        />
        <View style={styles.cameraControls}>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <Image source={require('../assets/cross_button.png')} style={styles.closeButtonImage} />
                </TouchableOpacity>
          <View style={styles.captureButtonContainer}>
            <TouchableOpacity style={styles.captureButton} onPress={takePicture} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const PostingDesc = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [textInputValue, setTextInputValue] = useState('');
  const items = ['Option 1', 'Option 2', 'Option 3'];
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(false);

  // Function to toggle the dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  // Function to toggle the modal visibility
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Function to handle retaking the image
  const retakeImage = () => {
    setImage(null); // Reset the image state to null
  };

  const handlePictureTaken = (uri) => {
    setImage(uri);
  };

  useEffect(() => {
    (async () => {
      // Request media library permissions
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('No access to media library');
      }

      // Request camera permissions
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  if (hasCameraPermission === false) {
    return <Text> No Access to Camera </Text>;
  }

  // Get the screen dimensions
  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView style={styles.container}>
      <Appbar.Header style={{ backgroundColor: '#72E6FF' }}>
        <Appbar.BackAction
          onPress={() => {
            console.log('Going back');
            navigation.goBack();
          }}
          style={styles.customBackAction}
        />
        <Appbar.Content title="Create" style={styles.appContent} />
      </Appbar.Header>

      {/* Custom drop-down list */}
      <View style={styles.dropdownContainer}>
        <TouchableOpacity onPress={toggleDropdown}>
          <View style={styles.dropdownHeader}>
            <Text style={styles.selectedValueText}>
              {selectedValue || 'Select the categories'}
            </Text>
          </View>
        </TouchableOpacity>
        {isDropdownVisible && (
          <Modal
            transparent={true}
            animationType="fade"
            visible={isDropdownVisible}
            onRequestClose={toggleDropdown}
          >
            <TouchableOpacity
              style={styles.overlay}
              activeOpacity={1}
              onPress={toggleDropdown}
            >
              <View style={{ ...styles.dropdownList, width: screenWidth * 0.9 }}>
                {items.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => handleSelect(item)}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </Modal>
        )}
      </View>

      {/* Image and Text */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/userProfile.png')}
          style={styles.profile_image}
        />
        <Text style={styles.imageText}>Agugu</Text>
      </View>

      {/* Text Input */}
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => setTextInputValue(text)}
        value={textInputValue}
        placeholder="Enter your text here"
        multiline={true}
        textAlignVertical="top"
      />

      {/* Clickable Icons */}
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.icon} onPress={() => setCameraVisible(true)}>
          <Image
            source={require('../assets/camera_icon.png')}
            style={{ width: screenWidth * 0.07, height: screenWidth * 0.07 }}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon}>
          <Image
            source={require('../assets/photo_icon.png')}
            style={{ width: screenWidth * 0.07, height: screenWidth * 0.07, marginRight: '5%' }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Image
            source={require('../assets/paperclip_icon.png')}
            style={{ width: screenWidth * 0.07, height: screenWidth * 0.07, marginLeft: '5%' }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={toggleModal}>
          <Image
            source={require('../assets/send_icon.png')}
            style={{ width: screenWidth * 0.1, height: screenWidth * 0.1, marginLeft: '3%', marginTop: '-14%' }}
          />
        </TouchableOpacity>
      </View>

      <OverlaySheetModal isVisible={isModalVisible} text="Your modal text goes here" onCancel={toggleModal} textInputValue={textInputValue} />

      {/* Conditional rendering of Camera modal */}
      <CameraModal isVisible={cameraVisible} onClose={() => setCameraVisible(false)} onPictureTaken={handlePictureTaken} />

      {/* Conditional rendering of "Retake" button */}
      {image && (
        <TouchableOpacity style={styles.retakeButton} onPress={retakeImage}>
          <Text style={styles.retakeButtonText}>Retake</Text>
        </TouchableOpacity>
      )}

      {/* Display the taken image */}
      {image && <Image source={{ uri: image }} style={styles.takenImage} />}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  customBackAction: {
    marginLeft: -10,
  },
  appContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownContainer: {
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownHeader: {
    borderWidth: 1.5,
    borderColor: 'gray',
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    padding: '2%',
  },
  selectedValueText: {
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownList: {
    backgroundColor: 'white',
    borderRadius: 4,
    elevation: 5,
    padding: '2%',
  },
  dropdownItem: {
    paddingVertical: '2%',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '5%',
    marginTop: '3%',
  },
  profile_image: {
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFF',
    width: 50,
    height: 50,
  },
  imageText: {
    marginLeft: '5%',
    fontSize: 16,
  },
  textInput: {
    margin: '5%',
    borderWidth: 1.25,
    borderColor: 'white',
    borderRadius: 15,
    padding: '2%',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '3%',
    marginTop: '54%',
  },
  icon: {
    backgroundColor: 'white',
    marginLeft: 10,
  },
  cameraModal: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'flex-end',
  },
  camera: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  captureButtonContainer: {
    flex: 1,
    alignItems: 'center', // Center the capture button
    justifyContent: 'center', // Center the capture button
  },
  captureButton: {
    backgroundColor: 'white',
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  closeButtonImage: {
    width: 30,
    height: 30,
  },
  retakeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 10,
  },
  retakeButtonText: {
    color: 'white',
  },
  takenImage: {
    width: 200,
    height: 200,
    margin: 20,
  },
});

export default PostingDesc;
