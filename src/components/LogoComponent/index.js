import React from 'react';
import TextInput from 'react-native-paper/lib/commonjs/components/TextInput/TextInput';
import {StyleSheet, Text, View, Image} from 'react-native';

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    margin: 0,
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
});
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
export default function LogoComponent(props) {
  return (
    <View style={styles.logoContainer}>
      <Image
        style={styles.logoImage}
        source={require('../../assets/icon-rclsv.png')}
      />
      <View>
        <Text style={styles.logoText}>RASTREIO</Text>
        <Text style={styles.logoText}>DE CAMINHÕES</Text>
        <Text style={styles.logoText}>DE LIXO</Text>
        <Text style={styles.logoText}>SÃO VICENTE</Text>
      </View>
    </View>
  );
}
