import styled from 'styled-components';
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


//welcome components
export const WelcomeContainer = styled.View`
    flex: 1;
    padding: 10px;
    padding-top: ${StatusBarHeight + 50}px;
    alignItems: center;
    padding-bottom: 40px;
`;

export const InnerWelcomeContainer = styled.View`
width: 100%;
alignItems: center; 
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
padding-left: 3px;
padding-right: 3px;
padding-bottom: 50px;
text-align: center;
background: #72E6FF;
border-radius: 20px;
margin-top: 20px;
align-items: center;
`
export const ButtonText = styled.Text`
height: 40px;
padding-top: 2px;
padding-top: 0px;
padding-bottom: 3px; 
text-align: center;
font-family: 'Roboto';
font-style: normal;
font-size: 34px;
color: #FFFFFF;
`;


//Login components
export const LoginContainer = styled.KeyboardAvoidingView`
flex: 6;
padding-top: ${StatusBarHeight + 50}px;
`;

export const UpperLoginContainer = styled.View`
flex: 3;
padding-top: 70px;
`;

export const LowerLoginContainer = styled.View`
flex: 3;
width: 100%;
padding-top: 0px;
alignItems: center;  
padding-bottom: 10px;
margin: auto;
`;

export const LoginDetails = styled.View`
flex: 1;
flex-direction: row;
position: static;

`;

export const SignInButton = styled.TouchableOpacity`
width: 50%;
height: 15px;
padding: 10px;
padding-top: 10px;
padding-left: 50px;
padding-right: 50px;
padding-bottom: 35px;
background: #72E6FF;
border-radius: 12px;
margin-top: 10px;
`;

export const SignInText = styled.Text`
height: 30px;
justify-content: center;
padding-top: 2px;
padding-bottom: 5px; 
padding-right: 1px;
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
padding-left: 15px;
`;

export const LoginInfo =styled.Text`
font-size: 16px;
font-family: 'Roboto';
text-align: left;
padding-left: 15px;
padding-right: 20px;
color: #7C82A1;
`;

export const StyledDetailsInput =styled.TextInput`
padding: 10px;
font-size: 16px;
color: ${tertiary};
border-radius: 10px;
width: 90%;
height: 60px;
text-align: left;
padding-left: 10px;
padding-right: 35px;
flex: none;
border: 2px ${secondary};
margin-bottom: 35px;
`;

export const StyledDetailsLabel =styled.Text`
color: ${tertiary};
font-size: 15px;
padding-top: 20px;
padding-left: 10px;
padding-bottom: 10px;
text-align: left;
`;


//SignUp components
export const SignUpContainer = styled.View`
flex: 6;
padding-top: ${StatusBarHeight + 50}px;
`;

export const UpperSignUpContainer = styled.View`
flex: 2;
padding-top: 30px;
align-items: center;
margin-bottom: 20px;
`;

export const LowerSignUpContainer = styled.View`
flex: 4;
width: 100%;
alignItems: center;  
margin-top: 20px;
`;


export const SignUpButton = styled.TouchableOpacity`
width: 50%;
height: 20px;
padding: 20px;
padding-top: 10px;
padding-left: 50px;
padding-right: 50px;
padding-bottom: 35px;
background: #72E6FF;
border-radius: 12px;
align-items: center;
margin-top: 10px;
`;

export const SignUpText = styled.Text`
height: 30px;
justify-content: center;
padding-bottom: 5px; 
padding-right: 1px;
text-align: center;
font-family: 'Roboto';
font-style: normal;
font-size: 18px;
color: #FFFFFF;
`;

export const SignUpLogo = styled.Image`
    width: 90%;
    height: 300px;
`;

export const SignUpTitle =styled.Text`
font-size: 24px;
font-family: 'Roboto';
letter-spacing: 0px;
text-align: left;
padding-top: 60px;
padding-right: 180px;
`;

export const SignUpDetailsInput =styled.TextInput`
font-size: 16px;
color: ${tertiary};
border-radius: 10px;
width: 70%;
height: 50px;
text-align: left;
padding-left: 10px;
padding-right: 30px;
flex: none;
border: 2px ${secondary};
margin-bottom: 10px;
margin-top: 5px;
`;

export const SignUpDetailsLabel =styled.Text`
color: ${tertiary};
padding-top: 10px;
padding-left: 10px;
padding-right: 20px;
text-align: center;
`;

export const SignUpInfo =styled.Text`
font-size: 16px;
font-family: 'Roboto';
text-align: left;
padding-left: 20px;
padding-right: 20px;
color: #7C82A1;
`;



//verification component
export const VerificationContainer = styled.Pressable`
    flex: 5;
    padding-top: ${StatusBarHeight + 50}px;
    align-items: center;
    `;

export const UpperVerificationContainer = styled.View`
    flex: 2;
    padding-top: 40px;
    width: 100%;
`;

export const LowerVerificationContainer = styled.View`
flex: 3;
width: 90%;
padding-top: 0px;
alignItems: center;  
padding-bottom: 10px;
`;

export const VerificationLogo = styled.Image`
    width: 70%;
    height: 110%;
    margin: auto;    
`;

export const VerificationTitle =styled.Text`
font-size: 24px;
font-family: 'Roboto';
letter-spacing: 0px;
text-align: left;
line-height: 32px;
padding-top: 10px;
padding-right: 160px;
`;

export const HiddenTextInput = styled.TextInput`
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
`;

export const VerificationInput = styled.View`
    justify-content: center;
    align-items: center;
    margin-vertical: 30px;
`;

export const VerificationPressable = styled.Pressable`
width: 70%;
flex-direction: row;
justify-content: space-around;
`;

export const OTPInput = styled.View`
    background-color: #F3F4F6;
    min-width: 15%;
    border-radius: 10px;
    padding: 15px;
`;

export const VerificationText = styled.Text`
    font-size: 22px;
    text-align: center;
    color: #333647;
`;

export const OTPInputFocused = styled(OTPInput)`
    background-color: #7188FF;
`;

export const VerifyButton = styled.TouchableOpacity`
padding: 15px;
background-color: #72E6FF;
justify-content: center;
align-items: center;
border-radius: 10px;
margin-vertical: 5px;
height: 60px;
width: 50%;
`;

export const VerifyText = styled.Text`
font-family: 'Roboto';
font-size: 22px;
margin: auto;
color: #FFFFFF;
`;

export const VerificationInfo =styled.Text`
font-size: 16px;
font-family: 'Roboto';
text-align: left;
padding-left: 20px;
padding-right: 20px;
color: #7C82A1;
`;




//shared component between login and signup
export const StyledFormArea =styled.View`
    width: 90%;
    align-items: center;
    margin: auto;
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

