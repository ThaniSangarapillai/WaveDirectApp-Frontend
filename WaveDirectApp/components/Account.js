import React, { useReducer, Component, useState, useEffect } from 'react';
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
    KeyboardAvoidingView,
    Platform,
    Linking
} from 'react-native';
import { Header, Input } from 'react-native-elements';
import ViewPager from '@react-native-community/viewpager';
import AsyncStorage from '@react-native-community/async-storage';
import { acc, acos, add, set, Value } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import logo from './logo.png';

export default function Account() {
    const [account, setAccount] = useState({});
    const [packages, setPackages] = useState({});
    const [pageState, setPageState] = useState([true, false, false, false])
    const [editState, setEditState] = useState(true)
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
    const fields = { "Name": ['First Name', 'Last Name'], "Address": ['Address', 'Town', 'Provice', 'Country'], "Contact/User Info": ['Email', "Phone", "Password"] };

    function handleClick() {
        console.log(JSON.stringify({
            "email": value,
            'password': password,
            "first": firstName,
            "last": lastName,
            "address": address,
            "town": town,
            "province": province,
            "country": country,
            "phone": phone
        }))
        fetch('http://192.168.0.119:5000/users/set', {
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
                "province": province,
                "country": country,
                "phone": phone
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setErrorMsg(data)
                if (data.type == "message") {
                    setEditState(true);
                }
            });


    }

    function getAccountDetails() {
        AsyncStorage.getItem('x-wave-auth', (err, result) => {
            if (result == null) {
                //setErrorMsg("Something went Wrong. Please try again.")
                console.log(err)
            } else {
                //setErrorMsg("Logged in!")
                console.log(result)

                fetch('http://192.168.0.119:5000/users/get', {
                    method: 'GET',
                    headers: {
                        Accept: '*',
                        'Content-Type': 'application/json',
                        Origin: 'AUTHORITY',
                        'x-wave-auth': result
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        setAccount(data),
                        onChangeFirst(data['First Name'])
                        onChangeLast(data['Last Name'])
                        onChangeAddress(data['Address'])
                        onChangeTown(data['Town'])
                        onChangeProvince(data['Provice'])
                        onChangeCountry(data['Country'])
                        onChangePhone(data['Phone'])
                        onChangeText(data['Email'])
                    });

                fetch('http://192.168.0.119:5000/packages/get', {
                    method: 'GET',
                    headers: {
                        Accept: '*',
                        'Content-Type': 'application/json',
                        Origin: 'AUTHORITY',
                        'x-wave-auth': result
                    },
                })
                    .then(response => response.json())
                    .then(packageData => {
                        console.log(packageData)
                        setPackages(packageData)

                    });


            }
        })
    }

    // function returnText() {
    //     getAccountDetails();
    //     account.map(([key, value]) => {
    //         console.log([key, value])
    //         return (
    //             <Text
    //                 style={{
    //                     fontFamily: "FontAwesome",
    //                     color: "#e5383b",
    //                     fontSize: 30,
    //                     padding: 5
    //                 }}
    //                 key={key}>
    //                 {value}
    //             </Text>
    //         )
    //     }
    //     )
    // }

    useEffect(() => {
        getAccountDetails()

    }, []);

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
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#161a1d" />

            <ViewPager style={{ flex: 1, width: "100%", height: "100%" }} orientation="horizontal" initialPage={0} onPageScroll={(e) => handlePageChange(e.nativeEvent.position)} scrollEnabled={true}>
                <View key="Name" style={styles.registerBox}>
                    <Text
                        style={{
                            fontFamily: 'Poppins-Medium',
                            fontSize: 30,
                            color: '#ffffff',
                            paddingBottom: "10%",
                            marginLeft: "5%"
                        }}>
                        {"Name"}
                    </Text>
                    <Input
                        placeholder={"First Name"}
                        inputStyle={styles.inputbox}
                        placeholderTextColor="#FFFFFF"
                        label={"First Name"}
                        labelStyle={{
                            color: "#FFFFFF",
                            marginLeft: "5%"
                        }}
                        inputContainerStyle={styles.instructions}
                        // onChangeText={text => {
                        //     onChangePhone(text)
                        //     console.log(text)
                        // }}
                        
                        defaultValue={firstName}
                        onChangeText={text => onChangeFirst(text)}
                        disabled={editState}
                        autoCapitalize="none"
                        key={"First Name"}
                    />
                    <Input
                        placeholder={"Last Name"}
                        inputStyle={styles.inputbox}
                        placeholderTextColor="#FFFFFF"
                        label={"Last Name"}
                        labelStyle={{
                            color: "#FFFFFF",
                            marginLeft: "5%"
                        }}
                        inputContainerStyle={styles.instructions}
                        // onChangeText={text => {
                        //     onChangePhone(text)
                        //     console.log(text)
                        // }}
                        //lastName={value}
                        defaultValue={lastName}
                        onChangeText={text => onChangeLast(text)}
                        disabled={editState}
                        autoCapitalize="none"
                        key={"Last Name"}
                    />
                </View>
                <View key="Address" style={styles.registerBox}>
                    <Text
                        style={{
                            fontFamily: 'Poppins-Medium',
                            fontSize: 30,
                            color: '#ffffff',
                            paddingBottom: "10%",
                            marginLeft: "5%"
                        }}>
                        {"Address"}
                    </Text>
                    <Input
                        placeholder={"Address"}
                        inputStyle={styles.inputbox}
                        placeholderTextColor="#FFFFFF"
                        label={"Address"}
                        labelStyle={{
                            color: "#FFFFFF",
                            marginLeft: "5%"
                        }}
                        inputContainerStyle={styles.instructions}
                        // onChangeText={text => {
                        //     onChangePhone(text)
                        //     console.log(text)
                        // }}
                        //address={value}
                        defaultValue={address}
                        onChangeText={text => onChangeAddress(text)}
                        disabled={editState}
                        autoCapitalize="none"
                        key={"Address"}
                    />
                    <Input
                        placeholder={"Town"}
                        inputStyle={styles.inputbox}
                        placeholderTextColor="#FFFFFF"
                        label={"Town"}
                        labelStyle={{
                            color: "#FFFFFF",
                            marginLeft: "5%"
                        }}
                        inputContainerStyle={styles.instructions}
                        // onChangeText={text => {
                        //     onChangePhone(text)
                        //     console.log(text)
                        // }}
                        //town={value}
                        defaultValue={town}
                        onChangeText={text => onChangeTown(text)}
                        disabled={editState}
                        autoCapitalize="none"
                        key={"Town"}
                    />
                    <Input
                        placeholder={"Province"}
                        inputStyle={styles.inputbox}
                        placeholderTextColor="#FFFFFF"
                        label={"Province"}
                        labelStyle={{
                            color: "#FFFFFF",
                            marginLeft: "5%"
                        }}
                        inputContainerStyle={styles.instructions}
                        // onChangeText={text => {
                        //     onChangePhone(text)
                        //     console.log(text)
                        // }}
                        //province={value}
                        defaultValue={province}
                        onChangeText={text => onChangeProvince(text)}
                        disabled={editState}
                        autoCapitalize="none"
                        key={"Province"}
                    />
                    <Input
                        placeholder={"Country"}
                        inputStyle={styles.inputbox}
                        placeholderTextColor="#FFFFFF"
                        label={"Country"}
                        labelStyle={{
                            color: "#FFFFFF",
                            marginLeft: "5%"
                        }}
                        //country={value}
                        inputContainerStyle={styles.instructions}
                        // onChangeText={text => {
                        //     onChangePhone(text)
                        //     console.log(text)
                        // }}
                        defaultValue={country}
                        onChangeText={text => onChangeCountry(text)}
                        disabled={editState}
                        autoCapitalize="none"
                        key={"Country"}
                    />
                </View>
                <View key="Contact Info" style={styles.registerBox}>
                    <Text
                        style={{
                            fontFamily: 'Poppins-Medium',
                            fontSize: 30,
                            color: '#ffffff',
                            paddingBottom: "10%",
                            marginLeft: "5%"
                        }}>
                        {"Contact Info"}
                    </Text>
                    <Input
                        placeholder={"Email"}
                        inputStyle={styles.inputbox}
                        placeholderTextColor="#FFFFFF"
                        label={"Email"}
                        labelStyle={{
                            color: "#FFFFFF",
                            marginLeft: "5%"
                        }}
                        defaultValue={value}
                        inputContainerStyle={styles.instructions}
                        // onChangeText={text => {
                        //     onChangePhone(text)
                        //     console.log(text)
                        // }}
                        
                        onChangeText={text => onChangeText(text)}
                        disabled={editState}
                        autoCapitalize="none"
                        key={"Email"}
                    />
                    <Input
                        placeholder={"Phone"}
                        inputStyle={styles.inputbox}
                        placeholderTextColor="#FFFFFF"
                        label={"Phone"}
                        labelStyle={{
                            color: "#FFFFFF",
                            marginLeft: "5%"
                        }}
                        inputContainerStyle={styles.instructions}
                        // onChangeText={text => {
                        //     onChangePhone(text)
                        //     console.log(text)
                        // }}
                        
                        defaultValue={phone}
                        onChangeText={text => onChangePhone(text)}
                        disabled={editState}
                        autoCapitalize="none"
                        key={"Phone"}
                    />
                </View>
                <View key={fields.length} style={styles.registerBox}>
                    <Text
                        style={{
                            fontFamily: 'Poppins-Medium',
                            fontSize: 20,
                            color: '#ffffff',
                            paddingBottom: "10%",
                            marginLeft: "5%"
                        }}>
                        {"Your Plan"}
                    </Text>
                    {
                        Object.keys(packages).map(key => {
                            return (
                                <Input
                                    placeholder={key}
                                    inputStyle={styles.inputbox}
                                    placeholderTextColor="#FFFFFF"
                                    label={key}
                                    labelStyle={{
                                        color: "#FFFFFF",
                                        marginLeft: "5%"
                                    }}
                                    inputContainerStyle={styles.instructions}
                                    // onChangeText={text => {
                                    //     onChangePhone(text)
                                    //     console.log(text)
                                    // }}
                                    value={packages[key]}
                                    disabled={true}
                                    autoCapitalize="none"
                                    key={key}
                                />
                            )
                        })
                    }
                    <TouchableOpacity
                        style={styles.help}
                        onPress={() => { Linking.openURL('tel:${5197379283}') }}
                    >
                        <Text style={styles.helpText}>Call Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.help}
                        onPress={() => { Linking.openURL('tel:${5197379283}') }}
                    >
                        <Text style={styles.helpText}>Call Us</Text>
                    </TouchableOpacity>
                </View>
            </ViewPager>
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} >
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
                                            fontSize: 25,
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
                        disabled={editState}
                    >
                        <Text style={styles.signinText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.back}
                        onPress={() => { setEditState(false); setErrorMsg("You may edit your info.") }}
                        disabled={!editState}
                    >
                        <Text style={styles.backText}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
            {/* <ScrollView contentContainerStyle={styles.container}>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >

                </View>
            </ScrollView> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#161a1d',
        paddingTop: 10,
        paddingBottom: 0,
        width: "100%"
    },
    inputbox: {
        color: "#FFFFFF",
        fontFamily: "Poppins-Light",
        fontSize: 15,


    },
    registerBox: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginBottom: "20%",
        height: "100%"
    },
    instructions: {
        borderBottomColor: "#ba181b",
        marginLeft: "5%",
        marginRight: "5%",
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

        color: '#0b090a',
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
    },
    help: {
        fontSize: 15,
        textAlign: 'center',
        padding: 15,
        margin: 10,
        backgroundColor: '#d3d3d3',
        borderRadius: 50,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#00000000',
        width: 120,
    },
    helpText: {
        color: "#000000",
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
    },
    errorText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 10,
        color: 'red',
        textAlign: "center",
        margin: 20
    },
})