import React, { useReducer, Component } from 'react';
import { View, Text, Image, ScrollView, TextInput, useWindowDimensions } from 'react-native';
import logo from './logo.png';



function Splash() {
    const window = useWindowDimensions();
    return (
        <>
            <Image
                source={require('./logo.png')}
                style={{width: window.width/1.2, top: window.height/2}}
                resizeMode="contain"
            />
        </>

    );


}

export default Splash