
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, RefreshControl, SafeAreaView } from 'react-native';
import { Appbar, Button, Card } from 'react-native-paper';
import { Tab, TabView } from '@rneui/themed';
import supabase from '../supabase/supabase';
import PaymentModal from './Payment_Modal';

const Payment = ({ navigation }) => {
  // State variables
  const { width } = Dimensions.get('window');
  const buttonWidth = width * 0.3;
  const [balance, setBalance] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [index, setIndex] = useState(0);
  const [creditTransactions, setCreditTransactions] = useState([]);
  const [isRefreshing, setRefreshing] = useState(false);

  // Constants
  const currentUserID = '1d93bd48-5c9e-43f0-9866-c0cd6a284a39';

  // Constants for transaction types
  const TRANSACTION_RELOAD = 'reload';
  const TRANSACTION_RECEIVED = 'received';
  const TRANSACTION_POST = 'post';

// Function to fetch balance
const fetchBalance = async () => {
  try {
    const { data, error } = await supabase
      .from('credits')
      .select('credit_amount')
      .eq('user_id', currentUserID);
    if (error) {
      throw error;
    }

    if (data && data.length > 0) {
      setBalance(data[0].credit_amount);
    } else {
      console.error('No balance data found.');
    }
  } catch (error) {
    console.error('Error fetching balance:', error);
  }
};

// Function to fetch user's credit transactions
const fetchCreditTransactions = async () => {
  try {
    const { data, error } = await supabase
      .from('credit_transactions')
      .select('*')
      .eq('user_id', currentUserID)
      .order('date', { ascending: false });
    if (error) {
      throw error;
    }
    setCreditTransactions(data);
  } catch (error) {
    console.error('Error fetching credit transactions:', error);
  }
};


// Function to handle refresh
const handleRefresh = async () => {
  setRefreshing(true); // Start the refresh animation

  try {
    await fetchBalance();
    await fetchCreditTransactions();
  } catch (error) {
    console.error('Error refreshing data:', error);
  } finally {
    setRefreshing(false); // Stop the refresh animation when data is fetched
  }
};

  useEffect(() => {
    fetchBalance();
    fetchCreditTransactions();
  }, []);

  // Function to toggle the modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Function to handle confirming the reload
const handleConfirmReload = (amount) => {
  console.log(`Reload confirmed with amount: $${amount}`);
  toggleModal();
};

/*const handleReload = async (amount) => {
  try {
    // Perform the reload operation here (e.g., send a payment request to a payment gateway).
    // If the reload is successful, call the update and insert functions.
    const reloadSuccessful = await performReloadOperation(amount);

    if (reloadSuccessful) {
      // Call the update function to update the credit balance.
      await handleUpdateCreditAmount(amount);

      // Call the insert function to log the credit transaction.
      await handleInsertCreditTransaction(amount);
    } else {
      // Handle the case where the reload was not successful.
      console.error('Reload operation failed.');
    }
  } catch (error) {
    console.error('Error handling reload:', error);
  }
};*/


  const renderContent = () => {
    return (
      <View>
        {index === 0 && (
          <View style={{ flex: 1 }}>
            {creditTransactions.map((item, index) => (
              <Card key={index} style={{ marginVertical: 10 }}>
                <Card.Content style={styles.cardContainer}>
                  <Image
                    source={require('../assets/credit-card.png')}
                    style={styles.icon}
                  />
                  <View style={styles.infoContainer}>
                    <Text style={styles.transactionType}> {item.transaction_type}</Text>
                    <Text style={styles.amountText}> {new Date(item.date).toLocaleDateString()}</Text>
                  </View>
                  <Text style={styles.dateText}> {item.amount} credits</Text>
                  
                  
                </Card.Content>
              </Card>
            ))}
          </View>
        )}
        {index === 1 && (
          <View>
            <Text> No Received History</Text>
          </View>
        )}
        {index === 2 && (
          <View>
            <Text> No Withdraw History</Text>
            {/* Add your content for the "Withdraw" tab here */}
          </View>
        )}
      </View>
    );
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

        <View style={styles.appbarTitleContainer}>
          <Text style={styles.appbarTitle}>Wallet</Text>
        </View>
      </Appbar.Header>

      <View style={{ flex: 1, padding: 15 }}>
        <Text style={{ fontSize: 20, textAlign: 'center', padding: 15 }}>
          Balance
        </Text>
        <Text style={styles.text}>{balance !== null ? `${balance} Credit` : 'Loading...'}</Text>
        <View style={{ alignItems: 'center', width: '100%', padding: 20 }}>
          <Button mode="contained"
            onPress={() => toggleModal()}
            labelStyle={{ fontSize: 21, color: 'white' }}
            style={{ backgroundColor: '#72E6FF', width: buttonWidth }}
          >
            Reload
          </Button>
        </View>

        <PaymentModal
          visible={isModalVisible}
          onClose={(amount) => handleConfirmReload(amount)}
          creditTransactions={creditTransactions}
          currentUserID={currentUserID}
        />

        <Text style={{ textAlign: 'center', color: '#72E6FF', padding: 10, fontSize: 25, fontWeight: 'bold' }}>
          Learn About Credits
        </Text>


        <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
          <Tab
            value={index}
            onChange={setIndex}
            indicatorStyle={{ backgroundColor: '#72E6FF', height: 3 }}
            style={{ flex: 1 }}
            
          >
            <Tab.Item
              title="Spent"
              titleStyle={{ fontSize: 16, color: '#7C82A1' }}
              style={{ flex: 1, alignItems: 'center' }}
            />
            <Tab.Item
              title="Received"
              titleStyle={{ fontSize: 16, color: '#7C82A1' }}
              style={{ flex: 1, alignItems: 'center' }}
            />
            <Tab.Item
              title="Withdraw"
              titleStyle={{ fontSize: 16, color: '#7C82A1' }}
              style={{ flex: 1, alignItems: 'center' }}
            />
          </Tab>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={['#72E6FF']} // Customize the color of the refresh spinner
            />
          }
        >
          {renderContent()}
        </ScrollView>

      </View>
    </View>
  );
}

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 40,
    textAlign: 'center',
    padding: 15,
    fontWeight: '600',
  },
  customBackAction: {
    marginLeft: -10,
  },
  appbarTitleContainer: {
    flex: 1,
    marginRight: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appbarTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '500',
    color: '#ffffff'
  },
  cardContainer:{
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  icon: {
    width: 30, 
    height: 30, 
    marginRight: 10
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column', 
    alignItems: 'left',
  },
  transactionType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  dateText: {
    fontSize: 14,
    color: '#7C82A1',
    marginLeft: 20, 
  },
  amountText: {
    fontSize: 16,
    marginLeft: 20, 
  },
});
