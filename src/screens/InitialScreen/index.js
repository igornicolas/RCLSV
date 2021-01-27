import React from 'react';
import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import {DefaultButton} from '../../components/DefaultButton';
import Button from '../../components/DefaultButton';
import LogoComponent from '../../components/LogoComponent';
import api from '../../services/api';

import AsyncStorage from '@react-native-community/async-storage';

import messaging from '@react-native-firebase/messaging';
class InitialScreen extends React.Component {
  componentDidMount() {
    this.loadData();
    this.checkPermission();
    // Register all listener for notification
  }
  loadData = async () => {
    const token = await AsyncStorage.getItem('token');
    const id = await AsyncStorage.getItem('id');
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    let booleanRedirect = true;
    const verificacaoToken = await api
      .get(`http://192.168.15.2:3333/user/${id}`)
      .catch(function (error) {
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('id');
        console.log(error);
        console.log('excluido');
        booleanRedirect = false;
        return;
      });
    console.log(verificacaoToken);
    console.log(id);
    console.log(token);

    if (booleanRedirect === true) {
      console.log('a porra do suco po');
      this.props.navigation.navigate('Screens');
    }
    /**
    SplashScreen.hide(); */
  };
  checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    // If Premission granted proceed towards token fetch
    console.log('checanu');
    if (enabled) {
      console.log('tem');
      this.getToken();
    } else {
      // If permission hasn’t been granted to our app, request user in requestPermission method.
      this.requestPermission();
    }
  };

  getToken = async () => {
    console.log('peganu');
    this.createListeners();
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    console.log(fcmToken);
    if (!fcmToken) {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  };

  displayNotification(title, body) {
    // we display notification in alert box with title and body
    Alert.alert(
      title,
      body,
      [{text: 'Ok', onPress: () => console.log('ok pressed')}],
      {cancelable: false},
    );
  }

  createListeners = () => {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in the background!', remoteMessage);
    });
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <LogoComponent />
        <Button
          text={'ENTRAR'}
          doAction={() => {
            this.props.navigation.navigate('Login');
          }}
        />
        <Button
          text={'CADASTRAR'}
          doAction={() => {
            this.props.navigation.navigate('Cadastro');
          }}
        />
        <Button
          text={'Trs'}
          doAction={() => {
            this.props.navigation.navigate('Screens');
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 200,
    resizeMode: 'contain',
  },
  logoText: {
    color: '#548744',
    opacity: 1,
    fontSize: 30,
    fontWeight: '700',
    fontStyle: 'normal',
    fontFamily: 'Gill Sans MT',
    textAlign: 'center',
    lineHeight: 30,
  },
  initalButton: {
    backgroundColor: '#7DB572',
    color: '#000',
    minWidth: 200,
    minHeight: 50,
    borderRadius: 5,
    margin: 5,
  },
  labelInitalButton: {
    color: '#000',
    fontSize: 18,
  },
});
// ...

export default InitialScreen;
