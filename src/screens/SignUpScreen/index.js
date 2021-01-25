import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import DefaultInput from '../../components/DefaultInput';
import DefaultButton from '../../components/DefaultButton';
import RadioButton from 'react-native-paper/lib/commonjs/components/RadioButton/RadioButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AdressInput from '../../components/AdressInput';

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
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.viewSwag}>
          <DefaultInput label="Nome" />
          <DefaultInput label="Sobrenome" />
          <DefaultInput label="CPF" />
          <DefaultInput label="Data de Nascimento" />
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
          <DefaultInput label="E-mail" />
          <DefaultInput label="Senha" secureTextEntry={true} />
          <DefaultInput label="Confirmar Senha" />

          <AdressInput
            label="Endereço"
            goToAdress={() => {
              this.props.navigation.navigate('MapaSelector');
            }}
          />

          <DefaultButton
            text="Salvar"
            doAction={() => {
              this.props.navigation.navigate('Screens');
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
