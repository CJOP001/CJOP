import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  Button,
  BackHandler,
  Pressable,
  TextInput,
  ImageComponent,
} from "react-native";
import { Appbar, Avatar, Card } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { decode } from "base64-arraybuffer";
import supabase from "../supabase/supabase";

const EditProfile = (navigation) => {
  //change USERID to obtain itself from the previous page
  var userID = navigation.route.params.id;

  const [userdata, SetUser] = useState([]);
  const [followers, SetFollowers] = useState([]);
  const [following, SetFollowing] = useState([]);
  const [file, setFile] = useState();
  const [fileB, setFileB] = useState();
  const [newname, changeName] = useState();
  const [newdesc, changeDesc] = useState();
  const [newproflink, changeProfLink] = useState();
  const [newbacklink, changeBackLink] = useState();

  const uploadAvatar = async () => {
    //launch the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    //if the result is obtained
    if (result) {
      setFile(result.assets[0].base64);
      console.log("upload atttempt!");
      //the filename is <userid>.jpg
      const filename = `/Avatars/${userID}.jpg`;
      console.log("initialize upload");
      //supabase does not recognize image bodies, so need a base64 decoder
      const { data, error } = await supabase.storage
        .from("UserImage")
        .upload(filename, decode(file), {
          contentType: "image/png",
          upsert: true,
        });
      if (error) {
        // Handle error
        console.log("Something went wrong!");
      } else {
        // Handle success
        console.log("uploaded!");
        changeProfLink(
          "https://imbrgdnynoeyqyotpxaq.supabase.co/storage/v1/object/public/UserImage" +
            filename
        );
      }
    } else;
  };

  const uploadBackground = async () => {
    //launch the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //if the result is obtained
    if (result) {
      setFileB(result.assets[0].base64);
      console.log("upload atttempt!");
      //the filename is <userid>-background.jpg
      const filename = `/Backgrounds/${userID}-background.jpg`;
      console.log("initialize upload");
      //supabase does not recognize image bodies, so need a base64 decoder
      const { data, error } = await supabase.storage
        .from("UserImage")
        .upload(filename, decode(fileB), {
          contentType: "image/png",
          upsert: true,
        });
      if (error) {
        // Handle error
        console.log("Something went wrong!");
      } else {
        // Handle success
        console.log("uploaded!");
        changeBackLink(
          "https://imbrgdnynoeyqyotpxaq.supabase.co/storage/v1/object/public/UserImage" +
            filename
        );
      }
    } else;
  };

  const submit = async () => {
    console.log("updating data now!");
    console.log(newname);
    console.log(newdesc);
    console.log(newproflink);
    console.log(newbacklink);
    const { data, error } = await supabase
      .from("app_users")
      .update({
        fullname: newname,
        description: newdesc,
        user_image: newproflink,
        background_image: newbacklink,
      })
      .eq("id", userID);
    if (error) {
      console.log("update failed!");
    } else {
      console.log("update sucessful!");
    }
  };

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
    console.log(data[0].background_image);
    console.log("getdata");
    changeName(data[0].fullname);
    changeDesc(data[0].description);
    changeProfLink(data[0].user_image);
    changeBackLink(data[0].background_image);
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
              onTouchStart={uploadBackground}
            />
            {/*Profile Image*/}
            <Card.Title
              left={(props) => (
                <Avatar.Image
                  source={{
                    uri: userdata.user_image,
                  }}
                  size={150}
                  style={styles.profileimage}
                  onTouchStart={uploadAvatar}
                />
              )}
            />
            <Card.Content
              style={{
                margin: 5,
                alignItems: "center",
                marginTop: 60,
                marginBottom: 80,
              }}
            >
              <TextInput
                editable
                style={styles.username}
                onChangeText={changeName}
                defaultValue={userdata.fullname}
                keyboardType="default"
              />
              <Text style={{ marginBottom: 10 }}>@{userdata.nameid}</Text>

              <TextInput
                editable
                style={styles.description}
                onChangeText={changeDesc}
                defaultValue={userdata.description}
                keyboardType="default"
                multiline
                numberOfLines={4}
              />
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
                marginBottom: 30,
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
    marginTop: 50,
    marginBottom: 10,
    paddingBottom: 10,
    transform: [{ translateX: 113 }],
  },
  username: {
    fontSize: 16,
    minWidth: "100%",
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontWeight: "bold",
  },
  description: {
    minWidth: "100%",
    minHeight: "10%",
    fontSize: 10,
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});