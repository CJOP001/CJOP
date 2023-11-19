// TransferModal.js
import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const TransferModal = ({ visible, onClose }) => {
  // Add your transfer modal content and logic here

  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Transfer</Text>
          <Button
            mode="contained"
            onPress={() => {
              onClose();
            }}
            style={styles.modalButton} 
            contentStyle={styles.buttonContent}
          >
            Cancel
          </Button>

        </View>
      </View>
    </Modal>
  );
};

export default TransferModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    height: '40%',
    alignItems: 'center',
  },
  modalButton: {
    marginTop: 10,
    backgroundColor: '#72E6FF',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  buttonContent: {
    height: 'auto', // Set height to 'auto' for text wrapping
    paddingHorizontal: 12, // Adjust horizontal padding as needed
  },
  cancelButton: {
    flex: 1, 
    marginLeft: 5, 
  },   
});