import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Image, TextInput } from 'react-native';
import { Appbar } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
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
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: '#72E6FF' }}>
        <View style={styles.customBackAction}>
          <Appbar.BackAction
            onPress={() => {
              console.log('Going back');
              navigation.goBack();
            }}
          />
        </View>
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
          style={styles.image}
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
              style={{ width: 35, height: 35 }} // Set the width and height of the image
              />
              </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Image
              source={require('../assets/paperclip_icon.png')} // Replace with the path to your icon image
              style={{ width: 30, height: 30, marginLeft:15 }} // Set the width and height of the image
              />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
           <Image
               source={require('../assets/photo_icon.png')} // Replace with the path to your icon image
               style={{ width: 35, height: 35, marginLeft:30}} // Set the width and height of the image
               />
        </TouchableOpacity>

      <TouchableOpacity style={styles.icon1} onPress={toggleModal}>
           <Image
               source={require('../assets/send_icon.png')} // Replace with the path to your icon image
               style={{ width: 40, height: 40, marginLeft:75, marginTop:-7}} // Set the width and height of the image
               />
              </TouchableOpacity>
      </View>

      <OverlaySheetModal isVisible={isModalVisible} text="Your modal text goes here" onCancel={toggleModal} />

    </View>
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
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
    alignItems: 'center',
  },
  dropdownHeader: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    width: 275,
    padding: 10,
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
    width: 200,
    backgroundColor: 'white',
    borderRadius: 4,
    elevation: 5,
    padding: 10,
  },
  dropdownItem: {
    paddingVertical: 8,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 27,
  },
  image: {
    width: 77,
    height: 74,
    flexShrink: 0,
    borderRadius: 77,
    borderWidth: 4,
    borderColor: '#FFF',
  },
  imageText: {
    marginLeft: 10,
    fontSize: 16,
  },
  textInput: {
    margin: 20,
    borderWidth: 1.25,
    marginRight: 42,
    height: 345,
    width: 368,
    borderColor: 'white',
    borderRadius: 15,
    padding: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    marginHorizontal: 3,
    marginTop: -3,
  },
  icon: {
    width: 20, // Adjust width as needed
    height: 20, // Adjust height as needed
    margin: 9, // Adjust margin as needed
    marginLeft: 20,
    backgroundColor: 'white', // Set the background color or add your icon image here
  },
  icon1: {
  width: 40,
  height: 40, // Adjust height as needed
  margin: 9, // Adjust margin as needed
  marginLeft: 130,
  backgroundColor: 'white',
  },

});

export default PostingDesc;
