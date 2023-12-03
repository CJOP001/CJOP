import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { Appbar, Avatar, Card } from "react-native-paper";
import ArticleCard from "../../components/ArticleCard";
import supabase from "../../supabase/supabase";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelfProfile = ({ navigation }) => {
  const [userdata, setUserData] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const initializeData = async () => {
      try {
        // Fetch user ID from async storage
        const storedUserID = await AsyncStorage.getItem('uid');
        console.log('UserID:', storedUserID);

        if (storedUserID) {
          // Set the retrieved user ID to the state variable
          setUserID(storedUserID);

          // Use the retrieved user ID for subsequent operations
          await getData(storedUserID);
          await getFollowers(storedUserID);
          await getFollowing(storedUserID);
          await fetchArticles(storedUserID);
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

  const getData = async (userID) => {
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
    setUserData(data);
  };

  const fetchArticles = async (userID) => {
    try {
      const { data, error } = await supabase
        .from('news_management')
        .select('*')
        .eq('user_id', userID)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      } else {
        setArticles(data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getFollowing = async (userID) => {
    const { data, error, count } = await supabase
      .from("friends")
      .select(`user_id`, `friend_id`, { count: "exact", head: true })
      .eq("user_id", userID);
    setFollowing(data.length);
  };

  const getFollowers = async (userID) => {
    const { data, error, count } = await supabase
      .from("friends")
      .select(`user_id`, `friend_id`, { count: "exact", head: true })
      .eq("friend_id", userID);
    setFollowers(data.length);
  };

  const renderItem = ({ item }) => {
    return <ArticleCard {...item} />;
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        {/* Header Section */}
        <Appbar.Header style={styles.profile}>
          <View style={styles.customBackAction}>
            <Appbar.BackAction
              onPress={() => {
                console.log("Going back");
                navigation.goBack();
              }}
            />
          </View>
          {/* Title Bar */}
          <Appbar.Content title="Your Profile" style={styles.appContent} />
        </Appbar.Header>
        {userdata.map((userdata) => (
          <View key={userdata.id}>
            {/* Profile Background */}
            <Card mode="outlined" style={styles.profile}>
              <Card.Cover
                source={{ uri: userdata.background_image }}
                style={{ height: 150, minWidth: "100%" }}
              />
              {/* Profile Image */}
              <Card.Title
                left={(props) => (
                  <Avatar.Image
                    source={{
                      uri: userdata.user_image,
                    }}
                    size={80}
                    style={{ transform: [{ translateY: -40 }] }}
                  />
                )}
                right={(props) => (
                  <Pressable
                    style={styles.button}
                    onPress={() => navigation.navigate("EditProfile", { userID: userdata.id })}
                  >
                    <Text style={styles.buttonText}>Edit Profile</Text>
                  </Pressable>
                )}
              />
              <Card.Content
                style={{ margin: 10, transform: [{ translateY: -30 }] }}
              >
                <Text style={styles.fullName}>{userdata.fullname}</Text>
                <Text style={styles.username}>@{userdata.nameid}</Text>
                <Text style={styles.description}>{userdata.description}</Text>
              </Card.Content>
              <Card.Content>
                <View style={styles.container}>
                  <Image
                    source={require("../../assets/calendar-icon.png")}
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
                style={{ transform: [{ translateX: 20 }], flexDirection: "row" }}
              >
                <Text style={styles.followText}>
                  Following: {following} | Followers: {followers}
                </Text>
              </Card.Content>
            </Card>
            {/* List of articles */}
            <View style={styles.articleContainer}>
              {loading && <Text>Loading...</Text>}
              {error && <Text>Error: {error}</Text>}
              <FlatList
                data={articles}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  customBackAction: {
    marginLeft: -10, // Adjust the back action position if needed
  },
  appContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  profile: {
    margin: 10,
    borderRadius: 10,
    elevation: 3,
  },
  icon: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 25,
    elevation: 3,
    backgroundColor: "#72E6FF",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  fullName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  username: {
    color: "#666",
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    marginTop: 5,
    color: "#555",
  },
  articleContainer: {
    paddingHorizontal: 10,
  },
  followText: {
    fontSize: 16,
    color: "#555",
  },
});

export default SelfProfile;