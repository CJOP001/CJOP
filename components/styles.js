import styled from 'styled-components';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import  Constants from 'expo-constants';

const StatusBarHeight = Constants.StatusBarHeight;

// colors
export const Colors = {
    primary: "#ffffff",
    secondary: "#E5E7EB",
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
    padding-top: ${StatusBarHeight + 50}px;


    `;

export const UpperLoginContainer = styled.View`
    flex: 3;
    padding-top: 90px;

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

export const LoginDetails = styled.View`
    flex: 1;
    flex-direction: row;
`;

export const Continue = styled.View`
    flex: 1;
    padding-top: 20px;
    padding-left: 10px;

`;



export const PageLogo = styled.Image`
    width: 160px;
    height: 315px;
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

export const SignInButton = styled.TouchableOpacity`

width: 70%;
height: 5%;
padding: 20px;
align-items: center;
padding-top: 10px;
padding-left: 50px;
padding-right: 50px;
padding-bottom: 35px;
background: #72E6FF;
border-radius: 12px;
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

export const SignInText = styled.Text`

width: 40%;
height: 30px;
justify-content: center;
padding-top: 2px;
padding-bottom: 5px; 
padding-left: 30px;
padding-right: 30px;
text-align: center;
font-family: 'Roboto';
font-style: normal;
font-size: 18px;


color: #FFFFFF;
`;

export const LoginLogo = styled.Image`
    width: 80%;
    height: 115%;
    margin: auto;

    
    
`;

export const LoginTitle =styled.Text`
font-size: 24px;
font-family: 'Roboto';
letter-spacing: 0px;
text-align: left;
padding-top: 60px;
padding-left: 20px;
`;

export const LoginInfo =styled.Text`
font-size: 16px;
font-family: 'Roboto';
text-align: left;
padding-left: 20px;
color: #7C82A1;
`;

export const StyledFormArea =styled.View`
    width: 90%;
`;

export const StyledDetailsInput =styled.TextInput`
padding: 10px;
font-size: 16px;
color: ${tertiary};
border-radius: 10px;
width: 70%;
height: 40%;
text-align: left;
padding-left: 30px;
flex: none;
border: 2px ${secondary};
`;

export const StyledDetailsLabel =styled.Text`
color: ${tertiary};
font-size: 15px;
padding-top: 30px;
padding-left: 10px;
padding-bottom: 10px;
text-align: left;
`;

export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding-top: 10px;
`;

export const ExtraText = styled.Text`
    justify-content: center;
    align-content: center;
    color: ${tertiary};
    font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
justify-content: center;
align-content: center;
    `;

    export const TextLinkContent = styled.Text`
    color: #800080;
    font-size: 15px;
    `;
