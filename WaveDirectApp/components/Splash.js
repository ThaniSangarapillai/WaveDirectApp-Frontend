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
import { Header } from 'react-native-elements';
import logo from './logo.png';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

function Splash() {
  const window = useWindowDimensions();

  return (
    <>
      {/* <Header></Header> */}
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#161a1d" />
        <Text
          style={{
            fontFamily: 'Poppins-Black',
            fontSize: 50,
            color: '#ffffff',
            paddingBottom: 100,
          }}>
          WaveDirect
        </Text>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
          }}>
          <Button
            onPress={() => {
              alert('You tapped the button!');
            }}
            title="Press"
          />
          <TouchableOpacity
            style={styles.register}
            onPress={() => {
              alert('You tapped the button!');
            }}
          >
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signin}>
            <Text style={styles.signinText}>Sign in</Text>
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

export default Splash;
