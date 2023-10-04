import React from "react";
import { StatusBar } from 'expo-status-bar';
import { LowerSignUpContainer, SignUpDetailsLabel, Colors, 
    SignInText, UpperSignUpContainer, SignUpContainer, SignUpLogo, LoginDetails, 
    SignUpContinue, StyledFormArea, SignUpTitle, SignUpInfo, SignUpDetailsInput, 
    SignUpButton, ExtraText,TextLink, TextLinkContent, ExtraView } from "../components/styles";
import { Formik } from "formik";
import { View } from "react-native";

const {darkLight} = Colors;

const SignUp = () => {
    return (
    
        <SignUpContainer>
            <StatusBar style="dark"/>
        <UpperSignUpContainer>
        <SignUpLogo resizeMode="cover" source={require('../assets/signup_splashart.png')}/>  
        
        </UpperSignUpContainer>
        <LowerSignUpContainer>
        <SignUpTitle>Welcome to CJOP</SignUpTitle>
        <SignUpInfo>Become a journalist in your own right. Sign up below to begin your journalist's journey.</SignUpInfo>
            <LoginDetails>
                <Formik 
                initialValues={{phone_number: '', username: ''}}
                    onSubmit={(values) => {console.log(values);
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
                                <UsernameInput 
                                label="Username"
                                placeholder="eg. Titanfall#456"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                                pattern="^(\+?6?01)[02-46-9]-*[0-9]{7}$|^(\+?6?01)[1]-*[0-9]{8}$"
                            />
                            <SignUpButton onPress={handleSubmit}>
                <SignInText>
                    Sign Up
                </SignInText>
            </SignUpButton>
            <ExtraView>
                <ExtraText>Already have an account?</ExtraText>
                <TextLink>
                    <TextLinkContent> Log in</TextLinkContent>
                </TextLink>
            </ExtraView>
                        </StyledFormArea>)}
                    </Formik>
            </LoginDetails>
            <SignUpContinue>
            
            </SignUpContinue>
        </LowerSignUpContainer>
        </SignUpContainer>

    );
};

const PhoneInput = ({label, ...props}) => {
    return (
        <View>
            <SignUpDetailsLabel>{label}</SignUpDetailsLabel>
            <SignUpDetailsInput {...props} />
        </View>
    )
}

const UsernameInput = ({label, ...props}) => {
    return (
        <View>
            <SignUpDetailsLabel>{label}</SignUpDetailsLabel>
            <SignUpDetailsInput {...props} />
        </View>
    )
}

export default SignUp;