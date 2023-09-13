const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AddingPost from "./screens/AddingPost";
import AppNavigator from "./components/Navigator";
import IOSBottomBar5Tabs from "./components/IOSBottomBar5Tabs";
import AnnouncementPost from "./screens/AnnouncementPost";
import CreatePost from "./screens/CreatePost";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity, Button } from "react-native";

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  return <AppNavigator />;
};
export default App;
