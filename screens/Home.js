import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Appbar, Card, Avatar, Button } from 'react-native-paper';
import { categories } from '../components/categories';
import {dummyArticles} from '../components/articles';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('Corporate');

   // Dummy data for articles
  const [articles] = useState(dummyArticles);

  const renderItem = ({ item }) => {
    return (
      <Card style={styles.articleCard}>
        <Card.Title
          title={item.title}
          subtitle={`Status: ${item.status} | ${item.timestamp}`}
          left={(props) => (
            <Avatar.Image
              source={require('../assets/avatar.png') } 
              size={40}
            />
          )}
        />
        {item.imagePath ? (
          <Card.Cover source={require('../assets/image.png')} style={styles.articleImage} />
        ) : null}
        <Card.Content>
          <Text style={styles.articleText}>{item.content}</Text>
        </Card.Content>
        <Card.Actions>
          <Button icon="thumb-up" onPress={() => handleLike(item.id)}>
            Like {item.likes}
          </Button>
          <Button icon="comment" onPress={() => handleComment(item.id)}>
            Comment {item.comments}
          </Button>
        </Card.Actions>
      </Card>
    );
  };

  // Filter articles based on the selected category
  const filteredArticles = selectedCategory
    ? articles.filter(article => article.category === selectedCategory)
    : articles;

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Home" />
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
      <View style={{ alignItems: 'left', padding: 15, width: '100%' }}>
        <FlatList
          data={filteredArticles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  articleItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Home;
