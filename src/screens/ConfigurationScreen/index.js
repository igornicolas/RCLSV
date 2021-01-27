import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AttributesDisplay from '../../components/AttributesDisplay';
import DefaultButton from '../../components/DefaultButton';
import FormatDate from '../../components/FormatDate';
import api from '../../services/api';
const theme = {
  dark: true,
  colors: {
    primary: '#7DB572',
    accent: '#fff',
    background: '#000',
    text: '#fff',
    placeholder: '#6E6E6E',
  },
};
class ConfigurationScreen extends React.Component {
  state = {user: {}, loading: true};
  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    if (this.props.route.params?.update === true) {
      this.props.navigation.setParams({update: false});
      this.loadData();
    }
  }
  loadData = async () => {
    console.log('rodando loadData');
    const response = await api.get('http://192.168.15.2:3333/user/25');
    this.setState({user: response.data});

    await api
      .get(
        'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
          this.state.user.location.latitude +
          ',' +
          this.state.user.location.longitude +
          '&key=' +
          'AIzaSyC9IaM_sE7wm7c0krWUy2kA3187QmftQDE',
      )
      .then((response) => {
        this.setState({
          user: {
            ...this.state.user,
            address: response.data.results[0].formatted_address,
          },
        });
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <AttributesDisplay label="Nome" value={this.state.user.citizen?.name} />
        <AttributesDisplay
          label="Sobrenome"
          value={this.state.user.citizen?.surname}
        />
        <AttributesDisplay label="CPF" value={this.state.user.citizen?.cpf} />
        <AttributesDisplay
          label="Data de Nascimento"
          value={FormatDate(this.state.user.citizen?.birth_date)}
        />
        <AttributesDisplay
          label="Sexo"
          value={
            this.state.user.citizen?.sex === true ? 'Feminino' : 'Masculino'
          }
        />
        <AttributesDisplay label="E-mail" value={this.state.user.email} />
        <AttributesDisplay label="Endereço" value={this.state.user.address} />
        <View style={{alignItems: 'flex-end', margin: 25}}>
          <DefaultButton
            text="Editar"
            theme={theme}
            style={{
              width: 125,
              height: 40,
              borderRadius: 50,
            }}
            contentStyle={{
              width: 125,
              height: 40,
              borderRadius: 50,
            }}
            onPress={() => {
              this.props.navigation.navigate('Atualizar', {
                user: this.state.user,
                address: this.state.user.address,
              });
            }}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
// ...

export default ConfigurationScreen;
