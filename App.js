import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import Routes from './src/routes';

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return <Routes />;
  }
}

export default App;
