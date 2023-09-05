import { StyleSheet, Text, View } from 'react-native';
import { Appbar, Button, Card } from 'react-native-paper';
import { useState } from 'react';
import PaymentModal from './Payment_Modal';
import * as React from 'react';

const Payment = ({ navigation }) => {
  
  const [balance, setBalance] = useState(null);

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleConfirmReload = (amount) => {
    // Handle the selected reload amount here
    console.log(`Reload confirmed with amount: $${amount}`);
    toggleModal();
  };


  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: '#72E6FF' }}>
        <View style={styles.customBackAction}>
          <Appbar.BackAction 
            onPress={() => {
              console.log('Going back');
              navigation.goBack();
            }}
          />
        </View>
        <Appbar.Content title="Wallet" style={styles.appContent}/>
      </Appbar.Header>
      
      <View style={{ alignItems: 'center', padding: 15 }}>
        <Card mode='outlined' style={{ width: '100%', height: '90%', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, textAlign: 'center', padding: 15 }}>
            Balance
          </Text>
          <Text style={styles.text}>500 {balance}Credit</Text>
          <Button mode="contained" 
            onPress={() => toggleModal()}
            labelStyle={{ fontSize: 21, color: 'white' }}
            style={{ backgroundColor: '#72E6FF' }} 
          >
            Reload
          </Button>

          <PaymentModal
            visible={isModalVisible}
            onClose={(amount) => handleConfirmReload(amount)}
          />

          <Text style={{ fontFamily: '', textAlign: 'center', color: '#72E6FF', padding: 10, fontSize: 25, fontWeight: 'bold' }}>
            Transfer Credit
          </Text>


        </Card>
      </View>
    </View>
  );
}

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 35,
    textAlign: 'center',
    padding: 15,
    fontWeight: '500',
  },
  customBackAction: {
    marginLeft: -10, // Adjust the back action position if needed
  },
  appContent:{
    alignItems: 'center',
    justifyContent: 'center',
  },
});
