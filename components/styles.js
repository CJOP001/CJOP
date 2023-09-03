import styled from 'styled-components';
import {View, Text, Image} from 'react-native';
import  Constants from 'expo-constants';

const StatusBarHeight = Constants.StatusBarHeight;

// colors
export const Colors = {
    primary: "#ffffff",
    secondary: "E5E7EB",
    tertiary: "#1F2937",
    darkLight: "#9CA3AF",
    brand: "#000000",
    green: "#10B981",
    red: "EF4444",
};

const {primary, secondary, tertiary, darkLight, brand, green, red} = Colors;



export const StyledContainer = styled.View`
    flex: 2;
    padding: 10px;
    padding-top: ${StatusBarHeight + 50}px;
    alignItems: center;
   
    padding-bottom: 40px;

  
`;

export const InnerContainer = styled.View`
flex: 1;
width: 100%;
padding-top: 50px;
alignItems: center;  
padding-bottom: 220px;  

`;

export const PageLogo = styled.Image`
    width: 160px;
    height: 315px;
    alignItems: center;
    padding-top: 10px;
    padding-bottom: 10px;
`



export const PageTitle = styled.Text`
    font-size: 36px;
    text-align: left;
    font-weight: bold;
    alignItems: center;
    color: ${brand};
    padding-bottom: 20px;
`;

export const StyledButton = styled.TouchableOpacity`

width: 280px;
height: 66px;
padding-top: 5px;
padding-left: 53px;
padding-right: 53px;
padding-bottom: 50px;
alignItems: center;
text-align: center;
background: #72E6FF;
border-radius: 20px;
`

export const ButtonText = styled.Text`

width: 270px;
height: 40px;
padding-top: 2px;
padding-left: 40px;
padding-right: 40px;
text-align: center;
alignItems: center;
font-family: 'Roboto';
font-style: normal;
font-size: 34px;


color: #FFFFFF;

`