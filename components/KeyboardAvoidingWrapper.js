import { SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, StatusBar } from "react-native";
const StatusBarHeight = Constants.StatusBarHeight;
import  Constants from 'expo-constants';


//keyboard avoiding view;

const KeyboardAvoidingWrapper = ({children}) => {
    return <SafeAreaView style={{flex:1}}>
        <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === "ios" ? "padding": "height"}>
            <ScrollView showsVerticalScrollIndicator={false} style={{paddingTop: Platform.OS === "android"? StatusBar.currentHeight + 10: 50}}>
            {children}
        </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>
};

export default KeyboardAvoidingWrapper;