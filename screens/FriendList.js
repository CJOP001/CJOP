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
import { ListItem } from "react-native-elements";
import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import { isString } from "formik";

const supabase = createClient(
  "https://imbrgdnynoeyqyotpxaq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltYnJnZG55bm9leXF5b3RweGFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIyNDI2NzEsImV4cCI6MjAwNzgxODY3MX0.fQ62JtlzvH-HM3tEXrp-rqcAXjb4jwUo1xzlhXw_cjE"
);

//hardcoded user id. TODO: Update to automatically retrieve id from previous parts.
var userID = "1d93bd48-5c9e-43f0-9866-c0cd6a284a39";

const FriendsList = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  var query = "";
  const onChangeSearch = (query) => {
    // Update the search query state
    setSearchQuery(query);
    query = "*" + query + "*";
    //console.log("Now searching: " + query);
    sortPeople(query);
  };

  //initial fake data because react will load this data regardless of if the data has been obtained yet
  const [people, SetPeople] = useState([{ fullname: "" }]);

  const sortPeople = async (query) => {
    //query for everyone that does not have the current user id
    if (!isString(query)) {
      //console.log("Sorting no query");
      const { data, error } = await supabase
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
    } else {
      //console.log("Sorting with query");
      //console.log(query);
      const { data, error } = await supabase
        .from("app_users")
        .select(
          `
      id, 
      nameid,
      fullname,
      user_image
      `
        )
        .neq("id", userID)
        .textSearch("nameid", query);
      // currently this query system only takes in strict values and not wildcards. This does not use a regex format so wildcards (*) do not work.
      // to utilize regex, the query lookup needs to be converted to full posgres which i do not have time for.
      console.log(data);
      //if the dataset is empty, don't render anything.
      if (data.length > 0) {
        SetPeople(data);
      }
    }
  };

  const sortFollowing = async () => {
    console.log("Started sorting following.");
    //query for every friend_id and their associated app_users data when the user_id is equal to the current session's user_id
    //query for everyone that does not have the current user id
    const { data, error, count } = await supabase
      .from("friends")
      .select(`friend_id, user:friend_id(id, user_image, fullname, nameid)`)
      .eq("user_id", userID);
    if (data.length > 0) {
      SetPeople(data);
    }

    //this one is objectively correct but fails due to not recognizing the correct foreign key
    // const { data, error, count } = await supabase
    //   .from("friends")
    //   .select(`friend_id, app_users( user_image, fullname, nameid)`)
    //   .eq("user_id", userID);

    //a reversed query of the above. Somehow the id field is left empty and the sort doesnt work.
    // const { data, error } = await supabase
    //   .from("app_users")
    //   .select(`friends(user_id), user_image, fullname, nameid`)
    //   .eq("friends.user_id", userID);

    //honestly, gg. spent roughly 24 hours across several weeks just working out this part.
    //console.log(data);
  };

  const sortFollowers = async () => {
    console.log("Started sorted followers.");
    //query for the user_id and their associated app_users data when the friend_id is equal to the current session's user_id
    //query for everyone that does not have the current user id
    const { data, error, count } = await supabase
      .from("friends")
      .select(`user_id, user:user_id(id, user_image, fullname, nameid)`)
      .eq("friend_id", userID);
    if (data.length > 0) {
      SetPeople(data);
    }
  };
  function renderList() {
    //render the elements based on the data obtained as the data obtained comes in slightly different formats
    if (typeof people[0].fullname !== "undefined") {
      //this returns the elements suitable for a two dimensional json array
      return (
        <FlatList
          data={people}
          keyExtractor={(item) => item.user_id}
          renderItem={({ item }) => (
            <ListItem
              onPress={() => {
                navigation.navigate("OtherProfile", {
                  id: item.id,
                  user_id: userID,
                });
              }}
            >
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
      );
    } else {
      // this returns the elements suitable for a three dimensional json array
      return (
        <FlatList
          data={people}
          keyExtractor={(item) => item.user_id}
          renderItem={({ item }) => (
            <ListItem
              onPress={() => {
                console.log(item.user_id);
                navigation.navigate("OtherProfile", {
                  id: item.user.id,
                  user_id: userID,
                });
              }}
            >
              <Avatar.Image
                rounded
                source={{
                  uri: item.user.user_image,
                }}
              />
              <ListItem.Title>{item.user.fullname}</ListItem.Title>
              <ListItem.Subtitle>@{item.user.nameid}</ListItem.Subtitle>
            </ListItem>
          )}
        />
      );
    }
  }

  //on page load, initialize sortPeople.
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
        <Appbar.Content title="Manage Friends" style={styles.appContent} />
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
          <View
            style={{ alignItems: "left", padding: 15, width: "100%" }}
            onload={sortPeople}
            on
          >
            {renderList()}
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
