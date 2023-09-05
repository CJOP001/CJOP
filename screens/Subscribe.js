import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native'
import React, { useState } from 'react';
import { Appbar, Card } from 'react-native-paper';

import dummyArticles from '../components/articles';


const Subscribe = ({ navigation }) => {
  const [articles] = useState(dummyArticles);

  console.log('Articles:', articles);


  const renderItem = ({ item }) => (
    <Card style={styles.articleCard}>
      <Card.Content>
        <Text style={styles.articleTitle}>{item.title}</Text>
        <Text style={styles.articleCategory}>Category: {item.category}</Text>
      </Card.Content>
    </Card>
  );

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

      <View style={{ alignItems: 'center', padding: 15, width: '100%' }}>
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
    fontSize: 14, // Adjust the font size as needed
    color: '#666', // Adjust the color as needed
  },
  })
