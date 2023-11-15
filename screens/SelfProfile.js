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
import { categories } from "../components/categories";
import { dummyArticles } from "../components/articles";
import ArticleCard from "../components/ArticleCard";
import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

//the following bool. use this to indicate whether the current user is being followed or not.
var followed = false;
var followButtonStatus = "Follow";
const supabase = createClient(
  "https://imbrgdnynoeyqyotpxaq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltYnJnZG55bm9leXF5b3RweGFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIyNDI2NzEsImV4cCI6MjAwNzgxODY3MX0.fQ62JtlzvH-HM3tEXrp-rqcAXjb4jwUo1xzlhXw_cjE"
);

//render the article cards
//TODO: automatically filter by current user.
const renderItem = ({ item }) => {
  return <ArticleCard {...item} />;
};

const OtherProfile = (navigation) => {
  const [userdata, SetUser] = useState([]);
  const [followers, SetFollowers] = useState([]);
  const [following, SetFollowing] = useState([]);
  const [follow, SetFollow] = useState();

  // The ID of the person with the current profile
  var userID = navigation.route.params.id;
  //The ID of the current user
  var selfID = navigation.route.params.user_id;

  const isFollowed = async () => {
    //queries if the current user is following the other person
    console.log("searching if followed");
    const { data, error, count } = await supabase
      .from("friends")
      .select(
        `
        user_id,
        friend_id
    `
      )
      .eq("user_id", selfID)
      .eq("friend_id", userID);
    if (data.length == 0) {
      SetFollow("Follow");
    } else SetFollow("Following");
    console.log("Followed? " + followed);
  };

  const getData = async () => {
    //obtain the user data based on the passed data
    const { data, error, count } = await supabase
      .from("app_users")
      .select(
        `
    user_image,
    fullname,
    id, 
    created_at,
    description,
    background_image,
    nameid

    `
      )
      .eq("id", userID);
    SetUser(data);
  };

  const getFollowing = async () => {
    //obtain the following count
    const { data, error, count } = await supabase
      .from("friends")
      .select(`user_id`, `friend_id`, { count: "exact", head: true })
      .eq("user_id", userID);
    SetFollowing(data.length);
  };

  const getFollowers = async () => {
    //obtain the follower count
    const { data, error, count } = await supabase
      .from("friends")
      .select(`user_id`, `friend_id`, { count: "exact", head: true })
      .eq("friend_id", userID);
    SetFollowers(data.length);
  };

  useEffect(() => {
    getData();
    getFollowers();
    getFollowing();
    isFollowed();
  }, []);

  const followButtonPressed = async () => {
    //update the database based on if followed or not.
    //can either check again before inserting/deleting values or just based on the following bool value.
    const { data, error, count } = await supabase
      .from("friends")
      .select(
        `
        user_id,
        friend_id
    `
      )
      .eq("user_id", selfID)
      .eq("friend_id", userID);
    if (data.length == 0) {
      console.log("Following this person");
      const { data, error, count } = await supabase
        .from("friends")
        .insert({ user_id: selfID, friend_id: userID });
      SetFollow("Following");
    } else {
      console.log("Unfollowing this person");
      const { data, error, count } = await supabase
        .from("friends")
        .delete()
        .eq("user_id", selfID)
        .eq("friend_id", userID);
      SetFollow("Follow");
    }
  };

  function renderProfile() {
    //render the profile. Have to seperate from general segment due to the part loading before it should, which would cause an error and crash.
    return (
      <View>
        {userdata.map((userdata) => (
          <View key={userdata.id}>
            {/*Profile Background*/}
            <Card mode="outlined" style={styles.profile}>
              <Card.Cover
                source={{ uri: userdata.background_image }}
                style={{ height: 125, minWidth: "100%" }}
              />
              {/*Profile Image*/}
              <Card.Title
                left={(props) => (
                  <Avatar.Image
                    source={{
                      uri: userdata.user_image,
                    }}
                    size={80}
                    style={{ transform: [{ translateY: -20 }] }}
                  />
                )} /*Follow Button*/
                right={(props) => (
                  <Pressable
                    style={styles.button}
                    onPress={followButtonPressed}
                  >
                    <Text style={styles.buttonText}>{follow}</Text>
                  </Pressable>
                )}
              />
              <Card.Content
                style={{ margin: 5, transform: [{ translateY: -15 }] }}
              >
                <Text>{userdata.fullname}</Text>
                <Text>@{userdata.nameid}</Text>
              </Card.Content>
              <Card.Content
                style={{
                  transform: [{ translateX: 20 }, { translateY: -10 }],
                  marginBottom: 10,
                }}
              >
                {/*Profile Description*/}
                <Text>{userdata.description}</Text>
              </Card.Content>
              <Card.Content>
                <View style={styles.container}>
                  <Image
                    source={require("../assets/calendar-icon.png")}
                    style={styles.icon}
                  />
                  <Text>
                    Joined:{" "}
                    {userdata.created_at.length >= 10
                      ? userdata.created_at.slice(0, 10)
                      : userdata.created_at}{" "}
                  </Text>
                </View>
              </Card.Content>
              <Card.Content
                style={{
                  transform: [{ translateX: 20 }],
                  flexDirection: "row",
                }}
              >
                <Text>
                  Following: {following} | Followers: {followers}
                </Text>
              </Card.Content>
            </Card>
            {/* List of articles */}
            <View style={{ alignItems: "left", padding: 15, width: "100%" }}>
              <FlatList
                data={dummyArticles}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        ))}
      </View>
    );
  }

  return (
    <View>
      {/*Header Section*/}
      <Appbar.Header style={{ backgroundColor: "#72E6FF" }}>
        <View style={styles.customBackAction}>
          <Appbar.BackAction
            onPress={() => {
              console.log("Going back");
              navigation.goBack();
            }}
          />
        </View>
        {/*Title Bar*/}
        <Appbar.Content title="Profile" style={styles.appContent} />
      </Appbar.Header>
      {renderProfile()}
    </View>
  );
};

export default OtherProfile;

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
  profile: {
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
  button: {
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
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#72E6FF",
  },
});