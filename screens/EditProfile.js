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



const EditProfile = ({route, navigation}) => {
  const [userdata, SetUser] = useState([]);
  const [followers, SetFollowers] = useState([]);
  const [following, SetFollowing] = useState([]);
  const [file, setFile] = useState();
  const [fileB, setFileB] = useState();
  const [newname, changeName] = useState();
  const [newdesc, changeDesc] = useState();
  const [newproflink, changeProfLink] = useState();
  const [newbacklink, changeBackLink] = useState();
  const [selectedBackgroundImage, setSelectedBackgroundImage] = useState();
   const [clearBackground, setClearBackground] = useState(false);

  //change USERID to obtain itself from the previous page
   const { userID } = route.params;


    useEffect(() => {
       getData();
       getFollowers();
       getFollowing();
     }, [userID]);


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

       setSelectedBackgroundImage(null);
       setClearBackground(null);

     // Launch the image library
     let result = await ImagePicker.launchImageLibraryAsync({
       base64: true,
       mediaTypes: ImagePicker.MediaTypeOptions.Images,
       allowsEditing: true,
       aspect: [4, 3],
       quality: 1,
     });

     // If the result is obtained
     if (result) {
       const filename = `/Backgrounds/${userID}-background.jpg`;
       const { data, error } = await supabase.storage
         .from("UserImage")
         .upload(filename, decode(result.assets[0].base64), {
           contentType: "image/png",
           upsert: true,
         });
       if (error) {
         console.log("Something went wrong!");
       } else {
         console.log("Uploaded!");
         const imageURL =
           "https://imbrgdnynoeyqyotpxaq.supabase.co/storage/v1/object/public/UserImage" +
           filename;
         setSelectedBackgroundImage(imageURL);
       }
     }
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
  }, [userID]);

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: "#72E6FF" }}>
        <View style={styles.customBackAction}>
          <Appbar.BackAction
            onPress={() => {
              console.log("Going back");
              navigation.goBack();
            }}
          />
        </View>
        <Appbar.Content title="Edit Profile" style={styles.appContent} />
      </Appbar.Header>
      {userdata.map((userdata) => (
        <View key={userdata.id} style={styles.mainContainer}>
          <Card mode="outlined" style={styles.profile}>
            <Card.Cover
              source={{ uri: selectedBackgroundImage || userdata[0]?.background_image }}
              style={styles.coverImage}
              onTouchStart={uploadBackground}
              //onTouchStart={uploadBackground() => setClearBackground(true)}
            />
            <View style={styles.avatarContainer}>
              <Avatar.Image
                source={{ uri: userdata.user_image }}
                size={150}
                style={styles.profileimage}
                onTouchStart={uploadAvatar}
              />
            </View>
            <View style={styles.textContainer}>
              <Card.Content style={styles.cardContent}>
                <TextInput
                  editable
                  style={styles.username}
                  onChangeText={changeName}
                  defaultValue={userdata.fullname}
                  keyboardType="default"
                />
                <Text style={styles.handle}>@{userdata.nameid}</Text>
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
              <Card.Content style={styles.cardContent}>
                <View style={styles.containerCalander}>
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
              <Card.Content style={styles.cardContent}>
                <Text style={styles.followText}>
                  Following: {following} | Followers: {followers}
                </Text>
              </Card.Content>
            </View>
            <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={submit}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </Pressable>
             </View>
          </Card>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  mainContainer: {
    width: "100%", // Adjust the width as needed
  },
  customBackAction: {
    marginLeft: -10,
  },
  appContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  profile: {
    alignItems: "center",
  },
  coverImage: {
    height: 130,
    minWidth: "100%",
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: -5,
    marginBottom: -15,
    paddingBottom: -5,
  },
  profileimage: {
    alignItems: "center",
    marginTop: 15,
    marginBottom: -5,
    paddingBottom: -5,
  },
  textContainer: {
    margin: 5,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 80,
  },
  cardContent: {
    marginVertical: 10,
    alignItems: "center",
  },
  icon: {
    height: 20,
    width: 20,
    marginRight: 20,
  },
  containerCalander: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
      marginTop: -110, // Adjust the value as needed to move the button up
      alignItems: "center",
      paddingBottom: 35,
    },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#72E6FF",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
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
  handle: {
    marginBottom: 10,
  },
  followText: {
    marginBottom: 30,
    alignItems: "center",
  },
});

export default EditProfile;