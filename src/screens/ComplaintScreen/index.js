import React from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import DefaultInput from '../../components/DefaultInput';
import DefaultButton from '../../components/DefaultButton';
import AdressInput from '../../components/AdressInput';
import {Picker} from '@react-native-picker/picker';
import api from '../../services/api';
class ComplaintScreen extends React.Component {
  state = {
    description: '',
    types: [],
    type: {id: '', name: ''},
    address: {latitude: '', longitude: ''},
  };
  componentDidMount() {
    this.loadData();
  }
  loadData = async () => {
    const response = await api.get('http://192.168.15.2:3333/type');
    this.setState({types: response.data});
  };
  CreateComplaint = async () => {
    const response = await api
      .post('http://192.168.15.2:3333/complaint', {
        type_id: this.state.type.id,
        description: this.state.description,
        latitude: this.state.address.latitude,
        longitude: this.state.address.longitude,
      })
      .then((response) => {
        Alert.alert(
          'Denúncia',
          'Sua denúncia foi criada com sucesso!',
          [{text: 'Ok', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#6C6C6C',
            borderRadius: 5,
            margin: 5,
          }}>
          <Picker
            selectedValue={this.state.type}
            mode={'dropdown'}
            style={{
              minWidth: 200,
              minHeight: 50,
              borderRadius: 5,
              margin: 5,
              color: '#fff',
            }}
            placeholder={'Categoria'}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({type: itemValue})
            }>
            {this.state.types.map((ctgry) => {
              return (
                <Picker.Item
                  key={ctgry.id + ctgry.name}
                  label={ctgry.name}
                  value={ctgry}
                />
              );
            })}
          </Picker>
        </View>
        <DefaultInput
          label="Descrição"
          value={this.state.description}
          multiline={true}
          numberOfLines={10}
          onChangeText={(text) => this.setState({description: text})}
        />
        <AdressInput
          label="Endereço"
          value={this.props.route.params?.address}
          goToAdress={() => {
            this.props.navigation.navigate('MapaSelector', {
              routeName: 'Denuncia',
            });
          }}
        />
        <DefaultButton
          text={'Enviar'}
          onPress={() => {
            this.CreateComplaint();
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
    padding: 25,
  },
});
// ...

export default ComplaintScreen;
