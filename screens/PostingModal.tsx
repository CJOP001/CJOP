import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const PostingModal = ({ isVisible, text, onCancel }) => {
  return (
    <Modal isVisible={isVisible} backdropOpacity={0.7} animationIn="slideInUp" animationOut="slideOutDown">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{text}</Text>
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
