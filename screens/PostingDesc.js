import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { Appbar } from 'react-native-paper';
import OverlaySheetModal from './PostingModal';

const PostingDesc = ({ }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [textInputValue, setTextInputValue] = useState(''); // State for the text input
  const items = ['Option 1', 'Option 2', 'Option 3'];

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSelect = (item) => {
    setSelectedValue(item);
    toggleDropdown();
  };

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
              <View style={styles.dropdownList}>
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
        multiline={true} // Enable multiline
        textAlignVertical="top" // Align text to the top
      />

      {/* Clickable Icons */}
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.icon}>
          <Image
            source={require('../assets/camera_icon.png')} // Replace with the path to your icon image
            style={{ width: '100', aspectRatio: 1 }} // Use aspectRatio for responsive size
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Image
            source={require('../assets/paperclip_icon.png')} // Replace with the path to your icon image
            style={{ width: '100%', aspectRatio: 1, marginLeft: '10%' }} // Use aspectRatio for responsive size and margin for spacing
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Image
            source={require('../assets/photo_icon.png')} // Replace with the path to your icon image
            style={{ width: '100%', aspectRatio: 1, marginLeft: '10%' }} // Use aspectRatio for responsive size and margin for spacing
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon1} onPress={toggleModal}>
          <Image
            source={require('../assets/send_icon.png')} // Replace with the path to your icon image
            style={{ width: '100%', aspectRatio: 1, marginLeft: '10%' }} // Use aspectRatio for responsive size and margin for spacing
          />
        </TouchableOpacity>
      </View>

      <OverlaySheetModal isVisible={isModalVisible} text="Your modal text goes here" onCancel={toggleModal} />

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
    paddingHorizontal: '5%', // Adjust as needed
    marginTop: '5%', // Adjust as needed
    alignItems: 'center',
  },
  dropdownHeader: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    width: '90%', // Adjust as needed
    padding: '2%', // Adjust as needed
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
    width: '70%', // Adjust as needed
    backgroundColor: 'white',
    borderRadius: 4,
    elevation: 5,
    padding: '2%', // Adjust as needed
  },
  dropdownItem: {
    paddingVertical: '2%', // Adjust as needed
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '5%', // Adjust as needed
    marginTop: '3%', // Adjust as needed
  },
  profile_image: {
    width: '25%',
    aspectRatio: 1,
    borderRadius: 50, // Make it a circle
    borderWidth: 4,
    borderColor: '#FFF',
  },
  imageText: {
    marginLeft: '5%', // Adjust as needed
    fontSize: 16,
  },
  textInput: {
    margin: '5%',
    borderWidth: 1.25,
    marginRight: '10%',
    borderColor: 'white',
    borderRadius: 15,
    padding: '2%',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: '3%',
    marginTop: '2%', 
  },
  icon: {
    width: '15%',
    aspectRatio: 1,
    backgroundColor: 'white',
  },
  icon1: {
    width: '15%',
    aspectRatio: 1,
    backgroundColor: 'white',
  },
});

export default PostingDesc;
