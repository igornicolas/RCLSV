import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AttributesDisplay from '../../components/AttributesDisplay';
class ConfigurationScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AttributesDisplay label="Nome" value={'Igor'} />
        <AttributesDisplay label="Sobrenome" value={'Nicolas'} />
        <AttributesDisplay label="CPF" value={'98549841'} />
        <AttributesDisplay label="Data de Nascimento" value={'20/02/2020'} />
        <AttributesDisplay label="Sexo" value={'Masculino'} />
        <AttributesDisplay label="E-mail" value={'igornicolas@gmail.com'} />
        <AttributesDisplay
          label="Endereço"
          value={'Avenida Presidente Wilson, 1495'}
        />
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
