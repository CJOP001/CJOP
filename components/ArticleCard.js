import React, { useState, useEffect } from 'react';
import { Card, Avatar, Button, Text, Modal, Portal } from 'react-native-paper';
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { retrieveUserData } from '../components/UserInfo';
import supabase from '../supabase/supabase';

// Import your custom icons
import likeIcon from '../assets/like.png';
import commentIcon from '../assets/comments.png';
import shareIcon from '../assets/share.png'; // Import your share icon
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";


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
<<<<<<< Updated upstream:components/ArticleCard.js
    navigation.navigate('ArticlesDetails', { article: { id, user_id, status, created_at, image_path, description, likes, comments } });
    hideModal();
=======
    handleUpdateCreditAmount();
    handleAddCreditAmount();

    
>>>>>>> Stashed changes:CJOP/components/ArticleCard.js
  };

  const handleUpdateCreditAmount = async () => {
    let tempID = await AsyncStorage.getItem('uid');
    try {
      // Retrieve the user's current credit balance from data source
      const { data, error } = await supabase
        .from('credits')
        .select('credit_amount')
        .eq('user_id', tempID);
  
      if (error) {
        throw error;
      }
  
      if (data && data.length > 0 && data[0].credit_amount > 0) {
        // Calculate the new credit balance
        const currentCreditAmount = data[0].credit_amount;
        const newCreditAmount = currentCreditAmount - 1;
  
        // Update the user's credit balance in the data source
        const { error: updateError } = await supabase
          .from('credits')
          .update({ credit_amount: newCreditAmount })
          .eq('user_id', tempID );
  
        if (updateError) {
          throw updateError;
        }
        else{
          handleInsertCreditTransaction();
        }
  
      } else {
        console.error('No balance data found.');
        hideModal();
        Alert.alert(
          'Credit error',
          'No credit balance found. Please make sure there is always credit in your wallet.',
          [{text: 'Return', style: 'cancel'},],{cancelable: true,} 
        )
      }
    } catch (error) {
      console.error('Error updating credit amount:', error);
    }
  };

  //add credit amount to post owner
  const handleAddCreditAmount = async () => {
    try {
      // Retrieve the user's current credit balance from data source
      const { data, error } = await supabase
        .from('credits')
        .select('credit_amount')
        .eq('user_id', user_id);
  
      if (error) {
        throw error;
      }
  
      if (data && data.length > 0 ) {
        // Calculate the new credit balance
        const currentCreditAmount = data[0].credit_amount;
        const newCreditAmount = currentCreditAmount + 1;
        console.log(user_id, "this is poster");
        // Update the user's credit balance in the data source
        const { data: updateData, error: updateError } = await supabase
          .from('credits')
          .update({ credit_amount: newCreditAmount })
          .eq('user_id', user_id );
  
        if (updateError) {
          throw updateError;
        }
        else{
          handleInsertCreditTransactionForPoster();
        }
  
      } else {
        console.error('Send credit to poster fail.');
        }
    } catch (error) {
      console.error('Error updating credit amount:', error);
    }
  };

  //insert subscribe credit amount
  const handleInsertCreditTransaction = async () => {
    let tempID = await AsyncStorage.getItem('uid');

    try {
      const transactionTime = new Date();
  
      // Insert a record in the credit_transaction table
      const {data, error} = await supabase
        .from('credit_transactions')
        .insert([
          {
            user_id: tempID,
            transaction_type: 'Subscribe',
            amount: 1,
            date: transactionTime.toISOString(),
          },
        ]);
      if (error) {
        console.log(error);

        throw error;
      }
      else
      {
        // Log the inserted transaction
        addToSubscribe();
      } 
      
    } catch (error) {
      console.error('Error inserting credit transaction:', error);
    }
  };

  //insert transfer record for poster
  const handleInsertCreditTransactionForPoster = async () => {
    try {
      const transactionTime = new Date();
  
      // Insert a record in the credit_transaction table
      const {data, error} = await supabase
        .from('credit_transactions')
        .insert([
          {
            user_id: user_id,
            transaction_type: 'Post Income',
            amount: 1,
            date: transactionTime.toISOString(),
          },
        ]);
      if (error) {
        console.log(error);

        throw error;
      }
      
    } catch (error) {
      console.error('Error inserting credit transaction:', error);
    }
  };

  //checks if post is alr subscribed or is owned
  const checkSubscribed = async() => {
    let tempID = await AsyncStorage.getItem('uid');
    try {const {data, error} = await supabase
                          .from('subscribe')
                          .select()
                          .match({user_id: tempID, news_id: id});
    
    if(data.length > 0 || tempID == user_id)
    {
      navigation.navigate('ArticlesDetails', { article: { id, user_id, status, created_at, image_path, description, likes, comments,  fullname: userInfo ? userInfo.fullname : 'Loading...', user_image: userInfo ? userInfo.user_image : 'https://example.com/default-avatar.jpg', } });
    }
    else{
      showModal();
    }
  } catch(e)
  {
    console.log(e);
  }
}

//add post to subscribed list
const addToSubscribe = async() =>
{
  let tempID = await AsyncStorage.getItem('uid');
  try{
    const {data, error} = await supabase 
                    .from('subscribe')
                    .insert([
                      {
                        user_id: tempID,
                        news_id: id,
                      },
                    ]);
                  if(error)
                  {
                    hideModal();
                    Alert.alert(
                      'Subscription error',
                      'Cannot subscribe to news. Please contact the relevant help center.',
                      [{text: 'Return', style: 'cancel'},],{cancelable: true,} 
                  );
                  }
                  else 
                  {
                    navigation.navigate('ArticlesDetails', { article: { id, user_id, status, created_at, image_path, description, likes, comments,  fullname: userInfo ? userInfo.fullname : 'Loading...', user_image: userInfo ? userInfo.user_image : 'https://example.com/default-avatar.jpg', } });
                  hideModal();
                }
  }catch(e)
  {
    console.log("Subscription failed, ",e)
  }
}

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
            onPress={checkSubscribed}
            style={styles.readButton}
            labelStyle={styles.readButtonText}
          >
            Read
          </Button>
        </View>

<<<<<<< Updated upstream:components/ArticleCard.js
        <Portal>
          <Modal visible={isModalVisible} onDismiss={hideModal}>
            <View style={{ padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
              <Text>{description}</Text>
              <Button
=======
        <Portal style={{justifyContent: 'center'}}>
          <Modal style={{width: '60%', alignItems: 'center', marginLeft: 80, marginRight: 30  }} visible={isModalVisible} onDismiss={hideModal}>
            <View style={{ padding: 20, backgroundColor: 'white', borderRadius: 10 , justifyContent: 'center', alignItems: 'center'}}>
              <Text style ={{fontSize: 16, fontWeight: 'bold' }}>Pay 1 credit to read?</Text>
              <View style={{flexDirection: 'row', alignItems: 'center',     paddingTop: 20}}><Button
>>>>>>> Stashed changes:CJOP/components/ArticleCard.js
                mode="contained"
                onPress={handleReadMorePress}
                style={styles.readButton}
                labelStyle={styles.readButtonText}
              >
                Read
              </Button>
              {/* Add any other content you want in the modal */}
              <Button onPress={hideModal}>Close</Button></View>
              
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
    backgroundColor: '#72E6FF',
    borderRadius: 15,
  },
  readButtonText: {
    fontSize: 20, // Adjust the font size as needed
    fontWeight: 'bold', // Make the text bold
  },
});



