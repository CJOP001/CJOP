import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, ScrollView, StatusBar, RefreshControl } from 'react-native';
import { Appbar, Avatar, Searchbar} from 'react-native-paper';
import categories from '../components/categories';
import ArticleCard from '../components/ArticleCard';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import supabase from '../supabase/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';


const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];

const Home = () => {

  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('1');
  const [isRefreshing, setRefreshing] = useState(false);
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [userImage, setUserImage] = useState(null);
  const [userID, setUserID] = useState(null);

  const defaultUserImage = 'https://imbrgdnynoeyqyotpxaq.supabase.co/storage/v1/object/public/UserImage/Avatars/default';


 // Fetch articles from Supabase
 const fetchArticles = async () => {
  try {
    const { data, error } = await supabase.from('news_management').select('*').order('created_at', { ascending: false });
    //console.log('Fetched articles:', data);
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

useEffect(() => {
  fetchArticles();
}, []);

// Fetch categories when the component mounts
useEffect(() => {
  const fetchCategories = async () => {
    try {
      const categoryData = await categories();
      setCategoryData(categoryData);
    } catch (error) {
      console.error('Error fetching categories:', error.message);
    }
  };

  fetchCategories();
}, []);




// Function to fetch user ID from async storage
const fetchUserID = async () => {
  try {
    const storedUserID = await AsyncStorage.getItem('uid');
    if (storedUserID) {
      //console.log('(Home)UserID:',storedUserID);
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
      console.log('(Home)User ID:', userID);

      if (userID) {
        setUserID(userID);

        const { data: userData, error: userError } = await supabase
            .from('app_users')
            .select('*')
            .eq('id', userID);

          if (userError) {
            console.error('Error fetching user data:', userError);
          } else {

            setUserImage(userData[0].user_image);
          }
          console.log('Got image:', userData[0].user_image);
        
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



  const onChangeSearch = (query) => {
    // Update the search query state
    setSearchQuery(query);
  };

  const renderSearchBar = () => {
    return (
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
      />
    );
  };

  const renderItem = ({ item }) => {
    return <ArticleCard {...item} />;
  };

  // Filter articles based on the selected category
  const filteredArticles = selectedCategory
  ? articles.filter(article => article.nc_id === parseInt(selectedCategory, 10))
  : articles;

  const imageUrl = 'https://imbrgdnynoeyqyotpxaq.supabase.co/storage/v1/object/public/testing/HD-wallpaper-will-never-forget-iphone-apple-ipad-steve-jobs.jpg'

  const openDrawer = () => {
    navigation.openDrawer();
    console.log('Drawer opened');
  };

  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0],
  );

  const handleRefresh = async () => {
    setRefreshing(true); // Start the refresh animation
    await fetchArticles();
    setRefreshing(false); // Stop the refresh animation when data is fetched
  }


  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#72E6FF"
        barStyle={statusBarStyle}
        showHideTransition={statusBarTransition}
        hidden={hidden}
      />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={['#72E6FF']} 
          />
        }
        style={{ marginBottom: 60 }}
      >
      <Appbar.Header>
        <TouchableOpacity onPress={openDrawer}>
        <Avatar.Image
          source={{ uri: userImage || defaultUserImage }}
          size={40}
          style={{ margin: 10, marginTop: 20 }}
        />
        </TouchableOpacity>
        {renderSearchBar()}
      </Appbar.Header>
      <Appbar.Header>
      {/* Scrollable list of categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScrollView}>
        {categoryData.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              category.id === selectedCategory ? styles.selectedCategoryButton : null,
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text style={[styles.categoryButtonText, category.id === selectedCategory ? styles.selectedCategoryButtonText : null]}>{category.type}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      </Appbar.Header>
      {/* List of articles */}
      <View style={styles.articleListContainer}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : error ? (
        <Text style={{ color: 'red' }}>{error}</Text>
      ) : filteredArticles.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 18 }}>
          There are no news articles in this category.
        </Text>
      ) : (
          <View style={{ alignItems: 'left', padding: 15, width: '100%' }}>
            <FlatList
              data={filteredArticles}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              initialNumToRender={5}
              
            />
          </View>
        )}
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9EFF7'
  },
  categoryScrollView: {
    padding: 10,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 30,
    marginRight: 10,
    backgroundColor: '#f0f0f0'
  },
  selectedCategoryButton: {
    backgroundColor: '#72E6FF',
  },
  categoryButtonText: {
    color: '#333', // Change the text color here
  },
  selectedCategoryButtonText: {
    color: '#fff', // Change the text color for selected category here
  },
  articleCard: {
    width: '100%',
    marginBottom: 10,
  },
  searchBar: {
    flex: 2, 
    margin: 20, // Add some right margin to separate it from other header content
    marginTop: 30,
  },
  articleListContainer: {
    flex: 1, // Expand to fill available space
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
  },
});

export default Home;
