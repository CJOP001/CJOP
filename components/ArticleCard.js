import React, { useState } from 'react';
import { Card, Avatar, Button, Text } from 'react-native-paper';
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';

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

  const handleLikePress = () => {
    setLikePressed(!likePressed);
  };

  const handleCommentPress = () => {
    setCommentPressed(!commentPressed);
  };

  const handleSharePress = () => {
    setSharePressed(!sharePressed); // Toggle the share icon state
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
        <Text style={styles.articleText}>{content}</Text>
      </Card.Content>
      {imagePath ? (
        <Card.Cover
          source={require('../assets/image.png')}
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
    </Card>
  );
});

export default ArticleCard;

const styles = StyleSheet.create({
  articleCard: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#ffffff'
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginRight: 'auto', // Pushes the left icons to the left
  },
  iconContainerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto', // Pushes the right icon to the right
  },
  articleImage: {
    //aspectRatio: 16 / 9, // Set the aspect ratio you desire (e.g., 16:9)
    margin: 10,
  },
  // ... other styles
});



