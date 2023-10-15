import React, { useState } from "react";
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
} from "react-native";
import { Appbar, Avatar, Searchbar, Card } from "react-native-paper";
import { categories } from "../components/categories";
import { dummyArticles } from "../components/articles";
import ArticleCard from "../components/ArticleCard";
import { launchImageLibrary } from "react-native-image-picker";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const getData = async () => {
  const { data, error, count } = await supabase
    .from("app_users")
    .select(
      `
    user_image,
    fullname,
    `
    )
    .eq("id", userID);
  SetUser(data);
};

useEffect(() => {
  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from("UserImage")
        .download(path);
      if (error) {
        throw error;
      }

      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error);
    }
  }

  if (url) downloadImage(url);
}, [url, supabase]);

const uploadAvatar = async (event) => {
  try {
    setUploading(true);

    if (!event.target.files || event.target.files.length === 0) {
      throw new Error("You must select an image to upload.");
    }

    const file = event.target.files[0];
    const fileExt = file.name.split(".").pop();
    const filePath = `${uid}-${Math.random()}.${fileExt}`;

    let { error: uploadError } = await supabase.storage
      .from("UserImage")
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    onUpload(filePath);
  } catch (error) {
    alert("Error uploading avatar!");
  } finally {
    setUploading(false);
  }
};
const renderItem = ({ item }) => {
  return <ArticleCard {...item} />;
};
const follow = ({}) => {};
const SelfProfile = () => {
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
        <Appbar.Content title="Your Profile" style={styles.appContent} />
      </Appbar.Header>
      <View>
        {/*Profile Background*/}
        <Card mode="outlined" style={styles.profile}>
          <Card.Cover
            source={require("../assets/background.png")}
            style={{ height: 125, minWidth: "100%" }}
          />
          {/*Profile Image*/}
          <Card.Title
            left={(props) => (
              <Avatar.Image
                source={
                  require("../assets/profile.png") /* TODO: Eventually change to depend on database*/
                }
                size={80}
                style={{ transform: [{ translateY: -20 }] }}
              />
            )} /*Edit Profile button*/
            right={(props) => (
              <Button
                title="Edit Profile"
                mode="contained"
                onPress={() => editProfile()}
                labelStyle={{ fontSize: 21, color: "white" }}
                style={{
                  transform: [{ translateX: -60 }],
                }}
              />
            )}
          />
          <Card.Content style={{ margin: 5, transform: [{ translateY: -15 }] }}>
            <Text>Profile</Text>
            {/*Placeholder Profile Nickname*/}
            <Text>@Profile</Text>
            {/*Placeholder Profile Name*/}
          </Card.Content>
          <Card.Content
            style={{
              transform: [{ translateX: 20 }, { translateY: -10 }],
              marginBottom: 10,
            }}
          >
            <Text>A long description</Text>
            {/*Placeholder description*/}
          </Card.Content>
          <Card.Content>
            <View style={styles.container}>
              <Image
                source={require("../assets/calendar-icon.png")}
                style={styles.icon}
              />
              <Text>Joined </Text>
            </View>
          </Card.Content>
          <Card.Content
            style={{ transform: [{ translateX: 20 }], flexDirection: "row" }}
          >
            <Text>Following:</Text>
            {/*TODO: Append following count*/}
            <Text>Followers:</Text>
            {/*TODO: Append Follower count*/}
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
    </View>
  );
};

export default SelfProfile;

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
});
