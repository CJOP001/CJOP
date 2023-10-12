import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { LowerLoginContainer, StyledDetailsLabel, Colors, 
    SignInText, UpperLoginContainer, LoginContainer, LoginLogo, LoginDetails, 
    StyledFormArea, LoginTitle, LoginInfo, StyledDetailsInput, 
    SignInButton, ExtraText,TextLink, TextLinkContent, ExtraView } from "../components/styles";
import { Formik } from "formik";
import { View } from "react-native";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

const {darkLight} = Colors;

const Login = ({navigation}) => {
    return (
    
        <KeyboardAvoidingWrapper>
            <StatusBar style="dark"/>
        <UpperLoginContainer>
        <LoginLogo resizeMode="cover" source={require('../assets/login_splashart.png')}/>  
       
        </UpperLoginContainer>
        <LowerLoginContainer>
        <LoginTitle>Welcome Back!</LoginTitle>
        <LoginInfo>I am happy to see you again. You can continue where you left off by logging in</LoginInfo>
            <LoginDetails>
                <Formik 
                initialValues={{country_code: '', phone_number: ''}}
                    onSubmit={(values) => {console.log(values);
                        navigation.navigate('Verification');

                    }}
                    >
                        {({handleChange, handleBlur, handleSubmit, values}) => 
                            (<StyledFormArea>
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
                                <SignInButton onPress={handleSubmit}>
                <SignInText >
                    Sign In
                </SignInText>
            </SignInButton>
            <ExtraView>
                <ExtraText>Don't have an account?</ExtraText>
                <TextLink onPress={() => navigation.navigate("SignUp")}>
                    <TextLinkContent > Sign Up</TextLinkContent>
                </TextLink>
            </ExtraView>
                            </StyledFormArea>)}
                    </Formik>
            </LoginDetails>
            
        </LowerLoginContainer>
        </KeyboardAvoidingWrapper>

    );
};

const PhoneInput = ({label, ...props}) => {
    return (
        <View style={{marginTop:30 }}>
            <StyledDetailsLabel>{label}</StyledDetailsLabel>
            <StyledDetailsInput {...props} />
        </View>
    )
}


export default Login;



