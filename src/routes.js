import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import InitialScreen from './screens/InitialScreen';
import Screens from './screens';

const Stack = createStackNavigator();

class Routes extends React.Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#000'}}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Initial"
              component={InitialScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={SignInScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Cadastro" component={SignUpScreen} />
            <Stack.Screen
              name="Screens"
              component={Screens}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

export default Routes;

/**
 * with redux
 * import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import MapScreen from './screens/MapScreen';
import Screens from './screens';

const Stack = createStackNavigator();
const authScreens = {
  Login: LoginScreen,
};
const userScreens = {
  Map: MapScreen,
};
var obj = {foo: 'bar', baz: 42};
var anotherone = {yes: 'sir', love: 'you'};
class Routes extends React.Component {
  render() {
    console.log(
      Object.entries({...obj, ...anotherone}).map(([name, component]) => {
        console.log([name, component]);
      }),
    );
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="Screens"
            component={Screens}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Routes;
 */
