import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  PermissionsAndroid,
  Image,
} from 'react-native';
import MapView, {
  AnimatedRegion,
  Marker,
  PROVIDER_GOOGLE,
  Polyline,
} from 'react-native-maps';
import api from '../../services/api';

import Geolocation from 'react-native-geolocation-service';
const precordinates = [
  {latitude: -23.95494555609309, longitude: -46.40691609720025},
  {latitude: -23.954778674694243, longitude: -46.40711385872978},
  {latitude: -23.95481511169924, longitude: -46.40736185804753},
  {latitude: -23.954991172873886, longitude: -46.40754701476658},
  {latitude: -23.955242418175146, longitude: -46.407459842979286},
  {latitude: -23.955825795634013, longitude: -46.40830205659443},
  {latitude: -23.95593977453268, longitude: -46.40833558420492},
  {latitude: -23.956340884037683, longitude: -46.40801603061602},
  {latitude: -23.956646868794202, longitude: -46.40845859481817},
  {latitude: -23.957358906598078, longitude: -46.40947340178722},
  {latitude: -23.95744436501644, longitude: -46.40940285461236},
  {latitude: -23.956748855152497, longitude: -46.40840976672343},
  {latitude: -23.956416724889124, longitude: -46.40794507400853},
  {latitude: -23.955941298423767, longitude: -46.407271169005355},
  {latitude: -23.966634101067374, longitude: -46.40713974075857},
  {latitude: -23.955698633545765, longitude: -46.40713974075857},
  {latitude: -23.955284386394368, longitude: -46.406968079388875},
  {latitude: -23.95512934976373, longitude: -46.40688291924654},
  {latitude: -23.95494555609309, longitude: -46.40691609720025},
];
class MapScreen extends React.Component {
  state = {
    id: 21,
    name: 'igor',
    agents: {},
    routes: [],
    myLocation: {
      latitude: -23.9653817,
      longitude: -46.3885292,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    },
    ws: null,
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
      console.log('You can use the location');
    } else {
      console.log('location permission denied');
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
        //console.log('minha localização => ', this.state.myLocation);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 1000},
    );
    /**
    const response = await api.get('http://192.168.15.2:3333/routes');
    const routes = response.data.map((route) => {
      route.location.map((location) => {
        location.latitude = parseFloat(location.latitude);
        location.longitude = parseFloat(location.longitude);

        return location;
      });

      return route;
    });
    this.setState({routes}); */
  };
  send = (data) => this.state.ws.send(data);

  _handleWebSocketSetup = () => {
    const ws = new WebSocket(
      'ws://192.168.15.2:3333?name=' +
        this.state.name +
        '&id=' +
        this.state.id +
        '&mobile=true',
    );
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: 'requestLocations',
        }),
      );
      console.log('webscoket conectado');
    };
    ws.onmessage = (message) => {
      const messageData = JSON.parse(message.data);
      if (messageData.type === 'geolocation') {
        const {lat, lng, name} = messageData;

        const oldLocation = this.state.agents;
        const newLocation = {
          lat,
          lng,
        };

        oldLocation[name] = newLocation;
        this.setState({agents: oldLocation});
      } else if (messageData.type === 'responseLocations') {
        const {agents} = messageData;

        const oldLocation = this.state.agents;
        Object.keys(agents).forEach((agent) => {
          const {lat, lng, name} = agents[agent];

          const newLocation = {
            lat,
            lng,
          };

          oldLocation[name] = newLocation;
        });

        this.setState({agents: oldLocation});
      }
      console.log(this.state.agents);
    };
    ws.onerror = (error) => {
      this.props.onError && this.props.onError(error);
    };
    ws.onclose = () =>
      this.reconnect
        ? this._handleWebSocketSetup()
        : this.props.onClose && this.props.onClose();
    this.setState({ws});
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
          {Object.keys(this.state.agents).map((agent, key) => {
            const nome = agent.split('-')[0];
            const agents = this.state.agents;
            const coordinate = {
              latitude: agents[agent].lat,
              longitude: agents[agent].lng,
              latitudeDelta: 0.04,
              longitudeDelta: 0.05,
            };
            return (
              <Marker key={agents[agent] + key} coordinate={coordinate}>
                <View>
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                      resizeMode: 'contain',
                      margin: 0,
                    }}
                    source={require('../../assets/truckIcon.png')}
                  />
                </View>
              </Marker>
            );
          })}

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
