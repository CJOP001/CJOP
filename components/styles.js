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



export const WelcomeContainer = styled.View`
    flex: 1;
    padding: 10px;
    padding-top: ${StatusBarHeight + 50}px;
    alignItems: center;
   
    padding-bottom: 40px;

  
`;

export const LoginContainer = styled.View`
    flex: 6;
    position: "absolute";

    `;

export const UpperLoginContainer = styled.View`
    flex: 3;
    alignItems: center;
    padding-top: 10px;

`;

export const InnerWelcomeContainer = styled.View`
width: 100%;
alignItems: center; 
`;

export const LowerLoginContainer = styled.View`
flex: 3;
width: 100%;
padding-top: 0px;
alignItems: center;  
padding-bottom: 10px;

`;



export const PageLogo = styled.Image`
    width: 160px;
    height: 315px;
    alignItems: center;
    padding-top: 10px;
    padding-bottom: 10px;
`;

export const PageTitle = styled.Text`
    font-size: 36px;
    text-align: left;
    font-weight: bold;
    alignItems: center;
    color: ${brand};
    padding-top: 50px;
    padding-bottom: 20px;
`;

export const StyledButton = styled.TouchableOpacity`

width: 70%;
height: 5%;
padding-top: 5px;
padding-left: 53px;
padding-right: 53px;
padding-bottom: 50px;
text-align: center;
background: #72E6FF;
border-radius: 20px;
`

export const ButtonText = styled.Text`

width: 270px;
height: 40px;
padding-top: 2px;
padding-right: 98px;
padding-top: 0px;
padding-bottom: 3px; 
text-align: center;
font-family: 'Roboto';
font-style: normal;
font-size: 34px;


color: #FFFFFF;

`;

export const LoginLogo = styled.Image`
    width: 80%;
    height: 100%;
    padding-top: 20px;
    padding-bottom: 50px;
    
    
`;