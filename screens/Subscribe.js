import { StyleSheet, Text, View, FlatList, SafeAreaView, RefreshControl } from 'react-native'
import React, { useState } from 'react';
import { Appbar, Card, Avatar, Button } from 'react-native-paper';

import dummyArticles from '../components/articles';

import ArticleCard from '../components/ArticleCard';


const Subscribe = ({ navigation }) => {
  const [articles] = useState(dummyArticles);

  const renderItem = ({ item }) => {
    return <ArticleCard {...item} />;
  };

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
  
    // Simulate data fetching or perform data updates here
    // For example, you can fetch new articles or update the existing ones
  
    // After fetching/updating data, set refreshing to false
    setRefreshing(false);
  };
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
            <Text style={styles.appbarTitle}>Subscribe</Text>
          </View>
        </Appbar.Header>

        <View style={{ alignItems: 'left', padding: 15, width: '100%' }}>
          <FlatList
            data={articles}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Subscribe

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  customBackAction: {
    marginLeft: -10, // Adjust the back action position if needed
  },
  articleCard: {
    width: '100%',
    marginBottom: 10,
  },
  appbarTitleContainer: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  appbarTitle: {
    textAlign: 'center', // Center text within the Appbar.Content
    fontSize: 20,
    fontWeight: '500', 
  },
  })
