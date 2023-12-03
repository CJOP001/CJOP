// UserInfo.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../supabase/supabase';

const retrieveUserByPhone = async (phone) => {
  try {
    const { data, error } = await supabase
      .from('app_users')
      .select('*')
      .eq('phone_no', phone);

    if (data && data.length > 0) {
      const user = data[0];

      // Store user information in AsyncStorage
      await AsyncStorage.setItem('userData', JSON.stringify(user));

      return user;
    } else {
      throw error || 'User not found';
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    throw error;
  }
};

//get user data by calling this function
const getUserData = async () => {
  try {
    const userDataString = await AsyncStorage.getItem('userData');
    const userData = JSON.parse(userDataString);

    if (userData) {
      return userData;
    } else {
      console.error('User data is not available.');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving user data:', error);
    throw error;
  }
};


const retrieveUserData = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('app_users')
      .select('*')
      .eq('id', userId);

    if (data && data.length > 0) {
      const user = data[0];

      // Store user information in AsyncStorage (optional, based on your use case)
      await AsyncStorage.setItem('userData', JSON.stringify(user));

      return user;
    } else {
      throw error || 'User not found';
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    throw error;
  }
};

export { retrieveUserByPhone, getUserData, retrieveUserData };