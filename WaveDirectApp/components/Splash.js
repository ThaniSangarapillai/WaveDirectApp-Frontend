import React, {useReducer, Component, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import {Header} from 'react-native-elements';
import logo from './logo.png';

function Splash() {
  const window = useWindowDimensions();
  // const [drawer, setDrawer] = useState(False);
  const [title, setTitle] = useState('thani');

  const clickHandler = () => {
    setTitle = 'pira';
  };

  return (
    <>
      {/* <Image
        source={require('./logo.png')}
        style={{width: window.width / 1.2, top: window.height / 2}}
        resizeMode="contain"
      /> */}
      <Header
        leftComponent={{icon: 'menu', color: '#fff'}}
        onPress={clickHandler}
        centerComponent={{text: title, style: {color: '#fff'}}}
        rightComponent={{icon: 'home', color: '#fff'}}
        containerStyle={styles.header}
      />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FF0000',
  },
});

export default Splash;
