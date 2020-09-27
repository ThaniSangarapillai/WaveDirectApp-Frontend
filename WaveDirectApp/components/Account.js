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

export default function Account() {

    return (
        <View style={styles.container}>
            
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
)