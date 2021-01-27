import React from 'react';
import {StyleSheet, Text, View, ScrollView, Alert} from 'react-native';
import DefaultInput from '../../components/DefaultInput';
import DefaultButton from '../../components/DefaultButton';
import RadioButton from 'react-native-paper/lib/commonjs/components/RadioButton/RadioButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AdressInput from '../../components/AdressInput';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
const theme = {
  colors: {
    primary: '#7DB572',
    accent: '#7DB572',
    text: '#9F9F9F',
    placeholder: '#9F9F9F',
    color: '#9F9F9F',
    background: '#9F9F9F',
  },
};
class SignUpScreen extends React.Component {
  state = {
    value: 'feminino',
    texto: '',
    name: '',
    surname: '',
    cpf: '',
    birth_date: '',
    sex: false,
    email: '',
    password: '',
    confirmationPassword: '',
    location: {
      latitude: '',
      longitude: '',
    },
  };
  componentDidMount() {
    this.loadData();
    console.log('montei cadastro');
  }

  loadData = () => {
    if (this.props.route.params) {
      console.log(this.props.route.params);
    }
  };
  componentDidUpdate() {
    console.log('atualizei cadastro');
    if (
      (this.props.route.params?.location?.latitude !==
        this.state.location.latitude ||
        this.props.route.params?.location?.longitude !==
          this.state.location.longitude) &&
      this.props.route.params?.location !== undefined
    ) {
      console.log('MUDANDO O STATE LOCATION');
      this.setState({location: this.props.route.params.location});
    }
    console.log(this.state.location);
  }
  signUp = async () => {
    const response = await api
      .post('http://192.168.15.2:3333/user', {
        name: this.state.name,
        surname: this.state.surname,
        email: this.state.email,
        password: this.state.password,
        sex: this.state.sex,
        cpf: this.state.cpf,
        latitude: this.state.location.latitude,
        longitude: this.state.location.longitude,
        birth_date: this.state.birth_date,
        token: this.state.token,
      })
      .catch(function (error) {
        Alert.alert(
          'Erro',
          'Erro de cadastro número ' + ' confira os dados e tente novamente',
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

    this.props.navigation.navigate('Screens');
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.viewSwag}>
          <DefaultInput
            label="Nome"
            value={this.state.name}
            onChangeText={(text) => this.setState({name: text})}
          />
          <DefaultInput
            label="Sobrenome"
            value={this.state.surname}
            onChangeText={(text) => this.setState({surname: text})}
          />
          <DefaultInput
            label="CPF"
            value={this.state.cpf}
            onChangeText={(text) => this.setState({cpf: text})}
          />
          <DefaultInput
            label="Data de Nascimento"
            value={this.state.birth_date}
            onChangeText={(text) => this.setState({birth_date: text})}
          />
          <RadioButton.Group
            value={this.state.value}
            onValueChange={(value) => this.setState({value})}>
            <Text style={{flex: 3, color: '#9F9F9F'}}>Sexo:</Text>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton value="feminino" theme={theme} />
              <Text style={{flex: 3, color: '#7DB572'}}>Feminino</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton value="masculino" theme={theme} />
              <Text style={{flex: 3, color: '#7DB572'}}>Masculino</Text>
            </View>
          </RadioButton.Group>
          <DefaultInput
            label="E-mail"
            value={this.state.email}
            onChangeText={(text) => this.setState({email: text})}
          />
          <DefaultInput
            label="Senha"
            value={this.state.password}
            secureTextEntry={true}
            onChangeText={(text) => this.setState({password: text})}
          />
          <DefaultInput
            label="Confirmar Senha"
            secureTextEntry={true}
            value={this.state.confirmationPassword}
            onChangeText={(text) => this.setState({confirmationPassword: text})}
          />

          <AdressInput
            label="Endereço"
            value={this.props.route.params?.address}
            goToAdress={() => {
              this.props.navigation.navigate('MapaSelector');
            }}
          />

          <DefaultButton
            text="Salvar"
            onPress={() => {
              this.signUp();
            }}
          />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  viewSwag: {
    padding: 25,
  },
});
// ...

export default SignUpScreen;
