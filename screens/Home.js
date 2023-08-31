import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';


const Home = () => {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="TabHome" ></Appbar.Content>
      </Appbar.Header>

      <Text style={styles.text}>Home</Text>

      


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 30,
  },
});

export default Home;