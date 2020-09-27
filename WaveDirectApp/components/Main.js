import React, { Component } from 'react';
import { Button, TouchableOpacity, Text } from 'react-native'; 
import Home from './Home';
import ScreenOne from './ScreenOne';
import ScreenTwo from './ScreenTwo';
import ScreenThree from './ScreenThree';

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  DrawerActions
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Account from './Account';
import Map from './Map';
//import { TouchableOpacity } from 'react-native-gesture-handler';
// import { createMaterialBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createMaterialTopTabNavigator } from '@react-navigation/top-tabs';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
// const MaterialBottomtab = createMaterialBottomTabNavigator();
// const MaterialToptab = createMaterialTopTabNavigator();

export default class Main extends React.Component {
  createHomeStack = () =>
    <Stack.Navigator >
      <Stack.Screen
        name="Home"
        children={this.createDrawer}
        options={({ navigation, route }) => ({
          title: "My WaveDirect",
          headerTitleStyle: {color: "white"},
          headerStyle: {backgroundColor: "#161a1d"},
          headerLeft: () =>
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              style={[{ color: 'white', padding: 15, paddingLeft: 25}]}
              size={24}
              name={'menu'}
              title="i"
            >
              <Text style={{fontFamily: "FontAwesome", fontSize: 20, color: "white"}}>{""}</Text>
            </TouchableOpacity>
        })
        }
      />
    </Stack.Navigator>

  createDrawer = () =>
    <Drawer.Navigator drawerStyle={{backgroundColor: "#161a1d", color: "white"}} drawerContentOptions={{labelStyle:{color:"white"}}}>
      <Drawer.Screen name="Home" component={Home}/>
      <Drawer.Screen name="Account" component={Account} />
      <Drawer.Screen name="About" component={ScreenTwo} />
      <Drawer.Screen name="Settings" component={ScreenThree} />
    </Drawer.Navigator>


  render() {

    return (
      <>
        {this.createHomeStack()}
      </>
    );
  }
}
