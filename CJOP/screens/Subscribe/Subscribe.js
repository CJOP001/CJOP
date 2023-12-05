import React, { useState, useEffect } from "react";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Pressable,
  RefreshControl,
  Dimensions,StatusBar
} from "react-native";
import { Appbar, Avatar, Card } from "react-native-paper";
import SubscribedArticleCard from "../../components/SubscribedArticleCard";
import supabase from "../../supabase/supabase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';


const Subscribe = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const initializeData = async () => {
      try {
        // Fetch user ID from async storage
        const storedUserID = await AsyncStorage.getItem('uid');
        console.log('UserID:', storedUserID);

        if (storedUserID) {
          // Set the retrieved user ID to the state variable

          await fetchArticles(storedUserID);
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

    const fetchArticles = async (userID) => {
    try {
      const { data, error } = await supabase
        .from('subscribe')
        .select(`news_id(*) 
                  `)
        .eq('user_id', userID)
        .order('create_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      } else {
        setArticles(data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

    const renderItem = ({ item }) => {
    return <SubscribedArticleCard {...item.news_id} />;
  };

  const onRefresh = async () => {
    setRefreshing(true);
    const storedUserID = await AsyncStorage.getItem('uid');
    console.log('(Refresh)UserID:', storedUserID);
    await fetchArticles(storedUserID);
    setRefreshing(false);
  };


  // Calculate screen dimensions
  const screenHeight = Dimensions.get('window').height;
  const tabBarHeight = useBottomTabBarHeight();
  const contentHeight = (screenHeight - tabBarHeight) * 0.9;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.news_id.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onRefresh={onRefresh}
        refreshing={refreshing}
        ListHeaderComponent={() => (
          <>
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
          </>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#72E6FF']} // Add your custom color here
          />
        }
      />
    </SafeAreaView>
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
  SubscribedArticleCard: {
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
    fontWeight: 'bold',
    color: 'black',
  },
  articleContainer: {
    paddingHorizontal: 10,
  },
  })