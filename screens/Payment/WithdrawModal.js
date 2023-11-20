// WithdrawModal.js
import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Alert} from 'react-native';
import { Button } from 'react-native-paper';
import supabase from '../../supabase/supabase';

const reloadOptions = [10, 15, 20, 50, 100, 500];
const currentUserID = '1d93bd48-5c9e-43f0-9866-c0cd6a284a39';

const WithdrawModal = ({ visible, onClose, balance }) => {
  
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


const handleWithdrawal = async () => {
  setLoading(true);
  setError(null);
  
  try {
    console.log('Current balance:', balance);
    console.log('Selected amount:', selectedAmount);
    
    if (balance >= selectedAmount) {
      console.log(`Withdrawal confirmed with amount: $${selectedAmount}`);
      const newBalance = balance - selectedAmount;
      
      // Update the user's balance in the database
      const { error: updateError } = await supabase
        .from('credits')
        .update({ credit_amount: newBalance })
        .eq('user_id', currentUserID);

        if (updateError) {
          throw updateError;
        }

      // Insert a new row into the credit_transactions table
      const { error: insertError } = await supabase
        .from('credit_transactions')
        .insert([
          {
            user_id: currentUserID,
            amount: selectedAmount,
            transaction_type: 'Withdraw',
            date: new Date().toISOString(),
          },
        ]);

      if (insertError) {
        throw insertError;
      }
      
      
      onClose(); // Close the modal after withdrawal
    } else {
      console.log('Insufficient balance for withdrawal');
      Alert.alert('Insufficient Balance', 'You do not have enough credits to withdraw.');
    }
  } catch (error) {
    console.error('Error handling withdrawal:', error);
    // Handle the error, show an error message to the user, or retry the operation
  } finally {
    setLoading(false);
    setSelectedAmount(null);
  }
};

  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Withdraw Credits</Text>
            <Text style={styles.modalDescription}>
              Select the amount you want to withdraw from your account.
            </Text>
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
                  accessibilityLabel={`Select ${amount} credits`}
                >
                  {amount}
                </Button>
              ))}

            <Button
              mode="contained"
              onPress={handleWithdrawal}
              style={styles.modalButton}
              contentStyle={styles.buttonContent}
              disabled={selectedAmount === null}
              loading={loading}
            >
                Withdraw
            </Button>
            
            <Button
              mode="contained"
              onPress={() => {
                setSelectedAmount(null);
                onClose(); 
              }}
              style={styles.modalButton}
              contentStyle={styles.buttonContent}
            >
              Cancel
            </Button>
          </View>


        </View>
      </View>
    </Modal>
  );
};

export default WithdrawModal;

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
  modalDescription: {
    marginBottom: 10,
    color: '#7C82A1',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'left',
    maxWidth: 500,
    height: '50%',
    maxHeight: 400 ,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
  },
  amountText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalButton: {
    marginTop: 10,
    backgroundColor: '#72E6FF',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  buttonContent: {
    height: 'auto', 
    paddingHorizontal: 12, 
  },
  cancelButton: {
    flex: 1, 
    marginLeft: 5, 
  },   
});