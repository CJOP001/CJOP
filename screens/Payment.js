import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, RefreshControl, SafeAreaView } from 'react-native';
import { Appbar, Button, Card, SegmentedButtons } from 'react-native-paper';
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
  const [spentHistoryData, setSpentHistoryData] = useState([]);
  const [isRefreshing, setRefreshing] = useState(false);
  const [value, setValue] = React.useState('');

  // Constants
  const currentUserID = '1d93bd48-5c9e-43f0-9866-c0cd6a284a39';

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

  // Function to fetch spent history
  const fetchSpentHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('credits')
        .select('credit_amount, date, credit_action')
        .eq('user_id', currentUserID)
        .order('date', { ascending: false });
      if (error) {
        throw error;
      }
      setSpentHistoryData(data);
    } catch (error) {
      console.error('Error fetching spent history:', error);
    }
  };

  // Fetch user's data when the component mounts
  useEffect(() => {
    fetchBalance();
    fetchSpentHistory();
  }, []);

  // Function to handle refresh
  const handleRefresh = async () => {
    setRefreshing(true); // Start the refresh animation

    try {
      await fetchBalance();
      await fetchSpentHistory();
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false); // Stop the refresh animation when data is fetched
    }
  };

  // Function to toggle the modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Function to handle confirming the reload
  const handleConfirmReload = (amount) => {
    console.log(`Reload confirmed with amount: $${amount}`);
    toggleModal();
    setBalance(balance + amount);
  };

  // Function to update spent history data
  const updateSpentHistoryData = (newSpentHistoryData) => {
    setSpentHistoryData(newSpentHistoryData);
  };

  const renderContent = () => {
    return (
      <View>
        {index === 0 && (
          <View style={{ flex: 1 }}>
            {spentHistoryData.map((item, index) => (
              <Card key={index} style={{ marginVertical: 10 }}>
                <Card.Content>
                  <Image
                    source={require('../assets/credit-card.png')}
                    style={{ width: 30, height: 30, marginRight: 10 }}
                  />
                  <Text>Credit Amount: {item.credit_amount}</Text>
                  <Text>Date: {item.date}</Text>
                  <Text>Credit Action: {item.credit_action}</Text>
                </Card.Content>
              </Card>
            ))}
          </View>
        )}
        {index === 1 && (
          <View>
            <Text>Received History</Text>
          </View>
        )}
        {index === 2 && (
          <View>
            <Text>Withdraw History</Text>
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
          updateSpentHistory={updateSpentHistoryData}
          spentHistoryData={spentHistoryData}
          currentUserID={currentUserID}
        />

        <Text style={{ fontFamily: '', textAlign: 'center', color: '#72E6FF', padding: 10, fontSize: 25, fontWeight: 'bold' }}>
          Transfer Credit
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
});
