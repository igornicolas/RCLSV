import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MapScreen from './MapScreen';
import ConfigurationScreen from './ConfigurationScreen';
import ComplaintScreen from './ComplaintScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Tab = createBottomTabNavigator();
class Screens extends React.Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Mapa"
          component={MapScreen}
          options={{
            tabBarLabel: 'Mapa',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="map" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Configuração"
          component={ConfigurationScreen}
          options={{
            tabBarLabel: 'Perfil',
            tabBarIcon: ({color, size}) => (
              <AntDesign name="user" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Denuncia"
          component={ComplaintScreen}
          options={{
            tabBarLabel: 'Denúncia',
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="campaign" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
// ...

export default Screens;
