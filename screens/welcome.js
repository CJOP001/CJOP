import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { WelcomeContainer, InnerWelcomeContainer, PageLogo, PageTitle, StyledButton, ButtonText } from "../components/styles";


const Welcome = ({navigation}) => {
    return (
    
        <WelcomeContainer>
            
            <InnerWelcomeContainer>
            <ImageBackground source={require('../assets/welcome_background.png')} resizeMode="stretch" style={styles.image}>
            <PageLogo resizeMode="cover" source={require('../assets/welcome_splashart.png')}/>  

            </ImageBackground>
            </InnerWelcomeContainer>
            <PageTitle>Take Down Anything You See</PageTitle>

            <StyledButton onPress={() => navigation.navigate("Login")}>
                <ButtonText>
                    Get Started
                </ButtonText>
            </StyledButton>
        </WelcomeContainer>

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

export default Welcome;