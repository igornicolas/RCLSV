import React, {Component} from 'react';
import {Text, View, ActivityIndicator, Button} from 'react-native';
import MapView from 'react-native-maps';
import styles from './styles';
import api from '../../services/api';
import Geolocation from 'react-native-geolocation-service';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DefaultButton from '../../components/DefaultButton';
console.disableYellowBox = true;
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
export default class MapSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      adress: '',
      region: {
        latitude: 10,
        longitude: 10,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      },
      isMapReady: false,
      marginTop: 1,
      userLocation: '',
      regionChangeProgress: false,
    };
  }

  componentWillMount() {
    Geolocation.getCurrentPosition(
      (position) => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        };
        this.setState({
          region: region,
          loading: false,
          error: null,
        });
      },
      (error) => {
        alert(error);
        this.setState({
          error: error.message,
          loading: false,
        });
      },
      {enableHighAccuracy: false, timeout: 200000, maximumAge: 5000},
    );
  }

  onMapReady = () => {
    this.setState({isMapReady: true, marginTop: 0});
  };

  // Fetch location details as a JOSN from google map API
  fetchAddress = () => {
    const a = api
      .get(
        'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
          this.state.region.latitude +
          ',' +
          this.state.region.longitude +
          '&key=' +
          'AIzaSyC9IaM_sE7wm7c0krWUy2kA3187QmftQDE',
      )
      .then((response) =>
        this.setState({adress: response.data.results[0].formatted_address}),
      );
  };

  // Update state on region change
  onRegionChange = (region) => {
    this.setState(
      {
        region,
        regionChangeProgress: true,
      },
      () => this.fetchAddress(),
    );
  };

  // Action to be taken after select location button click
  onLocationSelect = () => {
    this.props.navigation.navigate('Cadastro');
    //alert(this.state.adress);
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.spinnerView}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={{flex: 2}}>
            {!!this.state.region.latitude && !!this.state.region.longitude && (
              <MapView
                style={{...styles.map, marginTop: this.state.marginTop}}
                initialRegion={this.state.region}
                showsUserLocation={true}
                onMapReady={this.onMapReady}
                onRegionChangeComplete={this.onRegionChange}>
                {/* <MapView.Marker
                  coordinate={{ "latitude": this.state.region.latitude, "longitude": this.state.region.longitude }}
                  title={"Your Location"}
                  draggable
                /> */}
              </MapView>
            )}

            <View style={styles.mapMarkerContainer}>
              <Ionicons name="location-sharp" size={50} color={'#548744'} />
            </View>
          </View>
          <View style={styles.deatilSection}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                fontFamily: 'roboto',
                marginBottom: 20,
                color: '#548744',
              }}>
              Selecione seu endereço
            </Text>
            <Text style={{fontSize: 10, color: '#999'}}>Endereço</Text>
            <Text
              numberOfLines={2}
              style={{
                fontSize: 14,
                paddingVertical: 10,
                borderBottomColor: 'silver',
                borderBottomWidth: 0.5,
                color: '#fff',
              }}>
              {this.state.adress}
            </Text>
            <DefaultButton
              text="Salvar"
              doAction={this.onLocationSelect}
              theme={theme}
              style={{
                height: 40,
              }}
              contentStyle={{
                height: 40,
              }}
            />
          </View>
        </View>
      );
    }
  }
}
