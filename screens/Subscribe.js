import { StyleSheet, Text, View, FlatList, SafeAreaView, Image } from 'react-native'
import React, { useState } from 'react';
import { Appbar, Card, Avatar, Button } from 'react-native-paper';

import dummyArticles from '../components/articles';


const Subscribe = ({ navigation }) => {
  const [articles] = useState(dummyArticles);

  //console.log('Articles:', articles);


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
        />
      </View>
    </View>
    </SafeAreaView>
  )
}

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
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
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
  articleCategory: {
    fontSize: 10, // Adjust the font size as needed
    color: '#666', // Adjust the color as needed
  },
  })
