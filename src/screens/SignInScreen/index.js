/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Button,
  TextInput,
  Text,
} from 'react-native';
import DefaultInput from '../../components/DefaultInput';
import DefaultButton from '../../components/DefaultButton';
import LogoComponent from '../../components/LogoComponent';
//import AsyncStorage from '@react-native-community/async-storage';
//import SplashScreen from 'react-native-splash-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 25,
  },
  forget: {
    color: '#548744',
  },
});
export default class SignInScreen extends Component {
  state = {token: null, loginText: '', senhaText: ''};

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    /**  const id = await AsyncStorage.getItem('id');
    const token = await AsyncStorage.getItem('token');
    const name = await AsyncStorage.getItem('name');
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    let booleanRedirect = true;
    console.log('me oi');
    const verificacaoToken = await api
      .get(`/user/${id}`)
      .catch(function (error) {
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('auth');
        AsyncStorage.removeItem('id');
        AsyncStorage.removeItem('permission');
        console.log(error);
        console.log('excluido');
        booleanRedirect = false;
        return;
      });
    console.log('eu me odeio');
    console.log(verificacaoToken);
    console.log(id);
    console.log(token);

    if (booleanRedirect === true) {
      this.props.navigation.navigate('pages', {id: id, name: name});
    }

    SplashScreen.hide(); */
  };

  Login = async () => {
    /**
    const response = await api
      .post('/login', {
        email: this.state.loginText,
        password: this.state.senhaText,
      })
      .catch(function (error) {
        Alert.alert(
          'Erro',
          'Erro de login número ' +
            error.response.status +
            ' confira o login e senha e tente novamente',
          [
            {
              text: 'Ok',
              onPress: () => {},
            },
          ],
          {cancelable: false},
        );
        return;
      });
    const {token, auth, id, permission} = await response.data;
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('auth');
      await AsyncStorage.removeItem('id');
      await AsyncStorage.removeItem('permission');
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('permission', permission.toString());
      await AsyncStorage.setItem('auth', auth.toString());
      await AsyncStorage.setItem('id', id.toString());

      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } catch (err) {
      console.log(err);
    }

    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    const response2 = await api.get(`/user/${id}`);
    console.log(response2.data);
    const {Technician, name} = response2.data;
    const booleanTechnician = Technician !== null;

    try {
      await AsyncStorage.removeItem('technician');
      await AsyncStorage.removeItem('name');

      await AsyncStorage.setItem('technician', booleanTechnician.toString());

      await AsyncStorage.setItem('name', name);
      console.log('tec');
      console.log(booleanTechnician);
    } catch (err) {
      console.log(err);
    }

    this.props.navigation.navigate(
      'pages',
      {params: {vida: 'merda', name: name, id: id}},
      {params: {vida: 'merda', name: name, id: id}},
    );
    this.props.navigation.setParams(
      'pages',
      {params: {vida: 'merda', name: name, id: id}},
      {params: {vida: 'merda', name: name, id: id}},
    ); */
  };

  render() {
    return (
      <View style={styles.container}>
        <LogoComponent />
        <DefaultInput label="Email" />
        <DefaultInput label="Senha" />
        <Text style={styles.forget}>Esqueci a senha</Text>
        <DefaultButton text="Entrar" />
      </View>
    );
  }
}
