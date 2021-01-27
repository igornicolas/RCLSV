import React from 'react';
import {StyleSheet, Text, View, ScrollView, Alert} from 'react-native';
import DefaultInput from '../../components/DefaultInput';
import DefaultButton from '../../components/DefaultButton';
import RadioButton from 'react-native-paper/lib/commonjs/components/RadioButton/RadioButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AdressInput from '../../components/AdressInput';
import {TextInputMask} from 'react-native-masked-text';
import FormatDate from '../../components/FormatDate';

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
class UpdateUser extends React.Component {
  state = {
    value: 'feminino',
    texto: '',
    name: '',
    surname: '',
    cpf: '',
    birth_date: '',
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

  loadData = () => {
    if (this.props.route.params.user) {
      console.log(this.props.route.params.user.location);
      this.setState({
        ...this.state,
        sex: this.props.route.params.user.citizen.sex,
        name: this.props.route.params.user.citizen.name,
        surname: this.props.route.params.user.citizen.surname,
        cpf: this.props.route.params.user.citizen.cpf,
        birth_date: this.props.route.params.user.citizen.birth_date,
        email: this.props.route.params.user.email,
        location: this.props.route.params.user.location,
        address: this.props.route.params.user.address,
      });
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
  update = async () => {
    let success = true;
    await api
      .put('http://192.168.15.2:3333/user/25', {
        name: this.state.name,
        surname: this.state.surname,
        email: this.state.email,
        sex: this.state.sex,
        cpf: this.state.cpf,
        latitude: this.state.location.latitude,
        longitude: this.state.location.longitude,
        birth_date: this.state.birth_date,
      })

      .catch(function (error) {
        success = false;
        console.log(error);
        Alert.alert(
          'Erro',
          'Erro de atualizacao número ' + ' confira os dados e tente novamente',
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
    console.log(success);
    if (success) {
      this.props.navigation.navigate('Configuração', {update: true});
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
            value={FormatDate(this.state.birth_date)}
            onChangeText={(text) => this.setState({birth_date: text})}
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

          <AdressInput
            label="Endereço"
            value={this.props.route.params?.address}
            goToAdress={() => {
              this.props.navigation.navigate('MapaSelector', {
                routeName: 'Atualizar',
              });
            }}
          />

          <DefaultButton
            text="Salvar"
            onPress={() => {
              this.update();
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

export default UpdateUser;
