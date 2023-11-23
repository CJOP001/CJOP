// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, Dimensions } from 'react-native';
import { Appbar, Card } from 'react-native-paper';
import { fetchSupabaseData } from '../components/ArticlesData';

// Import custom components and data
import dummyArticles from '../components/articles';
import ArticleCard from '../components/ArticleCard';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';


const Subscribe = ({ navigation }) => {
  // State management
  const [articles, setArticles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Handler for pull-to-refresh
  const handleRefresh = async () => {
     setRefreshing(true);

     try {
       const data = await fetchSupabaseData();
       setArticles(data);
     } catch (error) {
       console.error('Error fetching articles:', error);
     } finally {
       setRefreshing(false);
     }
   };

   useEffect(() => {
     // Fetch articles when the component mounts
     handleRefresh();
   }, []);

  // Calculate screen dimensions
  const screenHeight = Dimensions.get('window').height;
  const tabBarHeight = useBottomTabBarHeight();
  const contentHeight = (screenHeight - tabBarHeight) * 0.9;

  return (
    <View style={styles.container}>
      {/* Appbar/Header */}
      <Appbar.Header style={{ backgroundColor: '#72E6FF' }}>
        {/* Back action */}
        <View style={styles.customBackAction}>
          <Appbar.BackAction
            onPress={() => {
              console.log('Going back');
              navigation.goBack();
            }}
          />
        </View>
        {/* Title */}
        <View style={styles.appbarTitleContainer}>
          <Text style={styles.appbarTitle}>Subscribe</Text>
        </View>
      </Appbar.Header>

      {/* Main content */}
      <View style={{ alignItems: 'left', padding: 10, flex:1 }}>
        {/* FlatList for articles */}
        <FlatList
          data={articles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ArticleCard {...item} />}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        />
      </View>
    </View>
  );
};

export default Subscribe

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9EFF7',
    height: '100%'
  },
  customBackAction: {
    marginLeft: -10, 
  },
  articleCard: {
    width: '100%',
    marginBottom: 10,
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
  },
  })
