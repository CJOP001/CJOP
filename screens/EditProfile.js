import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Platform,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Button,
  BackHandler,
  Pressable,
} from "react-native";
import { Appbar, Avatar, Searchbar, Card } from "react-native-paper";
import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import * as ImagePicker from "expo-image-picker";
import { FileObject } from "@supabase/storage-js";

const supabase = createClient(
  "https://imbrgdnynoeyqyotpxaq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltYnJnZG55bm9leXF5b3RweGFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIyNDI2NzEsImV4cCI6MjAwNzgxODY3MX0.fQ62JtlzvH-HM3tEXrp-rqcAXjb4jwUo1xzlhXw_cjE"
);

var userID = "1d93bd48-5c9e-43f0-9866-c0cd6a284a39";

const EditProfile = () => {
  const [userdata, SetUser] = useState([]);
  const [followers, SetFollowers] = useState([]);
  const [following, SetFollowing] = useState([]);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState();

  const uploadAvatar = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result) {
      setImage(result.assets[0].uri);
      setFile(result.assets[0].uri);
      uploadImage;
    }

    const uploadImage = async (e) => {
      e.preventDefault();
      const filename = `${userdata.nameid}-${file.name}`;
      console.log("attempt starts");
      console.log(file + filename);
      const { data, error } = await supabase.storage
        .from("testing")
        .upload(filename, file);
      if (error) {
        // Handle error
        console.log("Something went wrong!");
      } else {
        // Handle success
        console.log("uploaded!");
      }
    };
  };

  const submit = async () => {};

  const getData = async () => {
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
    const { data, error, count } = await supabase
      .from("friends")
      .select(`user_id`, `friend_id`, { count: "exact", head: true })
      .eq("user_id", userID);
    SetFollowing(data.length);
  };

  const getFollowers = async () => {
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
  }, []);

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
        <Appbar.Content title="Edit Profile" style={styles.appContent} />
      </Appbar.Header>
      {userdata.map((userdata) => (
        <View key={userdata.id}>
          {/*Profile Background*/}
          <Card mode="outlined" style={styles.profile}>
            <Card.Cover
              source={{ uri: userdata.background_image }}
              style={{ height: 125, minWidth: "100%" }}
            />
            {/*Profile Image*/}
            <Pressable onPress={uploadAvatar}>
              <Card.Title
                left={(props) => (
                  <Avatar.Image
                    source={{
                      uri: userdata.user_image,
                    }}
                    size={150}
                    style={styles.profileimage}
                  />
                )}
                right={(props) =>
                  image && (
                    <Avatar.Image
                      source={{
                        uri: image,
                      }}
                      size={150}
                      style={styles.tempprofileimage}
                    />
                  )
                }
              />
            </Pressable>
            <Card.Content
              style={{
                margin: 5,
                alignItems: "center",
                marginBottom: 80,
              }}
            >
              <Text>{userdata.fullname}</Text>
              <Text style={{ marginBottom: 10 }}>@{userdata.nameid}</Text>
              <Text>{userdata.description}</Text>
            </Card.Content>
            <Card.Content
              style={{
                alignItems: "center",
              }}
            >
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
                marginBottom: 50,
                alignItems: "center",
              }}
            >
              <Text>
                Following: {following} | Followers: {followers}
              </Text>
            </Card.Content>

            <Pressable style={styles.button} onPress={submit}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </Pressable>
          </Card>
        </View>
      ))}
    </View>
  );
};

export default EditProfile;

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
    height: "100%",
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
    padding: 10,
    alignItems: "center",
  },
  button: {
    width: "25%",
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
  profileimage: {
    alignItems: "center",
    transform: [{ translateY: -30 }, { translateX: 113 }],
  },
  tempprofileimage: {
    alignItems: "center",
    transform: [{ translateY: -30 }, { translateX: -113 }],
  },
});
