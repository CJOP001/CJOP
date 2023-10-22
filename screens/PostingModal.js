import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

import supabase from '../supabase/supabase';

const handleConfirm = async () => {
  try {
    const { data, error } = await supabase
      .from('news_management')
      .insert([{ description: 'Hello' }])
      .select();

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

const PostingModal = ({ isVisible, text, onCancel }) => {

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const closeIconSizePercentage = 5;
  const modalContainerWidth = screenWidth * 0.9;
  const modalContainerHeight = screenHeight * 0.4;
  const closeButtonSize = modalContainerWidth * 0.05;
  const closeIconSize = closeButtonSize * 0.6;

 const navigation = useNavigation();


  return (
    <Modal isVisible={isVisible} backdropOpacity={0.7} animationIn="slideInUp" animationOut="slideOutDown">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Current Balance: credits</Text>
          <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    width: '80%',
    height: '40%',
  },
  modalTitle: {
  fontSize: 20,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: 'red',
    marginTop:123,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PostingModal;
