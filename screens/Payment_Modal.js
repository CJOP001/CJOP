import React, { useState } from 'react';
import { View, Modal, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';

const reloadOptions = [10, 15, 20, 50, 100, 500];

const PaymentModal = ({ visible, onClose }) => {
  const [selectedAmount, setSelectedAmount] = useState(null);

  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Reload Amount</Text>
          <View style={styles.buttonGrid}>
            {reloadOptions.map((amount) => (
              <Button
                key={amount}
                mode='contained' 
                onPress={() => setSelectedAmount(amount)}
                style={[
                  styles.modalButton,
                  {
                    width: '30%',
                    height:'40%',
                    backgroundColor: selectedAmount === amount ? '#72E6FF' : '#E9EFF7',
                  }, 
                ]}
                uppercase={false}
                disabled={selectedAmount === amount}
                labelStyle={styles.amountText}
              >
                {amount}
              </Button>
            ))}

            {/* Add the Confirm Reload and Cancel buttons to the grid */}
            <Button
              mode="contained"
              onPress={() => {
                onClose(selectedAmount);
                setSelectedAmount(null);
              }}
              style={[styles.modalButton, styles.confirmButton]}
              disabled={selectedAmount === null}
            >
              Confirm Reload
            </Button>
            <Button
              mode="contained"
              onPress={() => {
                setSelectedAmount(null); // Clear the selected amount
                onClose(); // Close the modal
              }}
              style={[styles.modalButton, styles.cancelButton]}
            >
              Cancel
            </Button>
          </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    height: '40%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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
  },
  amountText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row', // Align buttons horizontally
    justifyContent: 'space-between', // Add space between buttons
    marginTop: 10,
  },
  confirmButton: {
    flex: 3, // 
    marginRight: 5, 
  },
  cancelButton: {
    flex: 1, 
    marginLeft: 5, 
  },   
});

export default PaymentModal;
