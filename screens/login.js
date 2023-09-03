import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { StyledContainer, InnerContainer, PageLogo, PageTitle, StyledButton, ButtonText } from "../components/styles";


const Login = () => {
    return (
    
        <StyledContainer>
            
            <InnerContainer>
            <ImageBackground source={require('../assets/welcome_background.png')} resizeMode="stretch" style={styles.image}>
            <PageLogo resizeMode="cover" source={require('../assets/welcome_splashart.png')}/>  

            </ImageBackground>
            </InnerContainer>
            <PageTitle>Take Down Anything You See</PageTitle>

            <StyledButton>
                <ButtonText>
                    Get Started
                </ButtonText>
            </StyledButton>
        </StyledContainer>

    );
}

const styles = StyleSheet.create({
    image: {
    
      paddingLeft: 290,
      paddingTop: 130,
      paddingBottom: 30,
      height: 400,
      width: 800

    }
});

export default Login;