import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppNavigator from './navigation/Navigator';
import 'react-native-gesture-handler';

import { AppRegistry } from 'react-native';
import PaymentModal from './screens/Payment_Modal';


// Define your custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#72E6FF",
    },
    // You can define other palette properties here
  },
  // Other theme properties like typography, spacing, etc.
});

export default function App() {

  AppRegistry.registerComponent('CJOP', () => PaymentModal);
  
  return (
    <ThemeProvider theme={theme}>
      <AppNavigator/>
    </ThemeProvider>
  );
}
