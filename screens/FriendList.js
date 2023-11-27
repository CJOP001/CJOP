import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
} from "react-native";
import { Appbar, Avatar, Searchbar, Card } from "react-native-paper";
import { ListItem } from "react-native-elements";
import { Tab } from '@rneui/themed';
import supabase from "../supabase/supabase";
import { getUserData, retrieveUserData } from "../components/UserInfo";
import AsyncStorage from '@react-native-async-storage/async-storage';

const FriendsList = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [userID, setUserID] = useState(null);
  const [error, setError] = useState(null);
  const [people, setPeople] = useState(null);


  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
      const initializeData = async () => {
        try {
          // Fetch user ID from async storage
          const storedUserID = await AsyncStorage.getItem('uid');
          console.log('UserID:', storedUserID);

          if (storedUserID) {
            // Set the retrieved user ID to the state variable
            setUserID(storedUserID);

            await sortPeople(storedUserID);

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

 const sortPeople = async () => {
   console.log("Start sorting all people");
   try {
     // Check if userID is available before making the query
     if (userID) {
       const { data, error } = await supabase
         .from("app_users")
         .select("id, nameid, fullname, user_image")
         .neq("id", userID);

       if (error) {
         console.error("Error fetching all people:", error);
       } else {
         console.log("Data:", data);
         setPeople(data);
       }
     } else {
       console.error("UserID is null. Cannot fetch data.");
     }
   } catch (error) {
     console.error("Error sorting people:", error);
   }
 };


  const sortFollowing = async () => {
    try {
      const { data, error, count } = await supabase
        .from("friends")
        .select("friend_id, user_id(app_users(id, user_image, fullname, nameid))")
        .eq("user_id", userID);

      if (data) {
        setPeople(data);
      } else {
        console.error("Error fetching friends:", error);
      }
    } catch (error) {
      console.error("Error sorting following:", error);
    }
  };

  const sortFollowers = async () => {
    try {
      const { data, error, count } = await supabase
        .from("friends")
        .select("user_id, app_users(id, user_image, fullname, nameid)")
        .eq("friend_id", userID);

      if (data) {
        setPeople(data);
      } else {
        console.error("Error fetching followers:", error);
      }
    } catch (error) {
      console.error("Error sorting followers:", error);
    }
  };

const renderList = () => {
  if (!people) {
    return null; // Return null or a loading indicator while data is being fetched
  }

  return (
    <FlatList
      data={people}
      keyExtractor={(item) => item.user_id}
      renderItem={({ item }) => {
        const user = item.app_users || item; // Use app_users if available, otherwise use the item itself

        return (
          <ListItem>
            <Avatar.Image
              rounded
              source={{
                uri: user.user_image,
              }}
            />
            <ListItem.Title>{user.fullname}</ListItem.Title>
            <ListItem.Subtitle>@{user.nameid}</ListItem.Subtitle>
          </ListItem>
        );
      }}
    />
  );
};
  // On page load, initialize sortPeople.
  useEffect(() => {
    sortPeople();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction
          onPress={() => {
            console.log("Going back");
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Manage Friends" style={styles.appContent} />
      </Appbar.Header>
      <View style={styles.contentContainer}>
        {/* Enhanced Search Bar */}
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchBar}
            inputStyle={styles.searchInput}
            iconColor="#555"
          />
        </View>

        {/* Tabs and List */}
        <Card style={styles.card}>
          <Tab
            value={index}
            onChange={setIndex}
            indicatorStyle={{ backgroundColor: '#72E6FF', height: 3 }}
          >
            <Tab.Item
              title="People"
              titleStyle={styles.tabItem}
              style={styles.tabItemContainer}
              onPress={sortPeople}
            />
            <Tab.Item
              title="Followers"
              titleStyle={styles.tabItem}
              style={styles.tabItemContainer}
              onPress={sortFollowers}
            />
            <Tab.Item
              title="Following"
              titleStyle={styles.tabItem}
              style={styles.tabItemContainer}
              onPress={sortFollowing}
            />
          </Tab>

          {/* List */}
          <View style={styles.listContainer}>{renderList()}</View>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  appbar: {
    backgroundColor: "#72E6FF",
  },
  appContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    padding: 15,
  },
  searchContainer: {
    marginVertical: 10,
  },
  searchBar: {
    borderRadius: 20,
    backgroundColor: "#E0E0E0", // Gray background for the search bar
  },
  searchInput: {
    fontSize: 16,
  },
  card: {
    flex: 1,
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "white",
  },
  listContainer: {
    flex: 1,
  },
  tabItemContainer: {
    flex: 1,
    width: 0,
    overflow: 'hidden',
  },
  tabItem: {
    fontSize: 14,
    color: '#7C82A1',
    textAlign: 'left',
  },
});

export default FriendsList;
