import React, { useState, useEffect } from 'react';
import { Card, Avatar, Button, Text, Modal, Portal } from 'react-native-paper';
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { retrieveUserData } from '../components/UserInfo';

// Import your custom icons
import likeIcon from '../assets/like.png';
import commentIcon from '../assets/comments.png';
import shareIcon from '../assets/share.png'; // Import your share icon

const ArticleCard = React.memo(
  ({
    id,
    user_id,
    created_at,
    image_path,
    description,
    likes,
    comments,
    status
  }) => {
  const [likePressed, setLikePressed] = useState(false);
  const [commentPressed, setCommentPressed] = useState(false);
  const [sharePressed, setSharePressed] = useState(false); // State for the share icon
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Ensure userId is defined before making the request
        if (user_id) {
          const userDetails = await retrieveUserData(user_id);
          //console.log('User Details:', userDetails);
          setUserInfo(userDetails);
        } else {
          console.error('User ID is undefined.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user_id]);

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

    navigation.navigate('ArticlesDetails', { article: { id, user_id, status, created_at, image_path, description, likes, comments } });
    hideModal();
  };

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  // Function to limit the content to 5 words
  const limitDescription = (text) => {
    if (text) {
      const words = text.split(' ');
      const limitedContent = words.slice(0, 5).join(' ');
      return limitedContent + (words.length > 5 ? ' .................' : '');
    }
    return ''; // Return an empty string or handle it according to your requirements
  };

  const formatDate = (timestamp) => {
    const options = {
      day: '2-digit', 
      month: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
  
    return new Date(timestamp).toLocaleString('en-US', options);
  };

  return (
    <Card style={styles.articleCard}>
      <Card.Title
        title={userInfo ? userInfo.fullname : 'Loading...'}
        subtitle={formatDate(created_at)} 
        left={(props) => (
          <Avatar.Image
          source={{
            uri: userInfo && user_id === userInfo.id ? userInfo.user_image : 'https://example.com/default-avatar.jpg',
          }}
            size={40}
          />
        )}
      />
      <Card.Content>
          <Text style={styles.articleText}>{limitDescription (description)}</Text>
        </Card.Content>
      {image_path ? (
        <Card.Cover
          source={{ uri: image_path }}
          style={styles.articleImage}
          resizeMode="contain" // Set resizeMode to 'contain'
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

        <View style={styles.readButtonContainer}>
          <Button
            mode="contained"
            onPress={showModal}
            style={styles.readButton}
            labelStyle={styles.readButtonText}
          >
            Read
          </Button>
        </View>

        <Portal>
          <Modal visible={isModalVisible} onDismiss={hideModal}>
            <View style={styles.modalContent}>
              <Button
                mode="contained"
                onPress={handleReadMorePress}
                style={styles.readButton}
                labelStyle={styles.readButtonText}
              >
                Read
              </Button>
              {/* Add any other content you want in the modal */}
              <Button onPress={hideModal}>Close</Button>
            </View>
          </Modal>
        </Portal>
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
    aspectRatio: 16 / 9, // Set the aspect ratio you desire (e.g., 16:9)
    margin: 10,
  },
  readButtonContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  readButton: {
    width: '40%',
    backgroundColor: '#72E6FF',
    borderRadius: 15,
  },
  readButtonText: {
    fontSize: 20, // Adjust the font size as needed
    fontWeight: 'bold', // Make the text bold
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    margin: 10,
    justifyContent: 'center', 
    alignItems: 'center'
  },
});



