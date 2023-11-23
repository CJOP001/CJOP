import React, { useState } from 'react';
import { Card, Avatar, Text, Button } from 'react-native-paper';
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Import your custom icons
import likeIcon from '../assets/like.png';
import commentIcon from '../assets/comments.png';
import shareIcon from '../assets/share.png'; // Import your share icon

const ArticleCard = React.memo(
  ({
    username,
    status,
    timestamp,
    imagePath,
    content,
    likes,
    comments,
  }) => {
    const [likePressed, setLikePressed] = useState(false);
    const [commentPressed, setCommentPressed] = useState(false);
    const [sharePressed, setSharePressed] = useState(false); // State for the share icon

    const navigation = useNavigation();


    const handleLikePress = () => {
      setLikePressed(!likePressed);
    };

    const handleCommentPress = () => {
      setCommentPressed(!commentPressed);
    };

    const handleSharePress = () => {
      setSharePressed(!sharePressed); // Toggle the share icon state
    };

const handleReadMorePress = () => {
  navigation.navigate('ArticlesDetails', { article: { username, status, timestamp, imagePath, content, likes, comments } });
};

 // Function to limit the content to 5 words
    const limitContent = (text) => {
      const words = text.split(' ');
      const limitedContent = words.slice(0, 5).join(' ');
      return limitedContent + (words.length > 5 ? ' .................' : '');
    };

    return (
      <Card style={styles.articleCard}>
        <Card.Title
          title={username}
          subtitle={`Status: ${status} | ${timestamp}`}
          left={(props) => (
            <Avatar.Image
              source={require('../assets/avatar.png')}
              size={40}
            />
          )}
        />
        <Card.Content>
          <Text style={styles.articleText}>{limitContent(content)}</Text>
        </Card.Content>
        {imagePath ? (
          <Card.Cover
            source={{ uri: imagePath }}
            style={styles.articleImage}
            resizeMode="cover" // Set resizeMode to 'contain'
          />
        ) : null}

        <Card.Actions style={styles.iconContainer}>
          <View style={styles.iconContainerLeft}>
            <TouchableOpacity onPress={handleLikePress}>
              <View style={[styles.iconWrapper, likePressed && { tintColor: '#72E6FF' }]}>
                <Image source={likeIcon} style={styles.icon} />
              </View>
            </TouchableOpacity>
            <Text>{likes}</Text>
            <TouchableOpacity onPress={handleCommentPress}>
              <View style={[styles.iconWrapper, commentPressed && { tintColor: '#72E6FF' }]}>
                <Image source={commentIcon} style={styles.icon} />
              </View>
            </TouchableOpacity>
            <Text>{comments}</Text>
          </View>
          <View style={styles.iconContainerRight}>
            <TouchableOpacity onPress={handleSharePress}>
              <View style={[styles.iconWrapper, sharePressed && { tintColor: '#72E6FF' }]}>
                <Image source={shareIcon} style={styles.icon} />
              </View>
            </TouchableOpacity>
          </View>
        </Card.Actions>

        {/* Read More button */}
        <View style={styles.readButtonContainer}>
          <TouchableOpacity onPress={handleReadMorePress}>
            <View style={styles.readButton}>
              <Text style={styles.readButtonText}>Read More</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Card>
    );
  }
);

const styles = StyleSheet.create({
  articleCard: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#ffffff',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align icons to the ends
  },
  iconWrapper: {
    borderRadius: 20,
    padding: 5,
  },
  icon: {
    width: 20,
    height: 20,
  },
  iconContainerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  articleImage: {
    margin: 10,
  },
  readButtonContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  readButton: {
    backgroundColor: '#72E6FF',
    padding: 10,
    borderRadius: 5,
  },
  readButtonText: {
    color: 'white',
  },
});

export default ArticleCard;
