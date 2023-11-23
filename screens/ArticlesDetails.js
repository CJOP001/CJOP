import React, { useState } from 'react';
import { Appbar, Card, Avatar, Text, Button, Divider } from 'react-native-paper';
import { Image, View, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ReportModal from '../screens/ReportModal';
import CommentModal from './CommentModal'; // Import the new CommentModal

// Import your custom icons
import likeIcon from '../assets/like.png';
import commentIcon from '../assets/comments.png';
import shareIcon from '../assets/share.png'; // Import your share icon

const ArticlesDetails = ({ route }) => {
  const navigation = useNavigation();
  const [isReportModalVisible, setReportModalVisible] = useState(false);
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [isCommentModalVisible, setCommentModalVisible] = useState(false); // State for the CommentModal

  // Get the entire article object from the route params
  const { article } = route.params;

  // Destructure the article object
  const { username, status, timestamp, imagePath, content, likes, comments } = article;

  const handleLikePress = () => {
    // Handle like button press
  };

  const handleCommentPress = () => {
    // Show the CommentModal
    setCommentModalVisible(true);
  };

  const handleSharePress = () => {
    // Handle share button press
  };

  const handleReportPress = () => {
    // Show the report modal
    setReportModalVisible(true);
  };

  const handleReportModalDismiss = () => {
    // Hide the report modal
    setReportModalVisible(false);
  };

  const handleReport = (reportReason) => {
    // Handle the report action with the selected report reason
    console.log('Report Reason:', reportReason);
    // You can add your logic for reporting here
  };

  const handleImagePress = () => {
    // Show the image modal
    setImageModalVisible(true);
  };

  const handleImageModalDismiss = () => {
    // Hide the image modal
    setImageModalVisible(false);
  };

  const handleCommentModalDismiss = () => {
    // Hide the CommentModal
    setCommentModalVisible(false);
  };

  const handleCommentSubmit = (comment) => {
    // Handle the submitted comment
    console.log('Submitted Comment:', comment);
    // You can add your logic for handling the submitted comment here
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      </Appbar.Header>
      <View style={styles.container}>

        <Card style={styles.articleCard}>
          <TouchableOpacity style={styles.reportButton} onPress={handleReportPress}>
            <View style={styles.reportRectangle}>
              <Text style={styles.reportText}>Report</Text>
            </View>
          </TouchableOpacity>

          <Card.Title
            title={username}
            subtitle={`${timestamp}`}
            left={(props) => (
              <Avatar.Image
                source={require('../assets/avatar.png')}
                size={40}
              />
            )}
          />

          <TouchableOpacity onPress={handleImagePress}>
            {imagePath ? (
              <Card.Cover
                source={{ uri: imagePath }}
                style={styles.articleImage}
                resizeMode="cover"
              />
            ) : null}
          </TouchableOpacity>

          {/* Like, Comment, Share icons */}
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleLikePress}>
              <View style={styles.iconWrapper}>
                <Image source={likeIcon} style={styles.icon} />
              </View>
            </TouchableOpacity>
            <Text>{likes}</Text>
            <TouchableOpacity onPress={handleCommentPress}>
              <View style={styles.iconWrapper}>
                <Image source={commentIcon} style={styles.icon} />
              </View>
            </TouchableOpacity>
            <Text>{comments ? comments.length : 0}</Text>
            <TouchableOpacity onPress={handleSharePress}>
              <View style={styles.iconWrapper}>
                <Image source={shareIcon} style={styles.icon} />
              </View>
            </TouchableOpacity>
          </View>

          <Card.Content>
            <Divider style={styles.divider} />
            <Text style={styles.articleText}>{content}</Text>
          </Card.Content>

          {/* Comment section */}
          <Divider style={styles.divider} />
          <Text style={styles.commentTitle}>Comments</Text>
          {/* Map through comments and display them */}
          {comments && Array.isArray(comments)
            ? comments.map((comment, index) => (
                <View key={index} style={styles.commentContainer}>
                  {/* Add a profile picture next to each comment */}
                  <Avatar.Image
                    source={require('../assets/avatar.png')}
                    size={30}
                    style={styles.commentAvatar}
                  />
                  <View style={styles.commentContent}>
                    <Text style={styles.commentText}>{comment}</Text>
                  </View>
                </View>
              ))
            : null}
        </Card>
      </View>

      {/* Report Modal */}
      <ReportModal
        isVisible={isReportModalVisible}
        onDismiss={handleReportModalDismiss}
        onReport={handleReport}
      />

      {/* Image Modal */}
      <Modal visible={isImageModalVisible} transparent={true} onRequestClose={handleImageModalDismiss}>
        <View style={styles.imageModalContainer}>
          <TouchableOpacity onPress={handleImageModalDismiss}>
            <Image
              source={{ uri: imagePath }}
              style={styles.fullImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Comment Modal */}
      <CommentModal
        isVisible={isCommentModalVisible}
        onDismiss={handleCommentModalDismiss}
        onSubmit={handleCommentSubmit}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E9EFF7',
    flex: 1,
    padding: '3%', // Add padding as a percentage of the screen width
  },
  articleCard: {
    width: '100%', // Use 100% of the parent container width
    marginBottom: 20,
    backgroundColor: '#ffffff',
  },
  articleImage: {
    margin: 10,
    height: 200, // Set a fixed height or adjust as needed
    borderRadius: 10, // Optional: Add borderRadius for rounded corners
  },
  articleText: {
    marginTop: 20,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align icons to the ends
    marginTop: 20, // Increase the gap between description and icons
  },
  iconWrapper: {
    borderRadius: 20,
    padding: 5,
  },
  icon: {
    width: 20,
    height: 20,
  },
  divider: {
    marginTop: 10, // Adjust the spacing above the line
  },
  commentTitle: {
    marginTop: 20,
    fontSize: 18,
    left: 10,
    fontWeight: 'bold',
  },
  commentContainer: {
    marginTop: 10,
  },
  commentText: {
    fontSize: 16,
  },
  reportButton: {
    position: 'absolute',
    top: 18,
    right: 13,
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportRectangle: {
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 10,
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  reportText: {
    color: 'red',
    fontWeight: 'bold',
  },
  imageModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
});

export default ArticlesDetails;
