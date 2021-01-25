import React from 'react';
import {StyleSheet, View} from 'react-native';
import DefaultInput from '../../components/DefaultInput';
import DefaultButton from '../../components/DefaultButton';

class ComplaintScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <DefaultInput label="Categoria" />
        <DefaultInput label="Email" multiline={true} numberOfLines={10} />
        <DefaultInput label="Endereço" />
        <DefaultButton text={'Enviar'} />
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

export default ComplaintScreen;
