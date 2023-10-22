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
import { fcategories } from "../components/friendlist";
import { dummyFriends } from "../components/Friends";
import ArticleCard from "../components/ArticleCard";

const FriendsList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("Following");

  const onChangeSearch = (query) => {
    // Update the search query state
    setSearchQuery(query);
  };

  const [peopleList] = useState(dummyFriends);

  // Filter people based on the selected category
  const filteredPeople = selectedCategory
    ? peopleList.filter((people) => people.state === selectedCategory)
    : peopleList;

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
        {/*Search Bar */}

        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
        />

        {/*Tabs*/}
        <Card style={styles.buttonTab}>
          <Card.Title>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoryScrollView}
            >
              {fcategories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    category === selectedCategory
                      ? styles.selectedCategoryButton
                      : null,
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      category === selectedCategory
                        ? styles.selectedCategoryButtonText
                        : null,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Card.Title>

          {/*List*/}
          <View style={{ alignItems: "left", padding: 15, width: "100%" }}>
            <FlatList
              data={dummyFriends}
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
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 30,
    marginRight: 10,
    backgroundColor: "#f0f0f0",
  },
  selectedCategoryButton: {
    backgroundColor: "#72E6FF",
  },
  categoryButtonText: {
    color: "#333", // Change the text color here
  },
  selectedCategoryButtonText: {
    color: "#fff", // Change the text color for selected category here
  },
});
