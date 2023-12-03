import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Image, Text } from 'react-native';
import { Appbar, Searchbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../supabase/supabase';

const FriendList = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [userID, setUserID] = useState('');

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const fetchUsers = async () => {
    try {
      if (!userID) {
        console.warn('User ID is empty.');
        return;
      }

      const { data: usersData, error } = await supabase
        .from('app_users')
        .select('id, fullname, user_image')
        .neq('id', userID)
        .ilike('fullname', `%${searchQuery}%`)
        .order('fullname', { ascending: true });

      if (error) {
        console.error('Error fetching users:', error);
        return;
      }

      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      try {
        // Fetch user ID from async storage
        const storedUserID = await AsyncStorage.getItem('uid');
        console.log('UserID:', storedUserID);

        if (storedUserID) {
          setUserID(storedUserID);

          await fetchUsers();
        } else {
          console.error('User ID not available.');
        }
      } catch (error) {
        console.error('Error initializing data:', error);
      }
    };

    // Initialize data when the component mounts or when the userID changes
    initializeData();
  }, [userID, searchQuery]);

  const renderItem = ({ item }) => (
    <View style={styles.userItem}>
      {item.user_image ? (
        <Image style={styles.avatar} source={{ uri: item.user_image }} />
      ) : (
        <View style={styles.defaultAvatar} />
      )}
      <View style={styles.userInfo}>
        <Text>{item.fullname}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction
          onPress={() => {
            console.log('Going back');
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Manage Friends" style={styles.appContent} />
      </Appbar.Header>

      <View style={styles.listContainer}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // Add other styles as needed
  },
  // Add other styles as needed
  listContainer: {
    flex: 1,
    padding: 10,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  defaultAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: '#ccc',
  },
  userInfo: {
    // Add styles for user information container
  },
});

export default FriendList;
