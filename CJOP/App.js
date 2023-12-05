import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler';

export default function App() {

  return (
    <PaperProvider>
      <AppNavigator/>
    </PaperProvider>
  );
}


