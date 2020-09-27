import React, {useState} from 'react';
import {Header} from 'react-native-elements';
import {View, StyleSheet, Button} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import App from '../App';

function Home() {
  const [title, setTitle] = useState('thani');

  const clickHandler = () => {
    setTitle('pira');
  };

   return (
      <>
        <Header
          leftComponent={{
            icon: 'menu',
            color: '#fff',
            onPress: () => clickHandler(),
          }}
          centerComponent={{text: title, style: {color: '#fff'}}}
          rightComponent={{icon: 'home', color: '#fff'}}
        />
        <View style={styles.container}></View>
      </>
   );

export default Home;
