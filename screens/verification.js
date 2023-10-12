import React, {useState, useRef, useEffect} from "react";
import { StatusBar } from 'expo-status-bar';
import { Keyboard } from "react-native";
import { LowerVerificationContainer, 
    UpperVerificationContainer, VerificationContainer, VerificationInfo, 
    VerificationLogo, VerificationTitle, VerificationInput, HiddenTextInput, 
    VerificationPressable, OTPInput, VerificationText, OTPInputFocused, VerifyButton, VerifyText } from "../components/styles";
import { Colors } from "react-native/Libraries/NewAppScreen";


const Verification = (navigation) => {
    const  [code, setCode] = useState("");
    const [pinReady, setPinReady] = useState("false");
    const pinLength = 4;

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
                <VerificationText>{digit}</VerificationText>
            </StyledOTPInput>
        );
    }

    const codeDigitsArray = new Array(pinLength).fill(0);

    return (
        <VerificationContainer onPress={Keyboard.dismiss}>
            <StatusBar style="dark"/>
            <UpperVerificationContainer>
             <VerificationLogo resizeMode="cover" source={require('../assets/verification_splashart.png')}/>
            </UpperVerificationContainer>
            <LowerVerificationContainer>
            <VerificationTitle>
                Verification Code
            </VerificationTitle>
            <VerificationInfo>Enter the 4 digit Verification Code we have sent to your email to proceed.</VerificationInfo>
            <VerificationInput >
                <VerificationPressable onPress={handleOnPress}>
                    {codeDigitsArray.map(toCodeDigitInput)}
                </VerificationPressable>
                <HiddenTextInput
                    value={code}
                    onChangeText={setCode}
                    maxLength={pinLength}
                    keyboardType="phone-pad"
                    returnkeyType="done"
                    textContentType="oneTimeCode"
                    ref={textInputRef}
                    onBlur={handleOnBlur}
                />
            </VerificationInput>
            <VerifyButton disabled={!pinReady}
                    style={{
                        backgroundColor: !pinReady ? "#7188FF": "#72E6FF", 
                    }}
                >
                <VerifyText
                    style={{
                        color: !pinReady ? Colors.darkLight : "#FFFFFF",
                    }}
                >   
                    Verify Pin
                </VerifyText>
            </VerifyButton>
            </LowerVerificationContainer>
            
        </VerificationContainer>
    );
};

export default Verification;


