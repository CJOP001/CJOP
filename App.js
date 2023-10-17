import React from 'react';
import AppNavigator from './components/Navigator';
import 'react-native-gesture-handler';

import { AppRegistry } from 'react-native';

export default function App() {

  AppRegistry.registerComponent('CJOP', () => PaymentModal);

  return (

      <AppNavigator/>

  );
}
