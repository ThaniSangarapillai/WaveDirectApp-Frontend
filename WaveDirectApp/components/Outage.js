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
import AsyncStorage from '@react-native-community/async-storage';
import MapView, { Circle } from 'react-native-maps';

export default function Outage() {
  const [userLocation, setUserLocation] = useState({ "lat": 0, "long": 0 });
  const [outageDict, setOutage] = useState([])
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  function arePointsNear(checkPoint, centerPoint, km) {
    var ky = 40000 / 360;
    var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
    var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
    var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= km;
  }

  function getOutages() {
    AsyncStorage.getItem('x-wave-auth', (err, result) => {
      if (result == null) {
        //setErrorMsg("Something went Wrong. Please try again.")
        console.log(err)
      } else {
        //setErrorMsg("Logged in!")
        console.log(result)

        fetch('http://192.168.0.119:5000/outages/get', {
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
            console.log(data);
            setRegion({
              "latitude": parseFloat(data['user_location'][0]), "longitude": parseFloat(data['user_location'][1]), latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            })
            setOutage(data.outages)

            outageDict.forEach((item) => {
              var temp_dict = item['Google Maps latitude/longtitude'].split(',')
              temp_dict = { "lat": parseFloat(temp_dict[0]), "lng": parseFloat(temp_dict[1]) }

              if (arePointsNear({ 'lat': parseFloat(data['user_location'][0]), 'lng': parseFloat(data['user_location'][1]) }, temp_dict, parseFloat(item['Radius (km)']) * 1000)) {
                alert("You are currently in an outage zone!");
              }
            })

          });

      }
    })
  }

  useEffect(() => {
    getOutages()

  }, []);

  return (
    <MapView
      style={{ width: "100%", flex: 1 }}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      region={region}
    //setRegion={region}
    >
      {outageDict.map(dict => {
        var temp_dict = dict['Google Maps latitude/longtitude'].split(',')
        temp_dict = [parseFloat(temp_dict[0]), parseFloat(temp_dict[1])]
        console.log(temp_dict)
        console.log(region)
        return (
          <MapView.Circle
            key={temp_dict[0] + temp_dict[1]}
            center={{ "latitude": parseFloat(temp_dict[0]), "longitude": parseFloat(temp_dict[1]) }}
            radius={parseFloat(dict['Radius (km)']) * 1000}
            strokeWidth={1}
            strokeColor={'#1a66ff'}
            fillColor={'rgba(230,238,255,0.5)'}
          />
        )
      })}
    </MapView>
  );
  // parseFloat(dict['Radius (km)'])
}