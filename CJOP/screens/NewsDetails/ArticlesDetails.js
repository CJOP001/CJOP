import React, { useState, useEffect } from 'react';
import { Appbar, Card, Avatar, Text, Button, Divider } from 'react-native-paper';
import { Image, View, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { retrieveUserData } from '../../components/UserInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../../supabase/supabase';
import ImageView from "react-native-image-viewing";

import ReportModal from './ReportModal';
import CommentModal from './CommentModal'; // Import the new CommentModal

// Import your custom icons
import likeIcon from '../../assets/like.png';
import blueLikeIcon from '../../assets/blueLikeIcon.png';
import commentIcon from '../../assets/comments.png';
import shareIcon from '../../assets/share.png'; // Import your share icon

const ArticlesDetails = ({ route }) => {
  const navigation = useNavigation();
  const [isReportModalVisible, setReportModalVisible] = useState(false);
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [isCommentModalVisible, setCommentModalVisible] = useState(false); 
  const [userInfo, setUserInfo] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [userID, setUserID] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [articleDetails, setArticleDetails] = useState(null);
  const [commentsData, setCommentsData] = useState([]);

  // Get the entire article object from the route params
  const { article } = route.params;

  // Destructure the article object
  const { id, user_id, status, created_at, image_path, description, likes, comments, fullname, user_image } = article;


  useEffect(() => {
    const initializeData = async () => {
      try {
        // Fetch user ID from async storage
        const storedUserID = await AsyncStorage.getItem('uid');
        console.log('UserID:', storedUserID);

        if (storedUserID) {
          // Set the retrieved user ID to the state variable
          setUserID(storedUserID);

          await handleCommentSubmit(storedUserID);
          const hasLiked = await checkIfLiked(storedUserID);
          setIsLiked(hasLiked);

          // Fetch comments and user details (fullname and user_image) for the article
          const { data: articleData, error: articleError } = await supabase
            .from('news_management')
            .select('*')
            .eq('id', id);

          if (articleError) {
            console.error('Error fetching article data:', articleError);
          } else {
            // Set the article data to the state variable
            const articleDetails = articleData[0];
            setArticleDetails(articleDetails);
          }

          const { data: commentsData, error: commentsError } = await supabase
            .from('comments')
            .select('*, app_users:user_id(fullname, user_image)')
            .eq('news_id', id);

          if (commentsError) {
            console.error('Error fetching comments:', commentsError);
          } else {
            // Set the comments data to the state variable
            setCommentsData(commentsData);
          }
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

  const checkIfLiked = async (userID) => {
    // Check if the user has already liked the article
    const { data, error } = await supabase
      .from('likes')
      .select('id')
      .eq('user_id', userID)
      .eq('news_id', id);

    return data && data.length > 0;
  };

  const handleLikePress = async () => {
    try {
      // If already liked, unlike the article
      if (isLiked) {
        const { data, error } = await supabase
          .from('likes')
          .delete()
          .eq('user_id', userID)
          .eq('news_id', id);

        if (error) {
          console.error('Error unliking:', error);
        } else {
          console.log('Unlike successful:', data);
          // Refresh the likes count after unliking
          // You may want to fetch the updated likes count from the database
          setIsLiked(false);
        }
      } else {
        // If not liked, like the article
        const { data, error } = await supabase
          .from('likes')
          .upsert([
            {
              user_id: userID,
              news_id: article.id,
            },
          ]);

        if (error) {
          console.error('Error liking:', error);
        } else {
          console.log('Like successful:', data);
          // Refresh the likes count after liking
          // You may want to fetch the updated likes count from the database
          setIsLiked(true);
        }
      }
    } catch (error) {
      console.error('Error liking/unliking:', error);
    }
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

  const handleReport = async (reportReason) => {
    try {
      // Check if the report reason is not empty
      if (reportReason.trim() !== '') {
        // Check if the user ID is available
        if (userID) {
          // Insert the report into the Supabase database
          const { data: reportData, error: reportError } = await supabase
            .from('report')
            .insert([
              {
                title: reportReason,
                user_id: userID, // Ensure user_id is not null
                nm_id: id,
                status: 'open',
              },
            ]);

          if (reportError) {
            console.error('Error submitting report:', reportError);
          } else {
            console.log('Report submitted successfully:', reportData);

            // Update the status of the news in news_management table
            const { data: updateData, error: updateError } = await supabase
              .from('news_management')
              .update({ status: 'reported' })
              .eq('id', id);

            if (updateError) {
              console.error('Error updating news status:', updateError);
            } else {
              console.log('News status updated successfully:', updateData);
            }

            // Hide the report modal
            setReportModalVisible(false);
          }
        } else {
          console.error('User ID not available.');
        }
      }
    } catch (error) {
      console.error('Error submitting report:', error);
    }
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

  const handleCommentSubmit = async () => {
    console.log(commentText);
    console.log(userID);
    try {
      // Check if the comment text is not empty
      if (commentText.trim() !== '') {
        // Insert the comment into the Supabase database
        const { data, error } = await supabase
          .from('comments')
          .insert([
            {
              user_id: userID, // Use the login user ID
              news_id: id,
              comment_text: commentText,
            },
          ]);

        if (error) {
          console.error('Error submitting comment:', error);
        } else {
          console.log('Comment submitted successfully:', data);
          // Refresh the comments after submitting
          // You may want to fetch the updated comments from the database
        }
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      // Reset the comment text and hide the CommentModal
      setCommentText('');
      setCommentModalVisible(false);
    }
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

  const images = [
    {
      uri: image_path,
    },
  ];

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      </Appbar.Header>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Card style={styles.articleCard}>
          <TouchableOpacity style={styles.reportButton} onPress={handleReportPress}>
            <View style={styles.reportRectangle}>
              <Text style={styles.reportText}>Report</Text>
            </View>
          </TouchableOpacity>
          
          <Card.Title
            title={fullname || 'Loading...'}
            subtitle={formatDate(created_at)}
            left={(props) => (
              <Avatar.Image
                source={{
                  uri: user_image || 'https://example.com/default-avatar.jpg',
                }}
                size={40}
              />
            )}
          />

          <TouchableOpacity onPress={handleImagePress}>
            {image_path ? (
              <Card.Cover
                source={{ uri: image_path }}
                style={styles.articleImage}
                resizeMode="cover"
              />
            ) : null}
          </TouchableOpacity>

          {/* Like, Comment, Share icons */}
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleLikePress}>
              <View style={styles.iconWrapper}>
                <Image source={isLiked ? blueLikeIcon : likeIcon} style={styles.icon} />
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
            <Text style={styles.articleText}>{description}</Text>
          </Card.Content>

          {/* Comment section */}
          <Divider style={styles.divider} />
          <Text style={styles.commentTitle}>Comments</Text>
          {/* Map through comments and display them */}
          {commentsData && Array.isArray(commentsData) ? (
            commentsData.map((comment, index) => (
              <Card key={index} style={styles.commentCard}>
                <Card.Content style={styles.commentContent}>
                  <View style={styles.commentContainer}>
                    {/* Add a profile picture next to each comment */}
                    <Avatar.Image
                      source={{ uri: comment.app_users.user_image }}
                      size={40}
                      style={styles.commentAvatar}
                    />
                    <View style={styles.commentTextContainer}>
                      <Text style={styles.commentAuthor}>{comment.app_users.fullname}</Text>
                      <Text style={styles.commentText}>{comment.comment_text}</Text>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            ))
          ) : (
            <Text>No comments available.</Text>
          )}
        </Card>
      </ScrollView>

      {/* Report Modal */}
      <ReportModal
        isVisible={isReportModalVisible}
        onDismiss={handleReportModalDismiss}
        onReport={handleReport}
      />

      {/* Image Modal */}
      <ImageView
        images={images}
        imageIndex={0}
        visible={isImageModalVisible}
        onRequestClose={handleImageModalDismiss}
      />

      {/* Comment Modal */}
      <CommentModal
        isVisible={isCommentModalVisible}
        onDismiss={handleCommentModalDismiss}
        onSubmit={handleCommentSubmit}
        commentText={commentText}
        setCommentText={setCommentText}
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
  commentCard: {
     marginVertical: 8, // Adjust the vertical margin for each comment card
   },
   commentContent: {
     flexDirection: 'row',
     alignItems: 'flex-start',
     paddingHorizontal: 10,
     paddingVertical: 8,
   },
   commentContainer: {
     flexDirection: 'row',
     alignItems: 'flex-start',
   },
   commentAvatar: {
     marginRight: 10,
   },
   commentTextContainer: {
     flex: 1,
   },
   commentAuthor: {
     fontWeight: 'bold',
     marginRight: 5,
   },
   commentText: {
     marginTop: 5, // Adjust the spacing between author and text
   },
  reportButton: {
    top: 30,
    left: 250,
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