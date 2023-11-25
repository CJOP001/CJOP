import React, { useState, useEffect } from "react";
import {View, Image, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { Colors } from "../components/styles";
import { Formik } from "formik";
import supabase from "../supabase/supabase";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import { Alert } from "react-native";



const Login = ({navigation}) => {

    var updatePhone = "";
    

        const fetchPhoneNumber = async () =>{

           try {
                const {data,error} = await supabase 
                                    .from('app_users')
                                    .select('phone_no')
                                    .eq('phone_no', updatePhone);
                if(data.length > 0) 
                {
                    try
                    {
                        const {data, error} = await supabase.auth.signInWithOtp({
                            phone: updatePhone,
                        })
                        if(error)
                        {
                            throw error;
                        }
                        else if(data)
                        {
                            
                            navigation.navigate('Verification', {phone: updatePhone,})
                        }
                    }
                    catch(e)
                    {
                        console.log(e);
                    }
                }
                else{
                    console.log("No phone number registered. Sign up first before logging in.");
                    Alert.alert(
                        'Login error',
                        'Invalid phone number. Sign up first before logging in. For new users, please wait while your phone number is being verified.',
                        [{text: 'Return', style: 'cancel'},],{cancelable: true,} 
                    );
                }
                
            }
            catch (error)
            {
                console.log(error);
            }
              
        }
        

const navigateToHomeScreen = () => {
    navigation.navigate('TabNavigator');
};
    
    return (
    
        <KeyboardAvoidingWrapper>
            <StatusBar style="dark"/>
        <View style ={styles.UpperLoginContainer}>
        <Image style={styles.LoginLogo} resizeMode="cover" source={require('../assets/login_splashart.png')}/>  
       
        </View>
        <View style={styles.LowerLoginContainer}>
        <Text style={styles.LoginTitle}>Welcome Back!</Text>
        <Text style={styles.LoginInfo}>Log in to your account with your phone number.</Text>
                <Formik 
                initialValues={{phone_number: ''}}
                    onSubmit={(values) => { console.log(values);
                        updatePhone  = values.phone_number;
                        fetchPhoneNumber();
                    }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values}) => 
                            (
                            <View style={styles.StyledFormArea}>
                                <PhoneInput 
                                    label="Phone Number (Malaysia)"
                                    placeholder="eg. +6 XXX-XXX-XXXX"
                                    placeholderTextColor={Colors.darkLight}
                                    onChangeText={handleChange('phone_number')}
                                    onBlur={handleBlur('phone_number')}
                                    value={values.phone_number}
                                    keyboardType="phone-pad"
                                    pattern="^[601]([0-9]{8}|[0-9]{9}$"
                                />
                                <TouchableOpacity style={styles.SignInButton} /*onPress={handleSubmit}*/ onPress={navigateToHomeScreen}>
                <Text style={styles.SignInText} >
                    Sign In
                </Text>
            </TouchableOpacity>
            
                            </View>
                            )}
                    </Formik>
                    <View style={styles.ExtraView}>
                <Text style={styles.ExtraText}>Don't have an account?</Text>
                <TouchableOpacity style={styles.TextLink} onPress={() =>  navigation.navigate("SignUp")}>
                    <Text style={styles.TextLinkContent} > Sign Up</Text>
                </TouchableOpacity>
            </View>
            
        </View>
        </KeyboardAvoidingWrapper>

    );
};

const PhoneInput = ({label, ...props}) => {
    return (
        <View style={{marginTop:30 }}>
            <Text style={styles.StyledDetailsLabel}>{label}</Text>
            <TextInput style={styles.StyledDetailsInput} {...props} />
        </View>
    )
}

const styles = StyleSheet.create ({
UpperLoginContainer: {
    flex: 1,
    alignItems: 'center'
},
LowerLoginContainer: {
    flex: 1,
    width: "100%",
    paddingBottom: 20
},
LoginLogo: {
    width: '85%',
    height: 350
},
LoginTitle: {
    fontSize: 24,
    fontFamily: 'Roboto',
    textAlign: "left",
    padding: 15,
    paddingLeft: 15
},
LoginInfo: {
    fontSize: 16,
    fontFamily: 'Roboto',
    textAlign: 'left',
    paddingLeft: 15,
    paddingRight: 20,
    color: "#7C82A1"
},
StyledFormArea: {
    width: "90%",
    alignItems: "center",
    paddingLeft: 10,
    justifyContent: "center"
},
SignInButton: {
    width: "50%",
    height: 15,
    padding: 10,
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 35,
    backgroundColor: "#72E6FF",
    borderRadius: 12,
    marginTop: 10,
    marginLeft: 32
},
SignInText: {
    height: 30,
    justifyContent: "center",
    paddingTop: 2,
    paddingBottom: 5, 
    paddingRight: 1,
    textAlign: "center",
    fontFamily: 'Roboto',
    fontStyle: "normal",
    fontSize: 18,
    color: "#FFFFFF"
},
ExtraView: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    marginBottom: 20
},
ExtraText: {
    justifyContent: "center",
    textAlign: "center",
    color: Colors.tertiary  ,
    fontSize: 15
},
TextLink: {
    justifyContent: "center"
},
TextLinkContent: {
    color: "#800080",
    fontSize: 15
},
StyledDetailsLabel: {
    color: Colors.tertiary,
    paddingBottom: 10,
    paddingRight: 20,
    textAlign: "left",
    fontSize: 15,
    marginLeft: 32
},
StyledDetailsInput: {
    padding: 8,
    fontSize: 15,
    color: Colors.tertiary,
    borderRadius: 10,
    width: "100%",
    height: 40,
    textAlign: "left",
    paddingLeft: 10,
    paddingRight: 40,
    borderWidth: 2,
    borderColor: Colors.secondary,
    marginBottom: 10,
    marginLeft: 32
}




});

export default Login;