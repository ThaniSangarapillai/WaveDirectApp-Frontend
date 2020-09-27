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
import MapView from 'react-native-maps';

class Map extends Component {
    getInitialState() {
        return {
          region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        };
      }
      
      onRegionChange(region) {
        this.setState({ region });
      }
      
      render() {
        return (
          <MapView
            region={this.state.region}
            onRegionChange={this.onRegionChange}
          />
        );
      }
}

export default Map
