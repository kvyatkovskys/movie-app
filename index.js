import React, { Component } from  'react';
import { AppRegistry } from 'react-native';
import { Root } from './app/Router';

class App extends Component {
    render() {
        return <Root />;
    }
}

AppRegistry.registerComponent('exprimental', () => App);
