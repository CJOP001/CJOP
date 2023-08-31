import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Appbar, useTheme } from 'react-native-paper';

const Payment = () => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Appbar.Header style={{backgroundColor: theme.colors.primary}} >
        <Appbar.BackAction onPress={() => {console.log('go back')}} />
        <Appbar.Content title="Walletccc"/>
      </Appbar.Header>
      <Text>
        Wallet
      </Text>
    </View>
  );
}

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 30,
  },
});
