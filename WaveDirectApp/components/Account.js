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
} from 'react-native';
import { Header, Input } from 'react-native-elements';
import ViewPager from '@react-native-community/viewpager';
import AsyncStorage from '@react-native-community/async-storage';
import { acc, add, set, Value } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import logo from './logo.png';

export default function Account() {
    const [account, setAccount] = useState({});

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
                        setAccount(data)
                        console.log('hello', account)
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

    return (
        <View style={styles.container}>
            <View style={{ height: "10%", width: "100%", backgroundColor: "#FFFFFF", position: "absolute", top: 0 }}><Text>hello</Text></View>
            <StatusBar barStyle="light-content" backgroundColor="#161a1d" />
            <Text style={{color: "#FFFFFF"}}></Text>
            {/* <ScrollView>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    {
                        account.map(data => {
                            console.log(data)
                            return (
                                <Text>
                                    {1}
                                </Text>

                            )
                        }
                        )
                    }
                </View>
            </ScrollView> */}
            <View style={{ height: "10%", width: "100%", backgroundColor: "#FFFFFF", position: "absolute", bottom: 0 }}><Text>hello</Text></View>
        </View>
    )
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
    }
})