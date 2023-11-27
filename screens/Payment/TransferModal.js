// TransferModal.js
import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, KeyboardAvoidingView} from 'react-native';
import { Button, TextInput, HelperText } from 'react-native-paper';
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";

const TransferModal = ({ visible, onClose, onTransfer, currentUserID  }) => {
  // State for input values and error messages
  const [recipientID, setRecipientID] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [recipientError, setRecipientError] = useState('');
  const [amountError, setAmountError] = useState('');

  // Function to handle the transfer action
  const handleTransfer = () => {
    // Clear error messages
    setRecipientError('');
    setAmountError('');
  
    // Validate input (add more validation as needed)
    if (!recipientID) {
      setRecipientError('Recipient ID is required');
      return;
    }
  
    if (!transferAmount) {
      setAmountError('Transfer amount is required');
      return;
    }
  
    // Convert transferAmount to a number
    const amount = parseFloat(transferAmount);
  
    // Check if amount is a valid number
    if (isNaN(amount) || amount <= 0) {
      setAmountError('Please enter a valid transfer amount');
      return;
    }
  
    // Call the onTransfer callback with the entered data
    onTransfer(recipientID, amount);
  
    // Clear input fields and close the modal
    setRecipientID('');
    setTransferAmount('');
    onClose();
  };

  // Function to handle the cancel action
  const handleCancel = () => {
    // Clear error messages and input fields
    setRecipientError('');
    setAmountError('');
    setRecipientID('');
    setTransferAmount('');

    // Close the modal
    onClose();
  };

  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <KeyboardAvoidingView style={styles.modalContainer} behavior="height">
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Transfer Credits</Text>

          <TextInput
            mode='outlined'
            label="Phone Number"
            value={recipientID}
            onChangeText={(text) => setRecipientID(text)}
            style={styles.input}
            outlineColor='#72E6FF'
            activeOutlineColor='#72E6FF'
          />
          <HelperText type="error" visible={recipientError !== ''}>
            {recipientError}
          </HelperText>

          <TextInput
            mode='outlined'
            label="Transfer Amount"
            value={transferAmount}
            onChangeText={(text) => setTransferAmount(text)}
            keyboardType="numeric"
            style={styles.input}
            outlineColor='#72E6FF'
            activeOutlineColor='#72E6FF'
          />
          <HelperText type="error" visible={amountError !== ''}>
            {amountError}
          </HelperText>


          <View style={styles.buttonGrid}>
            <Button
              mode="contained"
              onPress={handleTransfer}
              style={styles.modalButton}
              contentStyle={styles.buttonContent}
            >
              Transfer
            </Button>
            <Button
              mode="contained"
              onPress={handleCancel}
              style={styles.modalButton}
              contentStyle={styles.buttonContent}
            >
              Cancel
            </Button>
          </View>

        </View>
      </KeyboardAvoidingView>
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
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'left',
    maxWidth: 500,
    minHeight: 300,
    height: '40%',
    //maxHeight: 400 ,
  },
  modalButton: {
    marginTop: 10,
    backgroundColor: '#72E6FF',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
  },
  buttonContent: {
    height: 'auto', // Set height to 'auto' for text wrapping
    paddingHorizontal: 12, // Adjust horizontal padding as needed
  },
  cancelButton: {
    flex: 1, 
    marginLeft: 5, 
  },
  input: {
    marginVertical: 5,
  },  
});