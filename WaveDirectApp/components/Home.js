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

  //   return (
  //     <>
  //       <Header
  //         leftComponent={{
  //           icon: 'menu',
  //           color: '#fff',
  //           onPress: () => clickHandler(),
  //         }}
  //         centerComponent={{text: title, style: {color: '#fff'}}}
  //         rightComponent={{icon: 'home', color: '#fff'}}
  //       />
  //       <View style={styles.container}></View>
  //     </>

  //   );

  function HomeScreen({navigation}) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button
          onPress={() => navigation.navigate('Notifications')}
          title="Go to notifications"
        />
      </View>
    );
  }

  function NotificationsScreen({navigation}) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button onPress={() => navigation.goBack()} title="Go back home" />
      </View>
    );
  }

  const Drawer = createDrawerNavigator();

  function App() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
  },
});

export default App;
// export default Home;
