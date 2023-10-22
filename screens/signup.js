import {React, useEffect, useState} from "react";
import supabase from "../supabase/supabase";
import { StatusBar } from 'expo-status-bar';
import { Colors} from "../components/styles";
import { Formik } from "formik";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import { View, Image, StyleSheet, Text, TouchableOpacity, TextInput  } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';


const {darkLight} = Colors;

const SignUp = ({navigation}) => {

    const [phoneNumber, setPhoneNumber] = useState(null);
    const [userName, setUserName] = useState(null);
    const [email, setEmail] = useState(null);
    const [city, setCity] = useState(null);
    const [address, setAddress] = useState(null);
    const [postCode, setPostCode] = useState(null);
    const [countryState, setCountryState] = useState(null);
    const [countryName, setCountryName] = useState(null);

    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [dob, setDob] = useState();

    const onChange = (event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShow(false);
            setDate(currentDate);
            setDob(currentDate);   
    };
    

    const showDatePicker = () => {
        setShow(true);

    }

    const AddNewUser = async () => {
    try{
        const { data, error } = await supabase.auth.signUp({
            phone: phoneNumber,
            password: 'testing',
          })
          if(error)
          {
            throw(error);
          }
          else{
            const {data, error} = await supabase.auth.signInWithOtp({
                phone: phoneNumber,
            })
            if(error)
            {
                console.log(error)
            }
            else if(data)
            {
                 const {data, error} = await supabase
                    .from('app_users')
                    .insert({'fullname':  userName,
                            'email':  email,
                            'phone_no': phoneNumber,
                            'address':  address,
                            'dob': dob,
                            'city': city,
                            'postcode': postCode,
                            'state': countryState,
                            'country': countryName,
                            'status': 'Active'})
                if(error)
                {
                    console.log(error);
                }
                else{
                    console.log(data);
                }
                navigation.navigate('Verification', {phone: phoneNumber,})
          }
        }
    }
    catch (error)
    {
        console.log(error);
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
        <Text style={styles.SignUpInfo}>Become a journalist in your own right. Sign up below to begin your journalist's journey.</Text>
        {show && (
            <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="calendar"
            onChange={onChange}/>
        )}
                <Formik 
                initialValues={{phone_number: '', username: '',dob: '', email_address: '', city_name: '', address: '', postcode: '', state: '', country: ''}}
                onSubmit={(values) => {console.log(values);
                        setPhoneNumber(values.phone_number);
                        setUserName(values.username);
                        setEmail(values.email_address);
                        setAddress(values.address);
                        setCity(values.city_name);
                        setPostCode(values.postcode);
                        setCountryState(values.state);
                        setCountryName(values.country);
                        AddNewUser;
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
                                label="Username"
                                placeholder="eg. Titanfall#456"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                                minLength={10}
                                maxLength={50}
                            />
                            </View>
                            <DoBInput 
                                    label="Date of birth"
                                    placeholder="eg. dd/mm/yyyy"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('dob')}
                                    onBlur={handleBlur('dob')}
                                    value={dob ? dob.toDateString() : ''}
                                    isDate={true}
                                    editable={false}
                                    showDatePicker={showDatePicker}
                                />
                            <EmailInput 
                                    label="Email Address"
                                    placeholder="eg. your@email.com"
                                    placeholderTextColor={darkLight}
                                    onChangeText={handleChange('email_address')}
                                    onBlur={handleBlur('email_address')}
                                    value={values.email_address}
                                    inputMode="email"
                                    maxLength={40}
                                />
                            <AddressInput 
                                label="Residence Address"
                                placeholder="eg.12 84th Street Alabama"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('address')}
                                onBlur={handleBlur('address')}
                                value={values.address}
                                multiline={true}
                                numberOfLines = {4}
                                maxLength={50}
                                />
                            <View style={styles.SignUpInput}>
                            <CityInput 
                                label="City Name"
                                placeholder="eg. New York City"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('city_name')}
                                onBlur={handleBlur('city_name')}
                                value={values.city_name}
                                maxLength={30}
                                />
                            <PostCodeInput 
                                label="PostCode"
                                placeholder="eg. 47800"
                                placeholderTextColor={darkLight}
                                maxLength={5}
                                onChangeText={handleChange('postcode')}
                                onBlur={handleBlur('postcode')}
                                value={values.postcode}
                            />
                            </View>
                            <View style={styles.SignUpInput}>
                            <StateInput 
                                label="State Name"
                                placeholder="eg. California"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('state')}
                                onBlur={handleBlur('state')}
                                value={values.state}
                                />
                            <CountryInput 
                                label="Country"
                                placeholder="eg. United States"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('country')}
                                onBlur={handleBlur('country')}
                                value={values.country}
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

const EmailInput = ({label, ...props}) => {
    return (
        <View style={{ width: "60%"}}>
            <Text style={styles.SignUpDetailsLabel}>{label}</Text>
            <TextInput style={styles.SignUpDetailsInput} {...props} />
        </View>
    ) 
}

const AddressInput = ({label, ...props}) => {
    return (
        <View style={{height: 60, marginBottom: 50}}>
            <Text style={styles.SignUpDetailsLabel}>{label}</Text>
            <TextInput style={styles.SignUpDetailsInputForAddress} {...props} />
        </View>
    )
}

const CityInput = ({label, ...props}) => {
    return (
        <View style={{marginRight: 60}}>
            <Text style={styles.SignUpDetailsLabel}>{label}</Text>
            <TextInput style={styles.SignUpDetailsInput} {...props} />
        </View>
    )
}
const PostCodeInput = ({label, ...props}) => {
    return (
        <View>
            <Text style={styles.SignUpDetailsLabel}>{label}</Text>
            <TextInput style={styles.SignUpDetailsInput} {...props} />
        </View>
    )
}

const StateInput = ({label, ...props}) => {
    return (
        <View style={{marginRight: 30, width: "50%"}}>
            <Text style={styles.SignUpDetailsLabel}>{label}</Text>
            <TextInput style={styles.SignUpDetailsInput} {...props} />
        </View>
    )
}
const CountryInput = ({label, ...props}) => {
    return (
        <View>
            <Text style={styles.SignUpDetailsLabel}>{label}</Text>
            <TextInput style={styles.SignUpDetailsInput} {...props} />
        </View>
    )
}
const DoBInput = ({label, showDatePicker, ...props}) => {
    return (
        <View style={{width: "45%"}} >
            <Text style={styles.SignUpDetailsLabel}>{label}</Text>
            <TouchableOpacity onPress={showDatePicker}>
                <TextInput style={styles.SignUpDetailsInput} {...props}/>
            </TouchableOpacity>
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
},  

SignUpDetailsInputForAddress: {
    padding: 8,
    fontSize: 15,
    color: Colors.tertiary,
    borderRadius: 10,
    width: "95%",
    height: 80,
    textAlign: "left",
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 2,
    borderColor: Colors.secondary,
    marginLeft: 10,
    alignItems: "baseline"
}
});

export default SignUp;