import React, { useState, useEffect } from 'react';
import { Appbar, Card, Avatar, Text, Button, Divider } from 'react-native-paper';
import { Image, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { retrieveUserData } from '../../components/UserInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../../supabase/supabase';
import ImageView from 'react-native-image-viewing';

import ReportModal from './ReportModal';
import CommentModal from './CommentModal';
import likeIcon from '../../assets/like.png';
import blueLikeIcon from '../../assets/blue_like.png';
import commentIcon from '../../assets/comments.png';
import shareIcon from '../../assets/share.png';

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

  const { article } = route.params;
  const {
    id,
    user_id,
    status,
    created_at,
    image_path,
    description,
    likes,
    comments,
    fullname,
    user_image,
  } = article;

  useEffect(() => {
    const initializeData = async () => {
      try {
        const storedUserID = await AsyncStorage.getItem('uid');

        if (storedUserID) {
          setUserID(storedUserID);

          await handleCommentSubmit(storedUserID);
          const hasLiked = await checkIfLiked(storedUserID);
          setIsLiked(hasLiked);

          const { data: articleData, error: articleError } = await supabase
            .from('news_management')
            .select('*')
            .eq('id', id);

          if (articleError) {
            console.error('Error fetching article data:', articleError);
          } else {
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
            setCommentsData(commentsData);
          }
        } else {
          console.error('User ID not available.');
        }
      } catch (error) {
        console.error('Error initializing data:', error);
      }
    };

    initializeData();
  }, []);

  const checkIfLiked = async (userID) => {
    const { data, error } = await supabase
      .from('likes')
      .select('id')
      .eq('user_id', userID)
      .eq('news_id', id);

    return data && data.length > 0;
  };

  const handleLikePress = async () => {
    try {
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
          setIsLiked(false);
        }
      } else {
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
          setIsLiked(true);
        }
      }
    } catch (error) {
      console.error('Error liking/unliking:', error);
    }
  };

  const handleCommentPress = () => {
    setCommentModalVisible(true);
  };

  const handleSharePress = () => {
    // Handle share button press
  };

  const handleReportPress = () => {
    setReportModalVisible(true);
  };

  const handleReportModalDismiss = () => {
    setReportModalVisible(false);
  };

  const handleReport = async (reportReason) => {
    try {
      if (reportReason.trim() !== '') {
        if (userID) {
          const { data: reportData, error: reportError } = await supabase
            .from('report')
            .insert([
              {
                title: reportReason,
                user_id: userID,
                nm_id: id,
                status: 'open',
              },
            ]);

          if (reportError) {
            console.error('Error submitting report:', reportError);
          } else {
            console.log('Report submitted successfully:', reportData);

            const { data: updateData, error: updateError } = await supabase
              .from('news_management')
              .update({ status: 'reported' })
              .eq('id', id);

            if (updateError) {
              console.error('Error updating news status:', updateError);
            } else {
              console.log('News status updated successfully:', updateData);
            }

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
    setImageModalVisible(true);
  };

  const handleImageModalDismiss = () => {
    setImageModalVisible(false);
  };

  const handleCommentModalDismiss = () => {
    setCommentModalVisible(false);
  };

  const handleCommentSubmit = async () => {
    console.log(commentText);
    console.log(userID);
    try {
      if (commentText.trim() !== '') {
        const { data, error } = await supabase
          .from('comments')
          .insert([
            {
              user_id: userID,
              news_id: id,
              comment_text: commentText,
            },
          ]);

        if (error) {
          console.error('Error submitting comment:', error);
        } else {
          console.log('Comment submitted successfully:', data);
        }
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
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

          <Divider style={styles.divider} />
          <Text style={styles.commentTitle}>Comments</Text>
          {commentsData && Array.isArray(commentsData) ? (
            commentsData.map((comment, index) => (
              <Card key={index} style={styles.commentCard}>
                <Card.Content style={styles.commentContent}>
                  <View style={styles.commentContainer}>
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

      <ReportModal
        isVisible={isReportModalVisible}
        onDismiss={handleReportModalDismiss}
        onReport={handleReport}
      />

      <ImageView
        images={images}
        imageIndex={0}
        visible={isImageModalVisible}
        onRequestClose={handleImageModalDismiss}
      />

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
   imageModal: {
      margin: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
  imageModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  fullImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default ArticlesDetails;