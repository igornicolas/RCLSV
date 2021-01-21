import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import DefaultInput from '../../components/DefaultInput';
import DefaultButton from '../../components/DefaultButton';
import RadioButton from 'react-native-paper/lib/commonjs/components/RadioButton/RadioButton';
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
            theme={theme}
            onValueChange={(newValue) => this.setState({value: newValue})}
            value={this.state.value}>
            <View>
              <RadioButton value="feminino" />
            </View>
            <View>
              <RadioButton value="masculino" />
            </View>
          </RadioButton.Group>
          <DefaultInput label="E-mail" />
          <DefaultInput label="Senha" secureTextEntry={true} />
          <DefaultInput label="Confirmar Senha" />
          <DefaultInput label="Endereço" />
          <DefaultButton text="Salvar" />
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
