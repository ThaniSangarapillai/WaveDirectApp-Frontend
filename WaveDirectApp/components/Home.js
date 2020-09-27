import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { useState } from 'react';
import { Header } from 'react-native-elements';
import { StyleSheet } from 'react-native';
//import {createDrawerNavigator} from '@react-navigation/drawer';
//import {NavigationContainer} from '@react-navigation/native';

import { styles } from './styles';

class Home extends Component {
    render() {
        return (
            <View style={styles.center}>
                <Text style={styles.title}>Navigation Drawer</Text>
                <Button title="Go to Menu" onPress={() => { }} />
            </View>
        );
    }
}

export default Home;
// return (
//     <>
//         <Header
//             leftComponent={{
//                 icon: 'menu',
//                 color: '#fff',
//                 onPress: () => clickHandler(),
//             }}
//             centerComponent={{ text: title, style: { color: '#fff' } }}
//             rightComponent={{ icon: 'home', color: '#fff' }}
//         />
//         <View style={styles.container}></View>
//     </>
// );
//         }

// export default Home;
