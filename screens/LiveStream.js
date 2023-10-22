import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Appbar } from 'react-native-paper';

const LiveStream = ({ navigation }) => {
  return (
      <View style={styles.container}>
        <Appbar.Header style={{ backgroundColor: '#72E6FF' }}>
          <View style={styles.customBackAction}>
            <Appbar.BackAction
              onPress={() => {
                console.log('Going back');
                navigation.goBack();
              }}
            />
          </View>
          <View style={styles.appbarTitleContainer}>
            <Text style={styles.appbarTitle}>LiveStream</Text>
          </View>
        </Appbar.Header>
      </View>
  )
}

export default LiveStream

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9EFF7',
    height: '100%'
  },
  customBackAction: {
    marginLeft: -10, // Adjust the back action position if needed
  },

})