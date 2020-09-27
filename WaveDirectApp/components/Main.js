import React, { Component } from 'react';
import Home from './Home';
import ScreenOne from './ScreenOne';
import ScreenTwo from './ScreenTwo';
import ScreenThree from './ScreenThree';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
// import { createMaterialBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createMaterialTopTabNavigator } from '@react-navigation/top-tabs';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
// const MaterialBottomtab = createMaterialBottomTabNavigator();
// const MaterialToptab = createMaterialTopTabNavigator();

export default class Main extends React.Component {
  render() {
    createHomeStack = () =>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>

    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" children={this.createHomeStack} />
        <Drawer.Screen name="IDK" component={ScreenOne} />
        <Drawer.Screen name="About" component={ScreenTwo} />
        <Drawer.Screen name="Settings" component={ScreenThree} />
      </Drawer.Navigator>
    );
  }
}
