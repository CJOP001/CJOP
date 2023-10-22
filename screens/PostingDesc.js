import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { Appbar, List } from 'react-native-paper';
import OverlaySheetModal from './PostingModal';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import CameraModal from './CameraModal';
import { FlatList } from 'react-native';

class PostingDesc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      isDropdownVisible: false,
      selectedValue: null,
      textInputValue: '',
      items: ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7', 'Option 8', 'Option 9', 'Option 10'],
      image: null,
      cameraVisible: false,
    };
  }

   // Define the handleSelect function
    handleSelect = (selectedItem) => {
      // Update the selected value in the state
      this.setState({ selectedValue: selectedItem });

      // Close the dropdown
      this.toggleDropdown();
    };

  // Toggle the dropdown visibility
  toggleDropdown = () => {
    this.setState((prevState) => ({ isDropdownVisible: !prevState.isDropdownVisible }));
  };

  // Toggle the modal visibility
  toggleModal = () => {
    this.setState((prevState) => ({ isModalVisible: !prevState.isModalVisible }));
  };

  // Function to handle retaking the image
  retakeImage = () => {
    this.setState({ image: null });
  };

  // Handle when a picture is taken using the camera
  handlePictureTaken = (uri) => {
    this.setState({ image: uri });
  };


  // Toggle the camera modal visibility
 toggleCamera = async () => {
     const cameraStatus = await Camera.getCameraPermissionsAsync();
     if (cameraStatus.status === 'undetermined' || cameraStatus.status === 'denied') {
       // Request camera permissions
       const newStatus = await Camera.requestCameraPermissionsAsync();
       if (newStatus.status === 'granted') {
         // Camera permission granted, open the camera modal
         this.setState((prevState) => ({ cameraVisible: !prevState.cameraVisible }));
       } else {
         // Camera permission denied
         console.log('No access to camera');
       }
     } else if (cameraStatus.status === 'granted') {
       // Camera permission already granted, open the camera modal
       this.setState((prevState) => ({ cameraVisible: !prevState.cameraVisible }));
     } else {
       // Camera permission denied
       console.log('No access to camera');
     }
   };

  // Select an image from the device's gallery
  pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0];
      this.setState({ image: selectedImage.uri});
    }
  };

  render() {
    const {
      isDropdownVisible,
      selectedValue,
      textInputValue,
      items,
      image,
      cameraVisible,
      toggleCamera,
    } = this.state;
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    return (
      <ScrollView style={styles.container}>
        <Appbar.Header style={{ backgroundColor: '#72E6FF' }}>
          <Appbar.BackAction
            onPress={() => {
              console.log('Going back');
              this.props.navigation.goBack();
            }}
            style={styles.customBackAction}
          />
          <Appbar.Content title="Create" style={styles.appContent} />
        </Appbar.Header>

        <View style={styles.dropdownContainer}>
                  <TouchableOpacity onPress={this.toggleDropdown}>
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
                      onRequestClose={this.toggleDropdown}
                    >
                      <TouchableOpacity
                        style={styles.overlay}
                        activeOpacity={1}
                        onPress={this.toggleDropdown}
                      >
                        <View style={{ ...styles.dropdownList, width: screenWidth * 0.9 }}>
                          <FlatList
                            data={items}
                            keyExtractor={(item) => item}
                            initialNumToRender={5}
                            renderItem={({ item, index }) => (
                              <TouchableOpacity
                                key={index}
                                style={styles.dropdownItem}
                                onPress={() => this.handleSelect(item)}
                              >
                                <Text>{item}</Text>
                              </TouchableOpacity>
                            )}
                              style={{ height: screenHeight * 0.25 }}
                          />
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
          onChangeText={(text) => this.setState({ textInputValue: text })}
          value={textInputValue}
          placeholder="Enter your text here"
          multiline={true}
          textAlignVertical="top"
        />

        {/* Clickable Icons */}
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.icon} onPress={this.toggleCamera}>
            <Image
              source={require('../assets/camera_icon.png')}
              style={{ width: screenWidth * 0.07, height: screenWidth * 0.07 }}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.icon} onPress={this.pickImage}>
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
          <TouchableOpacity style={styles.icon} onPress={this.toggleModal}>
            <Image
              source={require('../assets/send_icon.png')}
              style={{ width: screenWidth * 0.1, height: screenWidth * 0.1, marginLeft: '3%', marginTop: '-14%' }}
            />
          </TouchableOpacity>
        </View>

        {/* Overlay modal for the modal text */}
        <OverlaySheetModal isVisible={this.state.isModalVisible} onCancel={this.toggleModal} textInputValue={textInputValue} image={this.state.image} />

        {/* Conditional rendering of Camera modal */}
        <CameraModal isVisible={cameraVisible} onClose={this.toggleCamera} onPictureTaken={this.handlePictureTaken} />

        {/* Conditional rendering of "Retake" button */}
        {image && (
          <TouchableOpacity style={styles.retakeButton} onPress={this.retakeImage}>
            <Text style={styles.retakeButtonText}>Retake</Text>
          </TouchableOpacity>
        )}

        {/* Display the taken image with flexible size */}
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{
                    width: screenWidth * 0.8,
                    height: screenHeight * 0.3,
                    alignSelf: 'center',
                    margin: '20%',
                    marginTop: '5%'
                  }}
                />
              )}
      </ScrollView>
    );
  }
}

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
  retakeButton: {
    backgroundColor: 'red',
      padding: 10,
      borderRadius: 50,
      alignSelf: 'center',
      marginTop: '2%',
      width: '40%',
      height: '5%',
  },
  retakeButtonText: {
    color: 'white',
    textAlign: 'center',
  },

});

export default PostingDesc;
