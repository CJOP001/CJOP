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
  FlatList,
} from 'react-native';
import { Appbar, List } from 'react-native-paper';
import OverlaySheetModal from './PostingModal';
import {launchImageLibrary} from 'react-native-image-picker';
import CameraModal from './CameraModal';
import categories from '../../components/categories';
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../../supabase/supabase';

class PostingDesc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      isDropdownVisible: false,
      selectedValue: null,
      textInputValue: '',
      items: [],
      image: null,
      cameraVisible: false,
      hasCameraPermission: null,
      userId: null,
    };
  }

  // Fetch categories when the component mounts
  componentDidMount() {
    this.fetchCategories();
     this.initializeData();
  }

   initializeData = async () => {
      try {
        // Fetch user ID from async storage
        const userId = await AsyncStorage.getItem('uid');
        console.log('(Payment initialize)User ID:', userId);

        if (userId) {
          // Set the retrieved user ID to the state variable
          this.setState({ userId });

          // Fetch user details using the userId
          await this.fetchUserDetails(userId);

          // Additional data initialization can be done here if needed
        } else {
          console.error('User ID not available.');
        }
      } catch (error) {
        console.error('Error initializing data:', error);
      }
    };

    // Fetch user details using the userId
    fetchUserDetails = async (userId) => {
      try {
        const { data, error } = await supabase
          .from('app_users')
          .select('*')
          .eq('id', userId);  // Use the correct column name, possibly 'user_id' or 'id'

        if (error) {
          throw error;
        }

        console.log('User Details:', data);
        this.setState({ userDetails: data[0] });

      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

  // Fetch categories from Supabase
  fetchCategories = async () => {
    try {
      const fetchedCategories = await categories(); // Rename the variable
      this.setState({ items: fetchedCategories });
    } catch (error) {
      console.error('Error fetching categories:', error.message);
    }
  };

  // Define the handleSelect function
  handleSelect = (selectedItem) => {
    // Update the selected value in the state
    this.setState({ selectedValue: selectedItem.type, selectedCategoryId: selectedItem.id });

    // Close the dropdown
    this.toggleDropdown();
  };

  // Toggle the dropdown visibility
  toggleDropdown = () => {
    this.setState((prevState) => ({ isDropdownVisible: !prevState.isDropdownVisible }));
  };

  // Toggle the modal visibility with image check
  toggleModal = () => {
    const { image, textInputValue, selectedValue, selectedCategoryId, userId } = this.state;

    // Check if the selectedValue is empty
    if (!selectedValue) {
      // Show a warning
      alert('Please select a category before sending.');

      // Do not open the overlay sheet modal
      return;
    }

    // Check if the image is null or empty
    if (!image) {
      // Show a warning
      alert('Please select or capture an image before sending.');

      // Do not open the overlay sheet modal
      return;
    }

    // Open the overlay sheet modal
    this.setState((prevState) => ({ isModalVisible: !prevState.isModalVisible }));
    this.setState({ modalUserId: userId });
  };

  // Function to handle retaking the image
  retakeImage = () => {
    this.setState({ image: null });
  };

handlePictureTaken = (response) => {
  if (response && response.uri) {
    this.setState({ image: response.uri });
  }
};


  // Toggle the camera modal visibility
  toggleCamera = async () => {
    this.setState((prevState) => ({ cameraVisible: !prevState.cameraVisible }));
  };


  // Select an image from the device's gallery
pickImage = async () => {

  launchImageLibrary(
    {
      mediaType: 'photo',
      selectionLimit: 1,
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    },
    (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = { uri: response.assets[0].uri };
        this.setState({ image: selectedImage.uri });
      }
    }
  );
};

  render() {
    const {
      isDropdownVisible,
      selectedValue,
      textInputValue,
      items,
      image,
      cameraVisible,
      userDetails,
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
                    keyExtractor={(item) => item.nc_id}
                    initialNumToRender={5}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => this.handleSelect(item)}
                      >
                        <Text>{item.type}</Text>
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
                {userDetails && userDetails.user_image && (
                  <Image
                    source={{ uri: userDetails.user_image }}
                    style={styles.profile_image}
                  />
                )}
                {userDetails && userDetails.fullname && (
                  <Text style={styles.imageText}>{userDetails.fullname}</Text>
                )}
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
              source={require('../../assets/camera_icon.png')}
              style={{ width: screenWidth * 0.07, height: screenWidth * 0.07 }}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.icon} onPress={this.pickImage}>
            <Image
              source={require('../../assets/photo_icon.png')}
              style={{
                width: screenWidth * 0.07,
                height: screenWidth * 0.07,
                marginRight: '5%',
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.icon} onPress={this.toggleModal}>
            <Image
              source={require('../../assets/send_icon.png')}
              style={{
                width: screenWidth * 0.1,
                height: screenWidth * 0.1,
                marginLeft: '3%',
                marginTop: '-14%',
              }}
            />
          </TouchableOpacity>
        </View>

        {/* Overlay modal for the modal text */}
        <OverlaySheetModal
          isVisible={this.state.isModalVisible}
          onCancel={this.toggleModal}
          textInputValue={textInputValue}
          image={this.state.image}
          selectedCategoryId={this.state.selectedCategoryId}
          userId={this.state.modalUserId}
        />

        {/* Conditional rendering of Camera modal */}
        {this.state.cameraVisible && (
          <CameraModal
            isVisible={cameraVisible}
            onClose={this.toggleCamera}
            onPictureTaken={this.handlePictureTaken}
          />
        )}

        {/* Conditional rendering of "Retake" button */}
        {this.state.image && (
          <TouchableOpacity style={styles.retakeButton} onPress={this.retakeImage}>
            <Text style={styles.retakeButtonText}>Retake</Text>
          </TouchableOpacity>
        )}

        {/* Display the taken image with flexible size */}
        {this.state.image && (
          <Image
            source={{ uri: image }}
            style={{
              width: screenWidth * 0.8,
              height: screenHeight * 0.3,
              alignSelf: 'center',
              margin: '20%',
              marginTop: '5%',
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
