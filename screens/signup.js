import {React, useEffect, useState} from "react";
import supabase from "../supabase/supabase";
import { StatusBar } from 'expo-status-bar';
import { Colors} from "../components/styles";
import { Formik } from "formik";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import { View, Image, StyleSheet, Text, TouchableOpacity, TextInput  } from "react-native";


const {darkLight} = Colors;

const SignUp = ({navigation}) => {
    

    var tempPhone = "";
    var tempUser = "";
    var tempId = "";
    var tempError = false;

        const CheckExistingProfile = async () => {
        
        tempId = trimString(tempId);
        tempId = ToLowerCase(tempId);
        try
        {
                const {data, error} = await supabase
                    .from('app_users')
                    .select('nameid')
                    .eq('nameid', tempId);

                    if(data == "")
                    {   
                        console.log("adding new user.....")
                        tempError = false;
                        SignUpUser();
                        
                        
                    }
                    else if(data != "")
                    {
                        tempError = true;
                        console.log(data);
                        console.log("duplicate profile name found, pls start again");
                    }
                    else if(error)
                    {
                        console.log(error);
                    }
          }
    catch (error)
    {
        console.log(error);
    }
}

const trimString = (tempId) => 
{
    let string = tempId.split(" ").join("");
    return string;
}

const ToLowerCase = (tempId) =>
{
    let lowerCaseText = tempId.toLowerCase();
    return lowerCaseText;
}

const AddNewUser= async() =>
{
    console.log(tempError);
                        const {reply, error} = await supabase
                            .from('app_users')
                            .insert({'fullname':  tempUser,
                                    'phone_no': tempPhone,
                                    'nameid': tempId,
                                    //user_id: 
                                    'status': 'Active'})
                        if(error)
                        {
                            console.log(error, "unsuccessful insert");
                        }
                         else{              
                            console.log("successful insert");
                            SendOTP();
                            
                    }
}

const SignUpUser = async() =>
{
    try
    {const { data, error } = await supabase.auth.signUp({
        phone: tempPhone,
        password: 'testing',
      })
      if(error)
      {
        throw(error);
      }
    else
    {
        console.log("successful signup, sending OTP......")
        AddNewUser();
        
    }
}
    catch(error)
{
    console.log(error, "unsuccessful signup");

}
}

const SendOTP = async() => 
{
    const {data, error} = await supabase.auth.signInWithOtp({
        phone: tempPhone,
        })
            if(error)
            {
                console.log(error, "No such number register with Twilio")
            }
            else if(data)
            {
            console.log("correct number inputted, redirecting to verification......")
            navigation.navigate('Verification', {phone: tempPhone,})
            }
}
    return (
        <KeyboardAvoidingWrapper>   
            <StatusBar style="dark"/>
        <View style={styles.UpperSignUpContainer}>
        <Image style={styles.SignUpLogo} resizeMode="cover" source={require('../assets/signup_splashart.png')}/>  
        </View>
        <View style={styles.LowerSignUpContainer}>
        <Text style={styles.SignUpTitle}>Welcome to CJOP</Text>
        <Text style={styles.SignUpInfo}>Sign up below to begin your journalist's journey.</Text>
        
                <Formik 
                initialValues={{phone_number: '', username: '', name_id: ''}}
                    onSubmit={(values) => {console.log(values);
                        tempPhone = values.phone_number;
                        tempUser = values.username;
                        tempId = values.name_id;

                        CheckExistingProfile();
                    }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values}) => 
                            (<View style={styles.StyledFormArea}>
                                <View style={styles.SignUpInput}>
                                <PhoneInput 
                                    label="Phone Number (Malaysia)"
                                    placeholder="eg. +6 XXX-XXX-XXXX"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('phone_number')}
                                    onBlur={handleBlur('phone_number')}
                                    value={values.phone_number}
                                    keyboardType="phone-pad"
                                />
                                
                                <UsernameInput 
                                label="Fullname"
                                placeholder="eg. Titanfall#456"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                                minLength={10}
                                maxLength={50}
                            />
                            </View>
                            <ProfileInput 
                                label="Profile Name"
                                placeholder="eg. Reynold34"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('name_id')}
                                onBlur={handleBlur('name_id')}
                                value={values.name_id}
                                minLength={10}
                                maxLength={50}
                            />
                            <Text style={{ 
                                        opacity: tempError? 1: 0,
                                        fontSize: 15,
                                        fontFamily: 'Roboto',
                                        marginLeft: 15,
                                        color: tempError? "#FF0F0F": "#000000",
                                         }}>A profile name has already exist</Text>
                            
                            <TouchableOpacity style={styles.SignUpButton} onPress={handleSubmit}>
                <Text style={styles.SignUpText}>
                    Sign Up
                </Text>
            </TouchableOpacity>
                        </View>)}
                    </Formik>
                    <View style={styles.ExtraView}>
                <Text style={styles.ExtraText}>Already have an account?</Text>
                    <TouchableOpacity style={styles.TextLink} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.TextLinkContent}> Log in</Text>
                </TouchableOpacity>
            </View>
        </View>
        </KeyboardAvoidingWrapper>
    );
};

const PhoneInput = ({label, ...props}) => {
    return (
        <View style={{marginRight: 20}}>
            <Text style={styles.SignUpDetailsLabel}>{label}</Text>
            <TextInput style={styles.SignUpDetailsInput} {...props} />
        </View>
    )
}

const UsernameInput = ({label, ...props}) => {
    return (
        <View>
            <Text style={styles.SignUpDetailsLabel}>{label}</Text>
            <TextInput style={styles.SignUpDetailsInput} {...props} />
        </View>
    )
}

const ProfileInput = ({label, ...props}) => {
    return (
        <View>
            <Text style={styles.SignUpDetailsLabel}>{label}</Text>
            <TextInput style={styles.SignUpDetailsInput} {...props} />
        </View>
    )
}


const styles = StyleSheet.create({
UpperSignUpContainer: {
    flex: 2,
    alignItems: "center"
},
SignUpLogo: {
    width: "90%",
    height: 300
},
LowerSignUpContainer: {
    flex: 3,
    marginTop: 0,
    justifyContent: "space-around",
    paddingBottom: 30
},
SignUpTitle: {
    padding: 15,
    fontSize: 24,
    fontFamily: 'Roboto',
    textAlign: "left",
    paddingLeft: 20
},
SignUpInfo: {
    fontSize: 16,
    fontFamily: 'Roboto',
    textAlign: "left",
    paddingLeft: 20,
    paddingRight: 20,
    color: "#7C82A1"
},
StyledFormArea: {
    width: "90%",
    alignItems: "left",
    paddingLeft: 10,
    justifyContent: "center"    
},
SignUpInput: {
    flexDirection: "row",
    alignItems: 'left'
},
SignUpButton: {
    width: "50%",
    height: 20,
    padding: 20,
    paddingTop: 10,
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 35,
    backgroundColor: "#72E6FF",
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
    marginLeft: 105
},
SignUpText: {
    height: 30,
    justifyContent: "center",
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
SignUpDetailsLabel: {
    color: Colors.tertiary,
    paddingRight: 20,
    textAlign: "left",
    fontSize: 15,
    marginTop: 10,
    marginLeft: 12
},
SignUpDetailsInput: {
    padding: 8,
    fontSize: 15,
    color: Colors.tertiary,
    borderRadius: 10,
    width: "95%",
    height: 40,
    textAlign: "left",
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 2,
    borderColor: Colors.secondary,
    marginLeft: 10
}

});

export default SignUp;