import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {DefaultButton} from '../../components/DefaultButton';
import Button from '../../components/DefaultButton';
import LogoComponent from '../../components/LogoComponent';
class InitialScreen extends React.Component {
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
            this.props.navigation.navigate('MapaSelector');
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
