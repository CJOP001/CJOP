import React from 'react';
import AppNavigator from './navigation/Navigator';
import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';

export default function App() {

  return (
    <PaperProvider>
      <AppNavigator/>
    </PaperProvider>
  );
}
