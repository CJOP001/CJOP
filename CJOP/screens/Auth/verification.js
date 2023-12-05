import React, {useState, useRef, useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components';
import { Keyboard, Pressable, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import { Alert } from "react-native";
import supabase from "../../supabase/supabase";


const Verification = ({navigation, route}) => {
    var tempPhone = route.params.phone 
    const  [code, setCode] = useState("");
    const [pinReady, setPinReady] = useState("false");
    const pinLength = 6;

    const textInputRef = useRef(null);

    const [inputContainerIsFocused, setInputContainerIsFocused] = useState(false);



    const handleOnPress = () => {
        setInputContainerIsFocused(true);
        textInputRef?.current?.focus();
    };

    const handleOnBlur = () => {
        setInputContainerIsFocused(false);
    };

    useEffect(() => {
        setPinReady(code.length === pinLength);
        return () => setPinReady(false);
    }, [code]);

    const toCodeDigitInput = (value, index) => {
        const emptyInputChar = " "
        const digit = code[index] || emptyInputChar;

        const IsCurrentDigit = index === code.length;
        const isLastDigit = index === pinLength -1;
        const isCodeFull = code.length === pinLength;

        const isDigitFocused = IsCurrentDigit || (isLastDigit && isCodeFull);

        const StyledOTPInput = 
        inputContainerIsFocused && isDigitFocused ? OTPInputFocused : 
        OTPInput;
        
        return (
            <StyledOTPInput key={index}>
                <Text style={styles.VerificationText}>{digit}</Text>
            </StyledOTPInput>
        );
    }
    const resendSMS = async() =>{
        try {
            const {data, error} = await supabase.auth.signInWithOtp({
                phone: route.params.phone,
            });
              if(error)
              {
                throw(error)
              }
              else{
                console.log(data);
              }
        }
        catch(error)
        {
            console.log(error);
        }
    }

    const codeDigitsArray = new Array(pinLength).fill(0);

    
    const retrieveUID = async() => {
        console.log(tempPhone); //shows the number used for id retrieval
        let userID;
        try {
            const {data, error} = await supabase
            .from('app_users')
            .select('id')
            .eq(`phone_no`, tempPhone);
    
            if(data)
            {
                console.log(data[0].id); //shows the id retrieved
                userID = data[0].id;
                AsyncStorage.setItem('uid', userID);
                navigation.navigate('HomeStack');
            }
            else{
                throw(error);
            }
        }
        catch(error) {
            console.log(error, "UID retrieval failed");
        }
    }


    const VerifyOtp = async () => {
        console.log(route.params.phone); //shows the data taken from signup/login
        if(pinReady)
        {
            try {
                const {data, error} = await supabase.auth.verifyOtp({
                    phone: route.params.phone,
                    token: code,
                    type: 'sms',
                })
                if(error)
                {
                    throw(error)
                }
                else{
                    retrieveUID();
                }
            } catch (error)
            {
                console.log(error);
                Alert.alert(
                    'Verification error',
                    'SMS OTP is invalid or has expired. Resend the SMS OTP.',
                    [{text: 'Return', style: 'cancel'},],{cancelable: true,} 
                );
            }
        }
        else{
            console.log("Pin not ready.");
        }
    }

    const handleVerify = () =>
    {
        VerifyOtp();
    }

    return (
        <KeyboardAvoidingWrapper>
            <View style={styles.UpperVerificationContainer}>
             <Image style={styles.VerificationLogo} resizeMode="cover" source={require('../../assets/verification_splashart.png')}/>
            </View>
            <Pressable style={styles.LowerVerificationContainer}>
            <Text style={styles.VerificationTitle}>
                Verification Code
            </Text>
            <Text style={styles.VerificationInfo}>Enter the 6-digit One Time Password sent to your phone number via SMS below.</Text>
            <View style={styles.VerificationInput}>
                < Pressable style={styles.VerificationPressable} onPress={handleOnPress}>
                    {codeDigitsArray.map(toCodeDigitInput)}
                </Pressable>
                <TextInput style={styles.HiddenTextInput}
                    value={code}
                    onChangeText={setCode}
                    maxLength={pinLength}
                    keyboardType="phone-pad"
                    returnkeyType="done"
                    textContentType="oneTimeCode"
                    ref={textInputRef}
                    onBlur={handleOnBlur}
                />
            </View>
            <TouchableOpacity disabled={!pinReady}
                    style={{ backgroundColor: !pinReady ? "#7188FF": "#72E6FF", 
                    padding: 15,
                    justifyContent: "center",
                    alignItems: 'center',
                    borderRadius: 10,
                    marginVertical: 5,
                    height: 60,
                    width: "50%",
                    }}
                    onPress={handleVerify}
                >
                <Text
                    style={{
                        fontFamily: 'Roboto',
                        fontSize: 22,
                        margin: "auto",
                        color: !pinReady ? Colors.darkLight : "#FFFFFF",
                    }}
                >   
                    Verify Pin
                </Text>
            </TouchableOpacity>
            <View style={styles.ExtraView}>
                <Text style={styles.ExtraText}>SMS expired?</Text>
                    <TouchableOpacity style={styles.TextLink} onPress={resendSMS}>
                    <Text style={styles.TextLinkContent}> Resend the Code</Text>
                </TouchableOpacity>
            </View>
            </Pressable>
            
        </KeyboardAvoidingWrapper>
    );
};

const styles = StyleSheet.create({
VerificationText: {
    fontSize: 15,
    textAlign: "center",
    color: "#333647"
},
VerificationContainer: {
    flex: 5,
    alignItems: "center",
    backgroundColor: "#FFFFFF"
},
UpperVerificationContainer: {
    flex: 2,
    paddingTop: 20,
    width: "100%",
    alignItems: "center"   
},
LowerVerificationContainer: {
    flex: 3,
    width: "100%",
    paddingTop: 0,
    alignItems: "center",  
    paddingBottom: 40
},
VerificationLogo: {
    width: "70%",
    height: 300
    },
VerificationTitle: {
    fontSize: 24,
    fontFamily: 'Roboto',
    letterSpacing: 0,
    textAlign: "left"   ,
    lineHeight: 32,
    paddingTop: 10,
    paddingRight: 180
},
VerificationInfo: {
    fontSize: 16,
    fontFamily: 'Roboto',
    textAlign: "left",
    paddingLeft: 20,
    paddingRight: 20,
    color: "#7C82A1"    
},
VerificationInput: {

    marginVertical: 30,
    marginLeft: 10
},
VerificationPressable: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around"   
},
HiddenTextInput: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0
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
}




});

const OTPInput = styled.View`
    background-color: #F3F4F6;
    min-width: 12%;
    border-radius: 10px;
    padding: 13px;
    borderColor: #D3D3D3;
`;

const OTPInputFocused = styled(OTPInput)`
    background-color: #7188FF;
`;
export default Verification;

