import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

import supabase from '../supabase/supabase';


const PostingModal = ({ isVisible, headerText, subText1, onCancel, text, textInputValue, image}) => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const closeIconSizePercentage = 5;
  const modalContainerWidth = screenWidth * 0.9;
  const modalContainerHeight = screenHeight * 0.4;
  const closeButtonSize = modalContainerWidth * 0.05;
  const closeIconSize = closeButtonSize * 0.6;

  const navigation = useNavigation();

  const handleConfirm = async () => {
    console.log('Text Input:', textInputValue);

    const timestamp = Date.now();
    const imageName = `image/${timestamp}`;

    const currentDate = new Date();
    const now = currentDate.toISOString();

    try {
      if (image) {
        // Determine the MIME type based on the file extension
        let mimeType;
        const fileExtension = image.split('.').pop().toLowerCase();
        switch (fileExtension) {
          case 'jpeg':
          case 'jpg':
            mimeType = 'image/jpeg';
            break;
          case 'png':
            mimeType = 'image/png';
            break;
          default:
          if (!mimeType) {
              console.error('Invalid MIME type for the image');
              return;
            }
        }

          // Log the image URL
                console.log('Image URL:', image);

 // Convert the image data to base64
        const imageBase64 = await fetch(image).then((res) => res.blob()).then((blob) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
              resolve(reader.result);
            };
            reader.readAsDataURL(blob);
          });
        });

        // Create a FormData object and append the image
        var formData = new FormData();
        formData.append("files", {
          uri: imageBase64, // Use the base64 image data
          type: mimeType, // Set the correct MIME type
          name: imageName,
        });

        // Store the image in the Supabase bucket
        const { data: fileData, error: fileError } = await supabase.storage
          .from('Testing')
          .upload(imageName, formData);

        console.log('Image:', imageName);
        console.log('Image Data:', fileData); // Log the image data

        if (fileError) {
          console.error('Error uploading image:', fileError);
        } else {
            const imageUrl = `https://imbrgdnynoeyqyotpxaq.supabase.co/storage/v1/object/public/Testing/${imageName}`;

          // Store the imageUrl and text input in your database
          const { data: postData, error: postError } = await supabase
            .from('news_management')
            .insert([
              {
                description: textInputValue,
                image_path: imageUrl,
                created_at: now,
              },
            ])
            .select('*');

          if (postError) {
            console.error('Error sending data to Supabase:', postError);
          } else {
            console.log('Data sent to Supabase:', postData);
            navigation.navigate('TabNavigator');
          }
        }
      }
    } catch (error) {
      console.error('Error sending data to Supabase:', error);
    }
  };


  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
    },
    headerText: {
      fontSize: modalContainerWidth * 0.07, // Adjust the fontSize as needed
      fontWeight: 'bold',
      marginLeft: modalContainerWidth * 0.005, // Adjust the margin as needed
      marginTop: modalContainerWidth * -0.037, // Adjust the margin as needed
    },
    subText1: {
      fontWeight: 'bold',
      fontSize: modalContainerWidth * 0.05, // Adjust the fontSize as needed
      marginTop: modalContainerWidth * 0.06, // Adjust the margin as needed
    },
    closeButton: {
      position: 'absolute',
      top: closeButtonSize * 0.5,
      right: closeButtonSize * 0.5,
      padding: closeButtonSize,
    },
    closeIcon: {
      width: modalContainerWidth * (closeIconSizePercentage / 100),
      height: modalContainerWidth * (closeIconSizePercentage / 100),
    },
    modalContent: {
      backgroundColor: 'white',
      padding: modalContainerWidth * 0.1,
      width: modalContainerWidth,
      height: modalContainerHeight,
    },
    modalTitle: {
      fontSize: modalContainerWidth * 0.07,
    },
    modalText: {
      fontSize: modalContainerWidth * 0.04,
      marginBottom: modalContainerWidth * 0.08,
    },
    confirmButton: {
      backgroundColor: '#72E6FF',
      marginTop: modalContainerHeight * 0.1,
      padding: modalContainerWidth * 0.05,
      borderRadius: modalContainerWidth * 0.02,
      alignItems: 'center',
    },
    confirmButtonText: {
      color: 'white',
      fontSize: modalContainerWidth * 0.04,
      fontWeight: 'bold',
    },
  });

  return (
    <Modal isVisible={isVisible} backdropOpacity={0.7} animationIn="slideInUp" animationOut="slideOutDown">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onCancel} style={styles.closeButton}>
            <Image
              source={require('../assets/cross_button.png')}
              style={styles.closeIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Posting</Text>
          <Text style={styles.subText1}>10 Credits will be deducted</Text>
          <Text style={styles.modalText}>Current Balance: credits</Text>
          <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PostingModal;
