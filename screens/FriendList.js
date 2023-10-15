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
import { friends } from "../components/Friends";
import ArticleCard from "../components/ArticleCard";

const renderItem = ({ item }) => {
  return <ArticleCard {...item} />;
};

function sortFollowing() {}

function sortFollowers() {}

function sortPeople() {}

const FriendsList = () => {
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
        <Appbar.Content title="Manage Friends" style={styles.appContent} />
      </Appbar.Header>
      <View>
        <Card mode="outlined" style={styles.FriendsList}></Card>
        {/*Search Bar */}
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
        />

        {/*Tabs*/}
        <Card.Title
          left={(props) => (
            <Button
              title="Following"
              mode="contained"
              onPress={() => sortFollowing()}
              labelStyle={{ fontSize: 21, color: "white" }}
              style={{
                transform: [{ translateX: -60 }],
              }}
            />
          )}
          center={(props) => (
            <Button
              title="Followers"
              mode="contained"
              onPress={() => sortFollowers()}
              labelStyle={{ fontSize: 21, color: "white" }}
              style={{
                transform: [{ translateX: -60 }],
              }}
            />
          )}
          right={(props) => (
            <Button
              title="People"
              mode="contained"
              onPress={() => sortPeople()}
              labelStyle={{ fontSize: 21, color: "white" }}
              style={{
                transform: [{ translateX: -60 }],
              }}
            />
          )}
        />
        {/*List*/}
        <View style={{ alignItems: "left", padding: 15, width: "100%" }}>
          <FlatList
            data={friends}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ListItem
                roundAvatar
                title={$item.nickname}
                subtitle={item.name}
                avatar={{ uri: item.picture.thumbnail }}
              />
            )}
          />
        </View>
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
});
