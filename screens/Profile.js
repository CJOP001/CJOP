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

const renderItem = ({ item }) => {
  return <ArticleCard {...item} />;
};
const follow = ({}) => {};
const Profile = () => {
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
        <Appbar.Content title="Profilee" style={styles.appContent} />
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
                source={require("../assets/avatar.png")} /* TODO: Eventually change to depend on database*/
                size={80}
                style={{ transform: [{ translateY: -20 }] }}
              />
            )} /*Edit Profile button*/
            right={(props) => (
              <Button
                title="Follow"
                mode="contained"
                onPress={() => follow()}
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

export default Profile;

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
