import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, ActivityIndicator, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { getUserData } from '../../components/UserInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../../supabase/supabase';

const PostingModal = ({
  isVisible,
  headerText,
  subText1,
  onCancel,
  textInputValue,
  image,
  userId,
  selectedCategoryId,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const closeIconSizePercentage = 5;
  const modalContainerWidth = screenWidth * 0.9;
  const modalContainerHeight = screenHeight * 0.4;
  const closeButtonSize = modalContainerWidth * 0.05;
  const closeIconSize = closeButtonSize * 0.6;

  const navigation = useNavigation();

   const [loading, setLoading] = useState(false);
    const [userBalances, setUserBalances] = useState('Loading...');

     const callBalance = async () => {
       try {
         if (userId) {
           const { data: userCreditDetail, error: creditsError } = await supabase
             .from('credits')
             .select('credit_amount')
             .eq('user_id', userId);

           if (creditsError) {
             console.error('Error fetching user credits:', creditsError);
             setLoading(false);
             return;
           }

           setUserBalances(userCreditDetail[0].credit_amount);
         } else {
           console.error('User data is not available.');
         }
       } catch (error) {
         console.error('Error fetching user data:', error);
       } finally {
         setLoading(false);
       }
     };

     useEffect(() => {
       callBalance();
     }, []);

const handleConfirm = async () => {
  console.log('Text Input:', textInputValue);
  setLoading(true); // Show loader when confirming

  const userData = await getUserData();

  if (!userData) {
    setLoading(false); // Hide loader after the process is complete
    console.error('User data is not available.');
    return;
  }

  const timestamp = Date.now();
  const imageName = `image/${timestamp}`;

  const currentDate = new Date();
  const currentTime = currentDate.toISOString();

  try {
    // Check if user data is available
    if (userData) {
      userId = userData.id;

      // Check if user balance is lower than 10 credits
    const { data: userCredits, error: creditsError } = await supabase
    .from('credits')
    .select('credit_amount')
    .eq('user_id', userId)
    .single();

  if (creditsError) {
    console.error('Error fetching user credits:', creditsError);
    setLoading(false);
    return;
  }

  const userBalance = userCredits.credit_amount;

  if (userBalance < 10) {
    Alert.alert(
      'Insufficient Credits',
      'You do not have enough credits to make this post. Please recharge your account.',
      [{ text: 'OK', onPress: () => setLoading(false) }]
    );
    return;
  }

    } else {
      console.error('User data is not available.');
    };
  } catch (error) {
    console.error('Error retrieving user data:', error);
    setLoading(false); // Hide loader after the process is complete
    return; // Stop further execution to avoid errors
  }

  try {
    if (image) {
      // Determine the MIME type based on the file extension
      let mimeType;
      const fileExtension = image.split('.').pop().toLowerCase();
      switch (fileExtension) {
        case 'jpeg':
        case 'jpg':
          mimeType = 'image/jpeg';
          break;
        case 'png':
          mimeType = 'image/png';
          break;
        default:
          console.error('Invalid MIME type for the image');
          return;
      }

      // Convert the image data to base64
      const imageBase64 = await fetch(image)
        .then((res) => res.blob())
        .then((blob) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
              resolve(reader.result);
            };
            reader.readAsDataURL(blob);
          });
        });

      // Create a FormData object and append the image
      var formData = new FormData();
      formData.append('files', {
        uri: imageBase64, // Use the base64 image data
        type: mimeType, // Set the correct MIME type
        name: imageName,
      });

      // Store the image in the Supabase bucket
      const { data: fileData, error: fileError } = await supabase.storage
        .from('Testing')
        .upload(imageName, formData);

      console.log('Image:', imageName);
      console.log('Image Data:', fileData); // Log the image data

      if (fileError) {
        console.error('Error uploading image:', fileError);
      } else {
        const imageUrl = `https://imbrgdnynoeyqyotpxaq.supabase.co/storage/v1/object/public/Testing/${imageName}`;
        await deductCredits(userId);
        // Store the imageUrl and text input in your database
        const { data: postData, error: postError } = await supabase
          .from('news_management')
          .insert([
            {
              description: textInputValue,
              image_path: imageUrl,
              created_at: currentTime,
              nc_id: selectedCategoryId,
              user_id: userId,
              updated_at: currentTime,
              status: 'pending',
            },
          ])
          .select('*');

        if (postError) {
          console.error('Error sending data to Supabase:', postError);
        } else {
          console.log('Data sent to Supabase:', postData);

          // Insert 10 credits from the user transaction
          const { data: transactionData, error: transactionError } = await supabase
            .from('credit_transactions')
            .insert([
              {
                user_id: userId,
                amount: 10,
                transaction_type: 'Post',
              },
            ])
            .select('*');

          if (transactionError) {
            console.error('Error inserting credits transaction:', transactionError);
          } else {
            console.log('Credits trasaction inserted:', transactionData);

            navigation.navigate('HomeStack');
          }
        }
      }
    }
  } catch (error) {
    console.error('Error sending data to Supabase:', error);
  } finally {
    setLoading(false); // Hide loader after the process is complete
  }
};


const deductCredits = async (userId) => {
  try {
    console.log('Deducting credits for user:', userId);
    // Retrieve the user's current credit balance
    const { data: userData, error: userError } = await supabase
      .from('credits')
      .select('credit_amount')
      .eq('user_id', userId)
      .single();

      console.log('User data:', userData);

    if (userError) {
      console.error('Error fetching user credits:', userError);
      // Handle the error as needed
      return;
    }

    const currentCredits = userData.credit_amount;
    console.log('Current credits:', currentCredits);

    // Deduct 10 credits
    const updatedCredits = currentCredits - 10;
    console.log('Updated credits:', updatedCredits);

    // Update the user's credit table with the new balance
    const { data: updateData, error: updateError } = await supabase
      .from('credits')  // Ensure this matches your actual table name
      .update({ credit_amount: updatedCredits })
      .eq('user_id', userId)
      .single();

    if (updateError) {
      console.error('Error updating user credits:', updateError);
      // Handle the error as needed
      return;
    }

    console.log('Credits deducted successfully. New balance:', updatedCredits);
  } catch (error) {
    console.error('Error deducting credits:', error);
    // Handle the error as needed
  }
};


  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
    },
    headerText: {
      fontSize: modalContainerWidth * 0.07, // Adjust the fontSize as needed
      fontWeight: 'bold',
      marginLeft: modalContainerWidth * 0.005, // Adjust the margin as needed
      marginTop: modalContainerWidth * -0.037, // Adjust the margin as needed
    },
    subText1: {
      fontWeight: 'bold',
      fontSize: modalContainerWidth * 0.05, // Adjust the fontSize as needed
      marginTop: modalContainerWidth * 0.06, // Adjust the margin as needed
    },
    closeButton: {
      position: 'absolute',
      top: closeButtonSize * 0.5,
      right: closeButtonSize * 0.5,
      padding: closeButtonSize,
    },
    closeIcon: {
      width: modalContainerWidth * (closeIconSizePercentage / 100),
      height: modalContainerWidth * (closeIconSizePercentage / 100),
    },
    modalContent: {
      backgroundColor: 'white',
      padding: modalContainerWidth * 0.1,
      width: modalContainerWidth,
      height: modalContainerHeight,
    },
    modalTitle: {
      fontSize: modalContainerWidth * 0.07,
    },
    modalText: {
      fontSize: modalContainerWidth * 0.04,
      marginBottom: modalContainerWidth * 0.08,
    },
    confirmButton: {
      backgroundColor: '#72E6FF',
      marginTop: modalContainerHeight * 0.1,
      padding: modalContainerWidth * 0.05,
      borderRadius: modalContainerWidth * 0.02,
      alignItems: 'center',
    },
    confirmButtonText: {
      color: 'white',
      fontSize: modalContainerWidth * 0.04,
      fontWeight: 'bold',
    },

    loaderContainer: {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          justifyContent: 'center',
          alignItems: 'center',
        },
  });

   return (
      <Modal isVisible={isVisible} backdropOpacity={0.7} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={onCancel} style={styles.closeButton}>
              <Image source={require('../../assets/cross_button.png')} style={styles.closeIcon} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Posting</Text>
            <Text style={styles.subText1}> 10 Credits will be pending</Text>
              <Text style={styles.modalText}>
                Current Balance: {userBalances} credits
                </Text>
            <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>

            {loading && (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#72E6FF" />
              </View>
            )}
          </View>
        </View>
      </Modal>
    );
  };


export default PostingModal;