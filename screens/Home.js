import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, ScrollView, StatusBar } from 'react-native';
import { Appbar, Avatar, Searchbar } from 'react-native-paper';
import { categories } from '../components/categories';
import {dummyArticles} from '../components/articles';

import ArticleCard from '../components/ArticleCard';

import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];

const Home = () => {

  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('Corporate');

   // Dummy data for articles
  const [articles] = useState(dummyArticles);

  const [searchQuery, setSearchQuery] = useState('');
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
    ? articles.filter(article => article.category === selectedCategory)
    : articles;

  const imageUrl = 'https://imbrgdnynoeyqyotpxaq.supabase.co/storage/v1/object/public/testing/HD-wallpaper-will-never-forget-iphone-apple-ipad-steve-jobs.jpg'

  const openDrawer = () => {
    navigation.openDrawer();
    console.log(openDrawer);
  };

  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0],
  );


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#72E6FF"
        barStyle={statusBarStyle}
        showHideTransition={statusBarTransition}
        hidden={hidden}
      />
      <Appbar.Header>
        <TouchableOpacity onPress={openDrawer}>
          <Avatar.Image
            source={{ uri: imageUrl }}
            size={40}
            style={{ margin: 10, marginTop: 20 }}
          />
        </TouchableOpacity>
        {renderSearchBar()}
      </Appbar.Header>
      <Appbar.Header>
      {/* Scrollable list of categories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScrollView}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              category === selectedCategory ? styles.selectedCategoryButton : null,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[styles.categoryButtonText, category === selectedCategory ? styles.selectedCategoryButtonText : null]}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      </Appbar.Header>
      {/* List of articles */}
      <View style={styles.articleListContainer}>
      <View style={{ alignItems: 'left', padding: 15, width: '100%' }}>
        <FlatList
          data={filteredArticles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          initialNumToRender={5}
        />
      </View>
      </View>
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
  }
});

export default Home;
