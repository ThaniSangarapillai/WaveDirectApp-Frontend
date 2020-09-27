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
import ViewPager from '@react-native-community/viewpager';
import { add, set } from 'react-native-reanimated';
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

function Register() {
    const [value, onChangeText] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [firstName, onChangeFirst] = React.useState('');
    const [lastName, onChangeLast] = React.useState('');
    const [address, onChangeAddress] = React.useState('');
    const [town, onChangeTown] = React.useState('');
    const [province, onChangeProvince] = React.useState('');
    const [country, onChangeCountry] = React.useState('');
    const [phone, onChangePhone] = React.useState('');
    const [errorMsg, setErrorMsg] = useState('')
    const [pageState, setPageState] = useState([true, false, false, false])
    const [registerState, setRegisterState] = useState(false)

    function handleClick() {
        console.log(JSON.stringify({
            "email": value,
            'password': password,
            "first": firstName,
            "last": lastName,
            "address": address,
            "town": town,
            "province":province,
            "country":country,
            "phone": phone
        }))
        fetch('http://192.168.0.119:5000/register', {
            method: 'POST',
            headers: {
                Accept: '*',
                'Content-Type': 'application/json',
                Origin: 'AUTHORITY',
            },
            body: JSON.stringify({
                "email": value,
                'password': password,
                "first": firstName,
                "last": lastName,
                "address": address,
                "town": town,
                "province":province,
                "country":country,
                "phone": phone
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setErrorMsg(data)
                if (data.type == "message") {
                    setRegisterState(true);
                }
            });


    }

    function handlePageChange(position) {
        const selected = ""
        const unselected = ""
        var temp_list = []
        for (var i = 0; i < 4; i++) {
            if (i == position) {
                temp_list.push(true)
            } else {
                temp_list.push(false)
            }
        }
        console.log(temp_list)
        setPageState(temp_list)
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

                <Text
                    style={{
                        fontFamily: 'Poppins-Medium',
                        fontSize: 30,
                        color: '#ffffff',
                        paddingTop: "10%",
                        paddingBottom: "10%"
                    }}>
                    Register
                </Text>
                <ViewPager style={{ flex: 1, display: "flex", width: "100%" }} orientation="horizontal" initialPage={0} onPageScroll={(e) => handlePageChange(e.nativeEvent.position)} scrollEnabled={true}>

                    <View key="1" style={styles.registerBox}>
                        <Input
                            placeholder='Email'
                            inputStyle={styles.inputbox}
                            placeholderTextColor="#FFFFFF"
                            labelStyle={{
                                color: "#ba181b"
                            }}
                            inputContainerStyle={styles.instructions}
                            onChangeText={text => {
                                onChangeText(text)
                                console.log(text)
                            }}
                            //email={value}
                            autoCapitalize="none"
                            disabled={registerState}
                        />

                        <Input
                            placeholder='Password'
                            inputStyle={styles.inputbox}
                            placeholderTextColor="#FFFFFF"
                            labelStyle={{
                                color: "#ba181b"
                            }}
                            inputContainerStyle={styles.instructions}
                            onChangeText={text => {
                                onChangePassword(text)
                            }}
                            password={value}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            disabled={registerState}
                        />
                    </View>
                    <View key="2" style={styles.registerBox}>
                        <Input
                            placeholder='First Name'
                            inputStyle={styles.inputbox}
                            placeholderTextColor="#FFFFFF"
                            labelStyle={{
                                color: "#ba181b"
                            }}
                            inputContainerStyle={styles.instructions}
                            onChangeText={text => {
                                onChangeFirst(text)
                                console.log(text)
                            }}
                            value={firstName}
                            //autoCapitalize="none"
                            disabled={registerState}
                        />
                        <Input
                            placeholder='Last Name'
                            inputStyle={styles.inputbox}
                            placeholderTextColor="#FFFFFF"
                            labelStyle={{
                                color: "#ba181b"
                            }}
                            inputContainerStyle={styles.instructions}
                            onChangeText={text => {
                                onChangeLast(text)
                                console.log(text)
                            }}
                            value={lastName}
                            //autoCapitalize="none"
                            disabled={registerState}

                        />
                    </View>
                    <View key="3" style={styles.registerBox}>
                        <Input
                            placeholder='Address'
                            inputStyle={styles.inputbox}
                            placeholderTextColor="#FFFFFF"
                            labelStyle={{
                                color: "#ba181b"
                            }}
                            inputContainerStyle={styles.instructions}
                            onChangeText={text => {
                                onChangeAddress(text)
                                console.log(text)
                            }}
                            value={address}
                            disabled={registerState}
                            //autoCapitalize="none"
                        />
                        <Input
                            placeholder='Town'
                            inputStyle={styles.inputbox}
                            placeholderTextColor="#FFFFFF"
                            labelStyle={{
                                color: "#ba181b"
                            }}
                            inputContainerStyle={styles.instructions}
                            onChangeText={text => {
                                onChangeTown(text)
                                console.log(text)
                            }}
                            value={town}
                            disabled={registerState}
                            //autoCapitalize="none"
                        />
                        <Input
                            placeholder='Province/State'
                            inputStyle={styles.inputbox}
                            placeholderTextColor="#FFFFFF"
                            labelStyle={{
                                color: "#ba181b"
                            }}
                            inputContainerStyle={styles.instructions}
                            onChangeText={text => {
                                onChangeProvince(text)
                                console.log(text)
                            }}
                            value={province}
                            disabled={registerState}
                            //autoCapitalize="none"
                        />
                        <Input
                            placeholder='Country'
                            inputStyle={styles.inputbox}
                            placeholderTextColor="#FFFFFF"
                            labelStyle={{
                                color: "#ba181b"
                            }}
                            inputContainerStyle={styles.instructions}
                            onChangeText={text => {
                                onChangeCountry(text)
                                console.log(text)
                            }}
                            value={country}
                            disabled={registerState}
                            //autoCapitalize="none"
                        />
                    </View>
                    <View key="4" style={styles.registerBox}>
                        <Input
                            placeholder='Phone'
                            inputStyle={styles.inputbox}
                            placeholderTextColor="#FFFFFF"
                            labelStyle={{
                                color: "#ba181b"
                            }}
                            inputContainerStyle={styles.instructions}
                            onChangeText={text => {
                                onChangePhone(text)
                                console.log(text)
                            }}
                            value={phone}
                            disabled={registerState}
                            autoCapitalize="none"
                        />
                    </View>



                </ViewPager>
                <View >
                    <Text style={styles.errorText}>{errorMsg.message}</Text>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        {
                            pageState.map(
                                (selected, index) => {
                                    console.log(selected, index)
                                    return (
                                        <Text
                                            style={{
                                                fontFamily: "FontAwesome",
                                                color: "#e5383b",
                                                fontSize: 30,
                                                padding: 5
                                            }}
                                            key={index}>
                                            { selected ? "" : ""}
                                        </Text>
                                    )


                                }
                            )

                        }
                    </View>
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            padding: 20
                        }}
                    >
                        <TouchableOpacity
                            style={styles.signin}
                            onPress={() => { handleClick() }}
                            disabled={registerState}
                        >
                            <Text style={styles.signinText}>Register</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.back}
                            onPress={() => { handleClick(value, password) }}
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
        // paddingTop: 50,
        // paddingBottom: 50,
    },
    instructions: {
        borderBottomColor: "#ba181b",
        marginLeft: "5%",
        marginRight: "5%"
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
        margin: 20
    },
    inputbox: {
        color: "#FFFFFF",
        fontFamily: "Poppins-Medium",
        fontSize: 15,


    },
    registerBox: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        textAlign: "center"
    }
});

export default Register;
