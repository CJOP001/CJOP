import {React,useState} from "react";
import { ImageBackground, StyleSheet, View, Text, Image, StatusBar, TouchableOpacity } from "react-native";
import { Colors } from "../components/styles";
import supabase from "../supabase/supabase";


const AppSplash = ({navigation}) => {
    const [exit, setExit] = useState(true);
    const SignOut = async () =>{
        try {
            const { error} = await supabase.auth.signOut();
            if(error)
            {
                throw error;
            }
            else 
            {
                navigation.navigate('Welcome');
            }
        }
        catch (error)
        {
            console.log(error);
        }
          
    }
    return (
    
        <View style={styles.AppSplashContainer}>
            
            <View style={styles.InnerAppSplashContainer}>
            <ImageBackground source={require('../assets/welcome_background.png')} resizeMode="stretch" style={styles.image}>
            <Image style={styles.PageLogo} resizeMode="cover" source={require('../assets/welcome_splashart.png')}/>  

            </ImageBackground>
            </View>
            <Text style={styles.PageTitle}>Take Down Anything You See</Text>
            <TouchableOpacity style={styles.StyledButton} onPress={SignOut}>
                <Text style={styles.ButtonText}>
                    Sign Out
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
    AppSplashContainer: {
        flex: 1,
        padding: 10,
        paddingTop: StatusBar.currentHeight,
        alignItems: "center",
        paddingBottom: 40
    },
    InnerAppSplashContainer: {
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

export default AppSplash;