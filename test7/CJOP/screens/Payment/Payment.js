import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, RefreshControl, SafeAreaView } from 'react-native';
import { Appbar, Button, Card, Menu, List } from 'react-native-paper';
import { Tab } from '@rneui/themed';
import supabase from '../../supabase/supabase';
import PaymentModal from './Payment_Modal';
import TransferModal from './TransferModal';
import WithdrawModal from './WithdrawModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Payment = ({ navigation }) => {
  // State variables
  const { width } = Dimensions.get('window');
  const buttonWidth = width * 0.4;
  const [balance, setBalance] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [index, setIndex] = useState(0);
  const [creditTransactions, setCreditTransactions] = useState([]);
  const [isRefreshing, setRefreshing] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false); // State for the menu
  const [isTransferModalVisible, setTransferModalVisible] = useState(false);
  const [isWithdrawModalVisible, setWithdrawModalVisible] = useState(false);
  const [isLearnAboutCreditsExpanded, setLearnAboutCreditsExpanded] = useState(false);
  const [userID, setUserID] = useState(null);

  // Constants
  const currentUserID = userID;

  // Constants for transaction types
  const TRANSACTION_RELOAD = 'Reload';
  const TRANSACTION_RECEIVED = 'Received';
  const TRANSACTION_POST = 'Post';
  const TRANSACTION_WITHDRAW = 'Withdraw';

// Function to fetch balance
const fetchBalance = async (currentUserID) => {
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
const fetchCreditTransactions = async (currentUserID) => {
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
    const userID = await fetchUserID();

    if (userID) {
      await fetchBalance(userID);
      await fetchCreditTransactions(userID);
    } else {
      console.error('User ID not available.');
    }
  } catch (error) {
    console.error('Error refreshing data:', error);
  } finally {
    setRefreshing(false); // Stop the refresh animation when data is fetched
  }
};

// Function to fetch user ID from async storage
const fetchUserID = async () => {
  try {
    const storedUserID = await AsyncStorage.getItem('uid');
    if (storedUserID) {
      console.log('(Payment)UserID:',storedUserID);
      setUserID(storedUserID);
      return storedUserID;
    } else {
      console.error('User ID not found in async storage.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user ID from async storage:', error);
    return null;
  }
};

useEffect(() => {
  const initializeData = async () => {
    try {
      // Fetch user ID from async storage
      const userID = await fetchUserID();
      console.log('(Payment initialize)User ID:', userID);

      if (userID) {
        // Use the retrieved user ID for subsequent operations
        await fetchBalance(userID);
        await fetchCreditTransactions(userID);
      } else {
        console.error('User ID not available.');
      }
    } catch (error) {
      console.error('Error initializing data:', error);
    }
  };

  // Initialize data when the component mounts
  initializeData();
}, []);

  // Function to toggle the modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Function to handle confirming the reload
const handleConfirmReload = (amount) => {
  toggleModal();
  console.log(`Reload confirmed with amount: $${amount}`);
};

// Function to handle menu icon press
const handleMenuPress = () => {
  setMenuVisible(true);
};

// Function to handle menu close
const handleMenuClose = () => {
  setMenuVisible(false);
};

// Function to handle menu item press
const handleMenuOptionPress = (option) => {
  switch (option) {
    case "Transfer":
      setTransferModalVisible(true);
      break;
    case "Withdraw":
      setWithdrawModalVisible(true);
      break;
    default:
      // Handle other options if needed
  }

  handleMenuClose();
};

const LearnAboutCredits = () => {
  return (
    <List.Accordion
      title="Learn About Credits"
      titleStyle={{ fontSize: 25, fontWeight: 'bold', color: isLearnAboutCreditsExpanded ? '#72E6FF' : '#000' }}
      expanded={isLearnAboutCreditsExpanded}
      onPress={() => setLearnAboutCreditsExpanded(!isLearnAboutCreditsExpanded)}
      style={{ backgroundColor: '#ffffff' }}
    >
      <List.Item title="Credit Value Guide" titleStyle={{ fontSize: 18 }} />
      <List.Item title="1 credit = RM0.01" />
      <List.Item title="10 credits = RM0.10" />
      <List.Item title="100 credits = RM1" />
      <List.Item title="1000 credits = RM10" />
      <Text style={styles.learnText}>
        Understanding the value of your credits empowers you. Your wallet, your choices! 💸
      </Text>
    </List.Accordion>
  );
};

  const renderContent = () => {
    const spentTransactions = creditTransactions.filter(
      (item) => item.transaction_type === TRANSACTION_RELOAD || item.transaction_type === TRANSACTION_POST
    );
  
    const receivedTransactions = creditTransactions.filter(
      (item) => item.transaction_type === TRANSACTION_RECEIVED
    );
  
    const withdrawTransactions = creditTransactions.filter(
      (item) => item.transaction_type === TRANSACTION_WITHDRAW
    );
    return (
      <View>
        {index === 0 && (
          <View style={{ flex: 1 }}>
            {spentTransactions.map((item, index) => (
              <Card key={index} style={{ marginVertical: 10 }}>
                <Card.Content style={styles.cardContainer}>
                  <Image
                    source={require('../../assets/credit-card.png')}
                    style={styles.icon}
                  />
                  <View style={styles.infoContainer}>
                    <Text style={styles.transactionType}> {item.transaction_type}</Text>
                    <Text style={styles.dateText}> {new Date(item.date).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</Text>
                  </View>
                  <Text style={[styles.amountText, { color: item.transaction_type === TRANSACTION_RELOAD ? 'green' : item.transaction_type === TRANSACTION_POST ? '#FF0000' : 'black' }]}> 
                    {item.amount} credits
                  </Text>
                </Card.Content>
              </Card>
            ))}
          </View>
        )}
        {index === 1 && (
          <View>
            {receivedTransactions.length > 0 ? (
            receivedTransactions.map((item, index) => (
              <Card key={index} style={{ marginVertical: 10 }}>
                <Card.Content style={styles.cardContainer}>
                  <Image
                    source={require('../../assets/credit-card.png')}
                    style={styles.icon}
                  />
                  <View style={styles.infoContainer}>
                    <Text style={styles.transactionType}> {item.transaction_type}</Text>
                    <Text style={styles.dateText}> {new Date(item.date).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</Text>
                  </View>
                  <Text style={[styles.amountText, { color: item.transaction_type === TRANSACTION_RELOAD ? 'green' : item.transaction_type === TRANSACTION_POST ? '#FF0000' : 'black' }]}> 
                    {item.amount} credits
                  </Text>
                </Card.Content>
              </Card>
            ))
          ) : (
            <Text>No Received History</Text>
          )}
          </View>
        )}
        {index === 2 && (
          <View>
            {withdrawTransactions.length > 0 ? (
            withdrawTransactions.map((item, index) => (
              <Card key={index} style={{ marginVertical: 10 }}>
                <Card.Content style={styles.cardContainer}>
                  <Image
                    source={require('../../assets/credit-card.png')}
                    style={styles.icon}
                  />
                  <View style={styles.infoContainer}>
                    <Text style={styles.transactionType}> {item.transaction_type}</Text>
                    <Text style={styles.dateText}> {new Date(item.date).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</Text>
                  </View>
                  <Text style={[styles.amountText, { color: item.transaction_type === TRANSACTION_RELOAD ? 'green' : item.transaction_type === TRANSACTION_POST ? '#FF0000' : 'black' }]}> 
                    {item.amount} credits
                  </Text>
                </Card.Content>
              </Card>
            ))
          ) : (
            <Text>No Withdraw History</Text>
          )}
          </View>
        )}
      </View>
    );
  };

  // Function to handle transfer
  const handleTransfer = async (recipientID, transferAmount) => {
    try {
      // Check if the recipient ID is valid (you may want to add more validation)
      const recipientExists = await supabase
        .from('credits')
        .select('user_id')
        .eq('user_id', recipientID)
        .single();

      if (!recipientExists) {
        console.error('Recipient not found');
        return;
      }

      // Deduct the transfer amount from the current user's balance
      const updatedSenderBalance = balance - transferAmount;
      setBalance(updatedSenderBalance);

      // Add the transfer amount to the recipient's balance
      const { data: recipientData, error: recipientError } = await supabase
        .from('credits')
        .upsert([
          {
            user_id: recipientID,
            credit_amount: supabase.sql`credit_amount + ${transferAmount}`,
          },
        ]);

      if (recipientError) {
        console.error('Error updating recipient balance:', recipientError);
        // Handle error (rollback sender's balance update, show error message, etc.)
        return;
      }

      // Create a credit transaction for the sender
      const senderTransaction = {
        user_id: currentUserID,
        transaction_type: TRANSACTION_TRANSFER,
        amount: -transferAmount,
        date: new Date(),
      };

      // Create a credit transaction for the recipient
      const recipientTransaction = {
        user_id: recipientID,
        transaction_type: TRANSACTION_RECEIVED,
        amount: transferAmount,
        date: new Date(),
      };

      // Insert both transactions into the credit_transactions table
      const { error: transactionError } = await supabase
        .from('credit_transactions')
        .upsert([senderTransaction, recipientTransaction]);

      if (transactionError) {
        console.error('Error creating credit transactions:', transactionError);
        // Handle error (rollback transactions, show error message, etc.)
        return;
      }

      // Notify the user that the transfer was successful
      console.log('Transfer successful');

      // Close the transfer modal or perform any other necessary actions
      setTransferModalVisible(false);
    } catch (error) {
      console.error('Error during transfer:', error);
      // Handle generic error (show error message, rollback changes, etc.)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
        {/* Three-dot menu icon */}
        <Menu
          visible={isMenuVisible}
          onDismiss={handleMenuClose}
          anchor={
            <Appbar.Action icon="dots-vertical" color="#000000" onPress={handleMenuPress} />
          }
        >
          <Menu.Item onPress={() => handleMenuOptionPress("Transfer")} title="Transfer" />
          <Menu.Item onPress={() => handleMenuOptionPress("Withdraw")} title="Withdraw" />
        </Menu>
      </Appbar.Header>

      <View style={{ flex: 1, padding: 15 }}>
        <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={['#72E6FF']} // Customize the color of the refresh spinner
          />
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

        {/* Transfer Modal */}
        <TransferModal
          visible={isTransferModalVisible}
          onClose={() => setTransferModalVisible(false)}
          onTransfer={(recipientID, transferAmount) =>
            handleTransfer(recipientID, transferAmount)
          }
        />

        {/* Withdraw Modal */}
      <WithdrawModal
        visible={isWithdrawModalVisible}
        onClose={() => setWithdrawModalVisible(false)}
        balance={balance}  // Pass the balance as a prop to WithdrawModal
        onUpdateBalance={(newBalance) => setBalance(newBalance)}
        currentUserID={currentUserID}
      />

      {/* Learn About Credits Section */}
      <LearnAboutCredits />


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
              style={{ flex: 1, alignItems: 'center'}}
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

        <View style={{ flex: 1 }}>
          <ScrollView
            style={{ flex: 1 }}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                colors={['#72E6FF']} 
              />
            }
          >
            {renderContent()}
          </ScrollView>
        </View>

      </View>
    </SafeAreaView>
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
    fontWeight: 'bold',
    color: '#000'
  },
  customBackAction: {
    marginLeft: -10,
  },
  appbarTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appbarTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '500',
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
    fontWeight: 'bold', 
  },
  learnText: {
    fontSize: 16,
    textAlign: 'left',
    color: '#333', 
    lineHeight: 24,
  },
});