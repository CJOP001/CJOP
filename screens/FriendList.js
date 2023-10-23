import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Button,
  BackHandler,
  Pressable,
} from "react-native";
import { Appbar, Avatar, Searchbar, Card } from "react-native-paper";
import { fcategories } from "../components/friendlist";
import { dummyFriends } from "../components/Friends";
import { ListItem } from "react-native-elements";
import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://imbrgdnynoeyqyotpxaq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltYnJnZG55bm9leXF5b3RweGFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIyNDI2NzEsImV4cCI6MjAwNzgxODY3MX0.fQ62JtlzvH-HM3tEXrp-rqcAXjb4jwUo1xzlhXw_cjE"
);

var userID = "1d93bd48-5c9e-43f0-9866-c0cd6a284a39";

const FriendsList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("Following");

  const onChangeSearch = (query) => {
    // Update the search query state
    setSearchQuery(query);
  };

  const [peopleList] = useState(dummyFriends);
  const [people, SetPeople] = useState([]);

  const sortPeople = async () => {
    console.log("Start sorting all people");
    const { data, error, count } = await supabase
      .from("app_users")
      .select(
        `
        id, 
        nameid,
        fullname,
        user_image
        `
      )
      .neq("id", userID);
    SetPeople(data);
  };

  const sortFollowing = async () => {
    console.log("Started sorting following.");
    const { data, error, count } = await supabase
      .from("friends")
      .select(`friend_id, app_users( user_image, fullname, nameid)`)
      .eq("user_id", userID);
    console.log(data);
  };

  // const sortFollowers = async () => {
  //   console.log("Started sorted followers.");
  //   const { data, error, count } = await supabase
  //     .from("friends")
  //     .select(`user_id, app_users( user_image, fullname, nameid )`)
  //     .eq("friend_id", userID);
  //   console.log(data);
  // };

  const sortFollowers = async () => {
    console.log("Started sorted followers.");
    const { data, error, count } = await supabase
      .from("app_users")
      .select(`friends.user_id, user_image, fullname, nameid `)
      .eq("friends.friend_id", userID);
    console.log(data);
  };

  useEffect(() => {
    sortPeople();
  }, []);

  return (
    <View>
      <Appbar.Header style={{ backgroundColor: "#72E6FF" }}>
        <View style={styles.customBackAction}>
          <Appbar.BackAction
            onPress={() => {
              console.log("Going back");
              navigation.goBack();
            }}
          />
        </View>
        {/*Header*/}
        <Appbar.Content title="Manage Friendss" style={styles.appContent} />
      </Appbar.Header>
      <View>
        {/*Search Bar */}

        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
        />

        {/*Tabs*/}
        <Card style={styles.buttonTab}>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Pressable style={styles.buttons} onPress={sortPeople}>
              <Text style={styles.buttonText}>People</Text>
            </Pressable>
            <Pressable style={styles.buttons} onPress={sortFollowers}>
              <Text style={styles.buttonText}>Followers</Text>
            </Pressable>
            <Pressable style={styles.buttons} onPress={sortFollowing}>
              <Text style={styles.buttonText}>Following</Text>
            </Pressable>
          </View>

          {/*List*/}
          <View style={{ alignItems: "left", padding: 15, width: "100%" }}>
            <FlatList
              data={people}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <ListItem>
                  <Avatar.Image
                    rounded
                    source={{
                      uri: item.user_image,
                    }}
                  />
                  <ListItem.Title>{item.fullname}</ListItem.Title>
                  <ListItem.Subtitle>@{item.nameid}</ListItem.Subtitle>
                </ListItem>
              )}
            />
          </View>
        </Card>
      </View>
    </View>
  );
};

export default FriendsList;

const styles = StyleSheet.create({
  text: {
    fontSize: 35,
    textAlign: "center",
    padding: 15,
    fontWeight: "500",
  },
  customBackAction: {
    marginLeft: -10, // Adjust the back action position if needed
  },
  appContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTab: {},
  FriendsList: {
    height: "25%",
    width: "100%",
    alignItems: "center",
  },
  icon: {
    height: 20,
    width: 20,
    marginRight: 20,
  },
  container: {
    flexDirection: "row",
    transform: [{ translateX: 10 }],
    padding: 10,
  },
  categoryScrollView: {
    padding: 10,
  },
  buttons: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "white",
    borderWidth: 5,
    borderColor: "#72E6FF",
    translateX: -50,
    borderRadius: 20,
    minWidth: 120,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#72E6FF",
  },
});
