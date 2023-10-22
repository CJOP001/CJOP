import React from "react";
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import { Colors } from "../components/styles";


const Welcome = ({navigation}) => {
    return (
    
        <View style={styles.WelcomeContainer}>
            
            <View style={styles.InnerWelcomeContainer}>
            <ImageBackground source={require('../assets/welcome_background.png')} resizeMode="stretch" style={styles.image}>
            <Image style={styles.PageLogo} resizeMode="cover" source={require('../assets/welcome_splashart.png')}/>  

            </ImageBackground>
            </View>
            <Text style={styles.PageTitle}>Take Down Anything You See</Text>

            <TouchableOpacity style={styles.StyledButton} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.ButtonText}>
                    Get Started
                </Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    image: {
    
      paddingLeft: 290,
      paddingTop: 130,
      paddingBottom: 30,
      height: 400,
      width: 800

    },
    WelcomeContainer: {
        flex: 1,
        padding: 10,
        paddingTop: StatusBar.currentHeight,
        alignItems: "center",
        paddingBottom: 40
    },
    InnerWelcomeContainer: {
        width: "100%",
        alignItems: "center"
    },
    PageTitle: {
        fontSize: 36,
        textAlign: "left",
        fontWeight: "bold",
        alignItems: "center",
        color: Colors.brand,
        paddingTop: 50,
        paddingBottom: 10
    },
    StyledButton: {
        width: "70%",
        height: "5%",
        paddingTop: 5,
        paddingLeft: 3,
        paddingRight: 3,
        paddingBottom: 50,
        textAlign: "center",
        backgroundColor: '#72E6FF',
        borderRadius: 20,
        marginTop: 20,
        alignItems: "center"
    },
    ButtonText: {
        height: 40,
        paddingBottom: 3, 
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontSize: 34,
        color: '#FFFFFF'
    },
    PageLogo: {
        width: 160,
        height: 315,
        paddingBottom: 10
    }



});

export default Welcome;