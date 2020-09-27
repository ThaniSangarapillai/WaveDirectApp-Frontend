import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

import { styles } from './styles';

class Home extends React.Component {
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