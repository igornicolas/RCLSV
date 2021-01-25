import React from 'react';
import {StyleSheet, Text, View, Button, PermissionsAndroid} from 'react-native';
import MapView, {
  AnimatedRegion,
  Marker,
  PROVIDER_GOOGLE,
  Polyline,
} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
const precordinates = [
  {latitude: -23.966463874855194, longitude: -46.38237548461752},
  {latitude: -23.966918566727227, longitude: -46.38145047108596},
  {latitude: -23.965945057811158, longitude: -46.380831668930384},
  {latitude: -23.971762684489853, longitude: -46.36943167387267},
  {latitude: -23.970404484526505, longitude: -46.36861510991492},
  {latitude: -23.96988568334417, longitude: -46.365827310501096},
  {latitude: -23.967908891768086, longitude: -46.3494094340385},
];
class MapScreen extends React.Component {
  state = {
    myLocation: {
      latitude: -23.9653817,
      longitude: -46.3885292,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    },
  };
  componentDidMount() {
    this.loadData();
  }
  loadData = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          myLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
        });
        console.log('minha localização => ', this.state.myLocation);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 1000},
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton={true}
          moveOnMarkerPress={true}
          region={this.state.myLocation}>
          <Marker coordinate={this.state.myLocation} />
          <Polyline
            coordinates={precordinates}
            strokeColor={'#ff0001'}
            strokeWidth={5}
          />
        </MapView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
// ...

export default MapScreen;
