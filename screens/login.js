import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { LowerLoginContainer, PageLogo, PageTitle, StyledButton, ButtonText, UpperLoginContainer, LoginContainer, LoginLogo } from "../components/styles";


const Login = () => {
    return (
    
        <LoginContainer>
        <UpperLoginContainer>
        <LoginLogo resizeMode="cover" source={require('../assets/login_splashart.png')}/>  

        </UpperLoginContainer>

        <LowerLoginContainer>

       
        </LowerLoginContainer>
        </LoginContainer>

    );
}

export default Login;