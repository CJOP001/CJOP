//Payment_Modal.js
import React, { useState } from 'react';
import { View, Modal, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import supabase from '../supabase/supabase';

const reloadOptions = [10, 15, 20, 50, 100, 500];


const PaymentModal = ({ visible, onClose, updateSpentHistory, spentHistoryData, currentUserID }) => {
  const [selectedAmount, setSelectedAmount] = useState(null);

  const handleInsertCreditAmount = async (selectedAmount) => {
    try {
      // Retrieve the user's current credit balance from data source
      const { data, error } = await supabase
        .from('credits')
        .select('credit_amount')
        .eq('user_id', currentUserID);
  
      if (error) {
        throw error;
      }
  
      if (data && data.length > 0) {
        // Calculate the new credit balance
        const currentCreditAmount = data[0].credit_amount;
        const newCreditAmount = currentCreditAmount + selectedAmount;
  
        // Update the user's credit balance in the data source
        const { error: updateError } = await supabase
          .from('credits')
          .update({ credit_amount: newCreditAmount })
          .eq('user_id', currentUserID);
  
        if (updateError) {
          throw updateError;
        }
  
        console.log('Credit amount inserted successfully:', selectedAmount);
        console.log('User ID:', currentUserID);
        console.log('New Credit Balance:', newCreditAmount);
  
        // After inserting the credit amount, update the spent history data
        const currentDate = new Date();
        const date = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
  
        const updatedSpentHistory = [
          {
            credit_amount: selectedAmount,
            date: date,
          },
          ...spentHistoryData,
        ];
  
        updateSpentHistory(updatedSpentHistory);
  
        onClose(selectedAmount);
        setSelectedAmount(null);
      } else {
        console.error('No balance data found.');
      }
    } catch (error) {
      console.error('Error updating credit amount:', error);
    }
  };
  
  

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
                handleInsertCreditAmount(selectedAmount);;
              }}
              style={[styles.modalButton, styles.confirmButton]}
              disabled={selectedAmount === null}
            >
              Confirm Reload
            </Button>
            <Button
              mode="contained"
              onPress={() => {
                setSelectedAmount(selectedAmount); // Clear the selected amount
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
