import AppNavigator from "./navigation/Navigator";
import{Provider, DefaultTheme} from 'react-native-paper';

export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "#72E6FF",  
      secondary: 'yellow',
    },
  };
  return(
  <Provider theme={theme}>
    <AppNavigator/>
  </Provider>
  );
}


