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
import { Header } from 'react-native-elements';
import logo from './logo.png';
import AsyncStorage from '@react-native-community/async-storage'


function Logout({navigation}) {

  useEffect(() => {
    AsyncStorage.getItem('x-wave-auth', (err, result) => {
      if (result == null) {
          //setErrorMsg("Something went Wrong. Please try again.")
          console.log(err)
      } else {
          //setErrorMsg("Logged in!")
          console.log(result)

          fetch('http://192.168.0.119:5000/logout', {
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
                console.log(data)
                  if (data.message == "ok"){
                    AsyncStorage.removeItem('x-wave-auth')
                    navigation.navigate("Splash")
                  }
              });


      }
  })
  }, []);

  return (
    <>
      {/* <Header></Header> */}
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#161a1d" />
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#F5FCFF',
  },
  instructions: {
    textAlign: 'center',
    color: '#F5FCFF',
    marginBottom: 5,
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
    borderColor: '#000000',
    width: 150,
  },
  signinText: {
    fontSize: 15,
    color: '#f5f3f4',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
  register: {
    fontSize: 15,
    textAlign: 'center',
    padding: 15,
    margin: 10,
    backgroundColor: '#a4161a05',
    borderRadius: 50,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#a4161a',
    width: 200,
  },
  registerText: {
    fontSize: 18,
    color: '#ad2831',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
  logo: {
    width: 200,
    resizeMode: 'contain',
  },
});

export default Logout;
