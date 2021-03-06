import React from 'react';
import {StyleSheet, Text, View, ScrollView, Alert} from 'react-native';
import DefaultInput from '../../components/DefaultInput';
import DefaultButton from '../../components/DefaultButton';
import RadioButton from 'react-native-paper/lib/commonjs/components/RadioButton/RadioButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AdressInput from '../../components/AdressInput';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
import {TextInputMask} from 'react-native-masked-text';
import TextInput from 'react-native-paper/lib/commonjs/components/TextInput/TextInput';
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
    fcmToken: '',
    name: '',
    surname: '',
    cpf: '',
    cpfRaw: '',
    birth_date: '',
    birth_dateRaw: '',
    sex: true,
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

  loadData = async () => {
    try {
      const fcmToken = await AsyncStorage.getItem('fcmToken');

      console.log(fcmToken);
      this.setState({fcmToken});
      //api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } catch (err) {
      console.log(err);
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
    let validation = true;
    const isValidDate = this.datetimeField.isValid();
    const isValidCpf = true;
    if (!isValidDate) {
      validation = false;
      Alert.alert(
        'Erro',
        'A data inserida não é válida!',
        [
          {
            text: 'Ok',
            onPress: () => {},
          },
        ],
        {cancelable: false},
      );
    }
    if (!isValidCpf) {
      validation = false;
      Alert.alert(
        'Erro',
        'O CPF inserido não é válido!',
        [
          {
            text: 'Ok',
            onPress: () => {},
          },
        ],
        {cancelable: false},
      );
    }
    console.log(isValidDate);
    console.log(isValidCpf);
    const unmaskedCpf = this.cpfField.getRawValue();
    const unmaskedDate = this.datetimeField.getRawValue();
    const date = new Date(unmaskedDate);
    console.log(date);

    let booleanRedirect = true;
    if (validation) {
      const response = await api
        .post('http://192.168.15.2:3333/user', {
          name: this.state.name,
          isWhat: 'citizen',
          surname: this.state.surname,
          email: this.state.email,
          password: this.state.password,
          sex: this.state.sex,
          cpf: unmaskedCpf,
          latitude: this.state.location.latitude,
          notification: true,
          longitude: this.state.location.longitude,
          birth_date: date,
          token: this.state.fcmToken,
        })
        .catch(function (error) {
          console.log(error);
          booleanRedirect = false;
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
      if (booleanRedirect) {
        console.log(response.data.id);
        const id = await AsyncStorage.setItem(
          'id',
          response.data.id.toString(),
        );

        const isWhat = await AsyncStorage.setItem('isWhat', 'citizen');

        console.log(id);
        console.log(isWhat);
        this.props.navigation.navigate('Screens');
      }
    }
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
            render={(props) => (
              <TextInputMask
                {...props}
                ref={(ref) => (this.cpfField = ref)}
                type={'cpf'}
                style={{color: '#fff'}}
                value={this.state.cpf}
                onChangeText={(text) => {
                  this.setState({
                    cpf: text,
                  });
                }}
              />
            )}
            value={this.state.cpf}
            onChangeText={(text) => this.setState({cpf: text})}
          />
          <DefaultInput
            label="Data de Nascimento"
            value={this.state.birth_date}
            onChangeText={(text) => this.setState({birth_date: text})}
            render={(props) => (
              <TextInputMask
                {...props}
                type={'datetime'}
                options={{
                  format: 'DD/MM/YYYY',
                }}
                style={{color: '#fff'}}
                value={this.state.birth_date}
                onChangeText={(text) => {
                  this.setState({
                    birth_date: text,
                  });
                }}
                // add the ref to a local var
                ref={(ref) => (this.datetimeField = ref)}
              />
            )}
          />

          <RadioButton.Group
            value={this.state.sex}
            onValueChange={(value) => this.setState({sex: value})}>
            <Text style={{flex: 3, color: '#9F9F9F'}}>Sexo:</Text>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton value={true} theme={theme} />
              <Text style={{flex: 3, color: '#7DB572'}}>Feminino</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton value={false} theme={theme} />
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
              this.props.navigation.navigate('MapaSelector', {
                routeName: 'Cadastro',
              });
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
