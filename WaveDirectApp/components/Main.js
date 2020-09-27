import React, { Component } from 'react';
import { Button, TouchableOpacity, Text, LogBox } from 'react-native';

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
import Outage from './Outage';
import Splash from './Splash';
import Register from './Register';
import Login from './Login';
import Logout from './Logout';
import Refer from './referral';
//import Map from './Map';
//import { TouchableOpacity } from 'react-native-gesture-handler';
// import { createMaterialBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createMaterialTopTabNavigator } from '@react-navigation/top-tabs';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
// const MaterialBottomtab = createMaterialBottomTabNavigator();
// const MaterialToptab = createMaterialTopTabNavigator();
class Main extends Component {
  createHomeStack = () =>
    <Stack.Navigator >
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={({ navigation, route }) => ({headerShown: false})}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={({ navigation, route }) => ({headerShown: false})}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={({ navigation, route }) => ({headerShown: false})}
      />
      <Stack.Screen
        name="Home"
        children={this.createDrawer}
        options={({ navigation, route }) => ({
          title: "My WaveDirect",
          headerTitleStyle: { color: "white" },
          headerStyle: { backgroundColor: "#161a1d" },
          headerLeft: () =>
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              style={[{ color: 'white', padding: 15, paddingLeft: 25 }]}
              size={24}
              name={'menu'}
              title="i"
            >
              <Text style={{ fontFamily: "FontAwesome", fontSize: 20, color: "white" }}>{""}</Text>
            </TouchableOpacity>
        })
        }
      />
    </Stack.Navigator>

  createDrawer = () =>
    <Drawer.Navigator drawerStyle={{ backgroundColor: "#161a1d", color: "white" }} drawerContentOptions={{ labelStyle: { color: "white" } }}>
      <Drawer.Screen name="Home" component={Account} />
      <Drawer.Screen name="Outage" component={Outage} />
      <Drawer.Screen name="Refer" component={Refer} />
      <Drawer.Screen name="Logout" component={Logout} /> 
    </Drawer.Navigator>


  render() {

    return (
      <>
        {this.createHomeStack()}
      </>
    );
  }
}

export default Main
