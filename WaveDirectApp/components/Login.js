import React, { useReducer, Component, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TextInput,
    useWindowDimensions,
    StatusBar,
    Button,
    TouchableOpacity,
} from 'react-native';
import { Header, Input } from 'react-native-elements';
import { set } from 'react-native-reanimated';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import logo from './logo.png';
import { auth } from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

function Login({ navigation }) {
    const [value, onChangeText] = React.useState('Email');
    const [password, onChangePassword] = React.useState('Password');
    const [errorMsg, setErrorMsg] = useState('');

    function handleClick(value, password) {
        console.log(JSON.stringify({
            "email": value,
            'password': password
        }))
        fetch('http://192.168.0.119:5000/login', {
            method: 'POST',
            headers: {
                Accept: '*',
                'Content-Type': 'application/json',
                Origin: 'AUTHORITY',
            },
            body: JSON.stringify({
                "email": value,
                'password': password
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if ("message" in data) {
                    setErrorMsg(data.message)
                }
                if (data.type == "message") {
                    //_storeData(data.auth);
                    //_retrieveData();
                    AsyncStorage.setItem('x-wave-auth', data.auth,
                        () => {
                            AsyncStorage.getItem('x-wave-auth', (err, result) => {
                                if (result == null) {
                                    setErrorMsg("Something went Wrong. Please try again.")
                                    console.log(err)
                                } else {
                                    setErrorMsg("Logged in!")
                                    console.log(result)
                                }
                            })
                        })
                }
            });


    }

    return (
        <>
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#161a1d" />
                <View>
                    <Input
                        placeholder='Email'
                        inputStyle={{
                            color: "#FFFFFF",
                            fontFamily: "Poppins-Medium",
                        }}
                        placeholderTextColor="#FFFFFF"
                        labelStyle={{
                            color: "#ba181b"
                        }}
                        inputContainerStyle={styles.instructions}
                        leftIcon={
                            <Icon
                                name='user'
                                size={30}
                                color='#660708'
                            />
                        }
                        onChangeText={text => {
                            onChangeText(text)
                            console.log(text)
                        }}
                        //value={value}
                        autoCapitalize="none"
                    />

                    <Input
                        placeholder='Password'
                        inputStyle={{
                            color: "#ba181b",
                            fontFamily: "Poppins-Medium",
                        }}
                        placeholderTextColor="#FFFFFF"
                        labelStyle={{
                            color: "#ba181b"
                        }}
                        inputContainerStyle={styles.instructions}
                        leftIcon={
                            <Icon
                                name='lock'
                                size={30}
                                color='#660708'
                            />
                        }
                        onChangeText={text => {
                            onChangePassword(text)
                            console.log(text)
                        }}
                        //password={value}
                        autoCapitalize="none"
                        secureTextEntry={true}
                    />
                    <Text style={styles.errorText}>{errorMsg}</Text>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center"
                        }}
                    >
                        <TouchableOpacity
                            style={styles.signin}
                            onPress={() => { handleClick(value, password) }}
                        >
                            <Text style={styles.signinText}>Sign in</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.back}
                            onPress={() => navigation.navigate('Main')}
                        >
                            <Text style={styles.backText}>Back</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        </>
    );


}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#161a1d',
        paddingTop: 50,
        paddingBottom: 50,
    },
    instructions: {
        width: '85%',
        borderBottomColor: "#ba181b"
    },
    signin: {
        fontSize: 15,
        textAlign: 'center',
        padding: 15,
        margin: 10,
        backgroundColor: '#e5383b',
        borderRadius: 50,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#00000000',
        width: 150,
    },
    signinText: {
        fontSize: 15,
        color: '#f5f3f4',
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
    },
    back: {
        fontSize: 15,
        textAlign: 'center',
        padding: 15,
        margin: 10,
        backgroundColor: '#d3d3d3',
        borderRadius: 50,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#00000000',
        width: 150,
    },
    backText: {
        fontSize: 15,
        color: '#0b090a',
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
    },
    errorText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 15,
        color: 'red',
        textAlign: "center",
        margin: 40
    }
});

export default Login;
