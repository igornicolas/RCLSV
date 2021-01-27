/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
import DefaultInput from '../../components/DefaultInput';
import DefaultButton from '../../components/DefaultButton';
import LogoComponent from '../../components/LogoComponent';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
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
  state = {token: null, emailText: '', passwordText: ''};

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
    console.log(this.state.passwordText);
    console.log(this.state.emailText);
    let logado = true;
    const response = await api
      .post('http://192.168.15.2:3333/login', {
        email: this.state.emailText,
        password: this.state.passwordText,
      })
      .catch(function (error) {
        logado = false;
        Alert.alert(
          'Erro',
          'Erro de login número ' +
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
    if (logado) {
      console.log('ainda passa');
      console.log(response.data);
      const {token, id} = await response.data;
      try {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('id');
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('id', id.toString());

        //api.defaults.headers.common.Authorization = `Bearer ${token}`;
      } catch (err) {
        console.log(err);
      }
      console.log(id);

      const response2 = await api.get(`http://192.168.15.2:3333/user/${id}`);
      console.log(response2.data);
      const {citizen, truck} = response2.data;
      await AsyncStorage.removeItem('isWhat');
      if (truck == null) {
        /**
            await AsyncStorage.removeItem('name');
            await AsyncStorage.removeItem('plate');

            await AsyncStorage.setItem('name', citizen.name); */
        await AsyncStorage.setItem('isWhat', 'citizen');
        console.log(citizen);
      }
      if (citizen == null) {
        //await AsyncStorage.setItem('plate', truck.plate);
        await AsyncStorage.setItem('isWhat', 'truck');
      }
      this.props.navigation.navigate('Screens');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <LogoComponent />
        <DefaultInput
          autoCompleteType="email"
          keyboardType="email-address"
          label="Email"
          autoCapitalize="none"
          onChangeText={(text) => this.setState({emailText: text})}
        />
        <DefaultInput
          secureTextEntry={true}
          autoCompleteType="password"
          textContentType="password"
          label="Senha"
          onChangeText={(text) => {
            this.setState({passwordText: text});
          }}
        />
        <Text style={styles.forget}>Esqueci a senha</Text>
        <DefaultButton
          text="Entrar"
          onPress={() => {
            this.Login();
          }}
        />
      </View>
    );
  }
}
