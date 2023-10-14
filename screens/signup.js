import {React, useEffect, useState} from "react";
import supabase from "../supabase/supabase";
import { StatusBar } from 'expo-status-bar';
import { Colors} from "../components/styles";
import { Formik } from "formik";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import { View, Image, StyleSheet, Text, TouchableOpacity, TextInput  } from "react-native";

const {darkLight} = Colors;

const SignUp = ({navigation}) => {

    const [fetchError, setFetchError] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState(null)

    const phone_number = useState("")

    useEffect(() => {
    const fetchPhoneNumber = async () => {
        const {data, error} = await supabase
        .from('app_users')
        .select('phone_no')
        .single(phone_number)

        if (error) {
            setFetchError('Data retrieval fail.')
            setPhoneNumber(null)
            console.log(error)
        }
        if (data)
        {
            setPhoneNumber(data)
            setFetchError(null)
        }

    }   
    fetchPhoneNumber()   
    }, [])
    return (
        <KeyboardAvoidingWrapper>   
            <StatusBar style="dark"/>
        <View style={styles.UpperSignUpContainer}>
        <Image style={styles.SignUpLogo} resizeMode="cover" source={require('../assets/signup_splashart.png')}/>  
        
        </View>
        <View style={styles.LowerSignUpContainer}>
        <Text style={styles.SignUpTitle}>Welcome to CJOP</Text>
        <Text style={styles.SignUpInfo}>Become a journalist in your own right. Sign up below to begin your journalist's journey.</Text>
                <Formik 
                initialValues={{phone_number: '', username: ''}}
                    onSubmit={(values) => {console.log(values);
                        navigation.navigate('Verification');
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
                                    pattern="^(\+?6?01)[02-46-9]-*[0-9]{7}$|^(\+?6?01)[1]-*[0-9]{8}$"
                                />
                                
                                <UsernameInput 
                                label="Username"
                                placeholder="eg. Titanfall#456"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                                pattern="^(\+?6?01)[02-46-9]-*[0-9]{7}$|^(\+?6?01)[1]-*[0-9]{8}$"
                            />
                            </View>
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
    paddingBottom: 20
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
    alignItems: "center",
    paddingLeft: 10,
    justifyContent: "center"    
},
SignUpInput: {
    flexDirection: "row"
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
    marginLeft: 30
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
    paddingBottom: 10,
    paddingRight: 20,
    textAlign: "left",
    fontSize: 15,
    marginTop: 20,
    marginLeft: 10
},
SignUpDetailsInput: {
    padding: 8,
    fontSize: 15,
    color: Colors.tertiary,
    borderRadius: 10,
    width: "100%",
    height: 40,
    textAlign: "left",
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 2,
    borderColor: Colors.secondary,
    marginBottom: 10,
    marginLeft: 10
}
});

export default SignUp;