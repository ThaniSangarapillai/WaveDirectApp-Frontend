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
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import logo from './logo.png';



// function handleClick(value, password) {
//     console.log(JSON.stringify({
//         "email": value,
//         'password': password
//     }))
//     fetch('http://192.168.0.119:5000/login', {
//         method: 'POST',
//         headers: {
//             Accept: '*',
//             'Content-Type': 'application/json',
//             Origin: 'AUTHORITY',
//         },
//         body: JSON.stringify({
//             "email": value,
//             'password': password
//         })
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);

//         });
// }

function Refer({ navigation }) {
    const [first, onChangeFirst] = React.useState('');
    const [last, onChangeLast] = React.useState('');
    const [phone, onChangePhone] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [errorMsg, setErrorMsg] = useState('')

    function handleClick(value, password) {
        console.log(JSON.stringify({
            "email": value,
            'password': password
        }))
        fetch('http://192.168.0.119:5000/refer', {
            method: 'POST',
            headers: {
                Accept: '*',
                'Content-Type': 'application/json',
                Origin: 'AUTHORITY',
            },
            body: JSON.stringify({
                "email": email,
                'first': first,
                'last': last,
                "phone": phone
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if ("message" in data) {
                    setErrorMsg(data.message)
                }
            });


    }

    return (
        <>
            {/* <Header></Header> */}
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#161a1d" />
                {/* <Header
                        statusBarProps={{ barStyle: 'light-content', backgroundColor: "#161a1d" }}
                        barStyle="light-content" 
                        leftComponent={{ icon: 'chevron-left', color: '#fff' }}
                        containerStyle={{
                            backgroundColor: "#161a1d",
                            borderBottomColor: "#00000000",
                            height: 00
                        }}
                        outerContainerStyles={{
                            borderBottomColor: "#00000000"
                        }}
                    /> */}
                <View>
                    <Input
                        placeholder='First Name'
                        inputStyle={{
                            color: "#FFFFFF",
                            fontFamily: "Poppins-Medium",
                        }}
                        placeholderTextColor="#FFFFFF"
                        labelStyle={{
                            color: "#ba181b"
                        }}
                        inputContainerStyle={styles.instructions}
                        onChangeText={text => {
                            onChangeFirst(text)
                            console.log(text)
                        }}
                    //value={value}
                    />

                    <Input
                        placeholder='Last Name'
                        inputStyle={{
                            color: "#ba181b",
                            fontFamily: "Poppins-Medium",
                        }}
                        placeholderTextColor="#FFFFFF"
                        labelStyle={{
                            color: "#ba181b"
                        }}
                        inputContainerStyle={styles.instructions}
                        onChangeText={text => {
                            onChangeLast(text)
                            console.log(text)
                        }}
                    //password={value}
                    />
                    <Input
                        placeholder='Email'
                        inputStyle={{
                            color: "#ba181b",
                            fontFamily: "Poppins-Medium",
                        }}
                        placeholderTextColor="#FFFFFF"
                        labelStyle={{
                            color: "#ba181b"
                        }}
                        inputContainerStyle={styles.instructions}
                        onChangeText={text => {
                            onChangeEmail(text)
                            console.log(text)
                        }}
                    //password={value}
                    />
                    <Input
                        placeholder='Phone'
                        inputStyle={{
                            color: "#ba181b",
                            fontFamily: "Poppins-Medium",
                        }}
                        placeholderTextColor="#FFFFFF"
                        labelStyle={{
                            color: "#ba181b"
                        }}
                        inputContainerStyle={styles.instructions}
                        onChangeText={text => {
                            onChangePhone(text)
                            console.log(text)
                        }}
                    />
                </View>

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
                        onPress={() => { handleClick() }}
                    >
                        <Text style={styles.signinText}>Refer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.back}
                        onPress={() => { navigation.navigate('Home') }}
                    >
                        <Text style={styles.backText}>Back</Text>
                    </TouchableOpacity>
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
        marginLeft: "10%",
        marginRight: "10%",
        width: "100%"
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

export default Refer;
