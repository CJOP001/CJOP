//Payment_Modal.js
import React, { useState } from 'react';
import { View, Modal, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import supabase from '../supabase/supabase';

const reloadOptions = [10, 15, 20, 50, 100, 500];


const PaymentModal = ({ visible, onClose, creditTransactions, currentUserID }) => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

const handleUpdateCreditAmount = async (selectedAmount) => {
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

      onClose(selectedAmount);
      setSelectedAmount(null);
    } else {
      console.error('No balance data found.');
    }
  } catch (error) {
    console.error('Error updating credit amount:', error);
  }
};

const handleInsertCreditTransaction = async (selectedAmount) => {
  try {
    const transactionTime = new Date();

    // Insert a record in the credit_transaction table
    const { error: insertError, data: insertedTransaction } = await supabase
      .from('credit_transactions')
      .insert([
        {
          user_id: currentUserID,
          transaction_type: 'Reload',
          amount: selectedAmount,
          date: transactionTime.toISOString(),
        },
      ]);

    if (insertError) {
      throw insertError;
    }

    if (insertedTransaction && insertedTransaction.length > 0) {
      // Log the inserted transaction
      console.log('Inserted Transaction:', insertedTransaction[0]);
    } 
  } catch (error) {
    console.error('Error inserting credit transaction:', error);
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
              onPress={async () => {
                setIsLoading(true);
                try {
                  await handleUpdateCreditAmount(selectedAmount);
                  await handleInsertCreditTransaction(selectedAmount);
                  setIsLoading(false);
                  onClose(selectedAmount);
                  setSelectedAmount(null);
                } catch (error){
                  console.error('Error:', error);
                }
              }}
              style={[styles.modalButton, styles.confirmButton]}
              disabled={selectedAmount === null}
              loading={isLoading}
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