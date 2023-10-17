import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

import { supabase } from '../supabase/supabase';

const PostingModal = ({ isVisible, headerText, subText1, onCancel, text, textInputValue }) => {
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
     try {
       const { data, error } = await supabase
         .from('news_management')
         .upsert([
           {
             description: textInputValue,
           },
         ])
         .select('*');

       if (error) {
         console.error('Error sending data to Supabase:', error);
       } else {
         console.log('Data sent to Supabase:', data);
         navigation.navigate('Home');
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
