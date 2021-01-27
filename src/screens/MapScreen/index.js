import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  PermissionsAndroid,
  Image,
  ActivityIndicator,
} from 'react-native';
import MapView, {
  AnimatedRegion,
  Marker,
  PROVIDER_GOOGLE,
  Polyline,
} from 'react-native-maps';
import api from '../../services/api';

import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from 'react-native-geolocation-service';
const precordinates = [
  {latitude: -23.95494555609309, longitude: -46.40691609720025},
  {latitude: -23.954768626983988, longitude: -46.40711679306774},
  {latitude: -23.954856841490308, longitude: -46.40743598307984},
  {latitude: -23.95501122319025, longitude: -46.40753524195495},
  {latitude: -23.955359265513497, longitude: -46.40672919641795},
  {latitude: -23.957582129977073, longitude: -46.40233873115009},
  {latitude: -23.958448326853233, longitude: -46.401504534399386},
  {latitude: -23.959928439678006, longitude: -46.39951797748433},
  {latitude: -23.960659812729514, longitude: -46.39811949185079},
  {latitude: -23.96143601042749, longitude: -46.39714431252035},
  {latitude: -23.961887985336517, longitude: -46.397435583500666},
  {latitude: -23.962314477245283, longitude: -46.393315727828025},
  {latitude: -23.96225567121698, longitude: -46.39276853009918},
  {latitude: -23.96292702791829, longitude: -46.386492532580824},
  {latitude: -23.963412226791938, longitude: -46.38426914146298},
  {latitude: -23.964407216113784, longitude: -46.38171979873309},
  {latitude: -23.96458896087221, longitude: -46.38152422930553},
  {latitude: -23.9666794461179, longitude: -46.37583510194681},
  {latitude: -23.966807841771928, longitude: -46.375863527034404},
  {latitude: -23.968014677861618, longitude: -46.3766101965247},
  {latitude: -23.96474789663427, longitude: -46.38272650803742},
  {latitude: -23.96438380670883, longitude: -46.38338832547681},
  {latitude: -23.964303039255924, longitude: -46.383751467681634},
  {latitude: -23.964452406632574, longitude: -46.38410174656253},
  {latitude: -23.96622940480502, longitude: -46.38527382906323},
  {latitude: -23.96230256110893, longitude: -46.39294933692409},
  {latitude: -23.961913475700687, longitude: -46.39376872741129},
  {latitude: -23.960342722611593, longitude: -46.3968740461347},
  {latitude: -23.957570893792752, longitude: -46.402283462224354},
  {latitude: -23.955347621995937, longitude: -46.40671213695886},
  {latitude: -23.955186767724445, longitude: -46.40691200693766},
  {latitude: -23.955061794646202, longitude: -46.40687679314852},
  {latitude: -23.95501122319025, longitude: -46.40753524195495},
];
const precordinates2 = [
  {latitude: -23.96378965699439, longitude: -46.39015121709128},
  {latitude: -23.96722093457201, longitude: -46.39015920048196},
  {latitude: -23.967215210036773, longitude: -46.3915442513231},
  {latitude: -23.96714674695362, longitude: -46.39173501607185},
  {latitude: -23.968445693329578, longitude: -46.39172427137856},
  {latitude: -23.96842486620118, longitude: -46.39146965693012},
  {latitude: -23.96778520714196, longitude: -46.38859437219606},
  {latitude: -23.96761257063447, longitude: -46.388531064694014},
  {latitude: -23.967293976938556, longitude: -46.38950742426377},
  {latitude: -23.9671983384808, longitude: -46.38965924463729},
  {latitude: -23.967210553749084, longitude: -46.390163455473655},
  {latitude: -23.96832323975821, longitude: -46.39019137729901},
  {latitude: -23.96902448979068, longitude: -46.39017509639873},
  {latitude: -23.96907288298913, longitude: -46.391714669299745},
  {latitude: -23.970023438088724, longitude: -46.3917000935083},
  {latitude: -23.96970968603354, longitude: -46.390155750633774},
  {latitude: -23.9700038062421, longitude: -46.3894396504022},
  {latitude: -23.970283200258304, longitude: -46.38858139339919},
  {latitude: -23.96902422709783, longitude: -46.38856768489152},
  {latitude: -23.969033061430444, longitude: -46.39016376408345},
  {latitude: -23.969633544098365, longitude: -46.39015834548309},
];
const precordinates3 = [
  {latitude: -23.96378965699439, longitude: -46.39015121709128},
  {latitude: -23.96722093457201, longitude: -46.39015920048196},
  {latitude: -23.967215210036773, longitude: -46.3915442513231},
  {latitude: -23.96714674695362, longitude: -46.39173501607185},
  {latitude: -23.968445693329578, longitude: -46.39172427137856},
  {latitude: -23.96842486620118, longitude: -46.39146965693012},
  {latitude: -23.96778520714196, longitude: -46.38859437219606},
  {latitude: -23.96761257063447, longitude: -46.388531064694014},
  {latitude: -23.967293976938556, longitude: -46.38950742426377},
  {latitude: -23.9671983384808, longitude: -46.38965924463729},
  {latitude: -23.967210553749084, longitude: -46.390163455473655},
  {latitude: -23.96832323975821, longitude: -46.39019137729901},
  {latitude: -23.96902448979068, longitude: -46.39017509639873},
  {latitude: -23.96907288298913, longitude: -46.391714669299745},
  {latitude: -23.970023438088724, longitude: -46.3917000935083},
  {latitude: -23.96970968603354, longitude: -46.390155750633774},
  {latitude: -23.9700038062421, longitude: -46.3894396504022},
  {latitude: -23.970283200258304, longitude: -46.38858139339919},
  {latitude: -23.96902422709783, longitude: -46.38856768489152},
  {latitude: -23.969033061430444, longitude: -46.39016376408345},
  {latitude: -23.969633544098365, longitude: -46.39015834548309},
];
const precordinates4 = [
  {latitude: -23.95494555609309, longitude: -46.40691609720025},
  {latitude: -23.954778674694243, longitude: -46.40711385872978},
  {latitude: -23.95481511169924, longitude: -46.40736185804753},
  {latitude: -23.954991172873886, longitude: -46.40754701476658},
  {latitude: -23.955242418175146, longitude: -46.407459842979286},
  {latitude: -23.955825795634013, longitude: -46.40830205659443},
  {latitude: -23.95593977453268, longitude: -46.40833558420492},
  {latitude: -23.956416724889124, longitude: -46.40794507400853},
  {latitude: -23.955941298423767, longitude: -46.407271169005355},
  {latitude: -23.955698633545765, longitude: -46.40713974075857},
  {latitude: -23.955377530843894, longitude: -46.40713974075857},
  {latitude: -23.955284386394368, longitude: -46.406968079388875},
  {latitude: -23.95512934976373, longitude: -46.40688291924654},
  {latitude: -23.95494555609309, longitude: -46.40691609720025},
];
class MapScreen extends React.Component {
  state = {
    id: 21,
    name: 'igor',
    agents: {},
    loading: true,
    routes: [],
    myLocation: {
      latitude: -23.9653817,
      longitude: -46.3885292,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    },
    ws: null,
    userLocation: {
      latitude: -23.9653817,
      longitude: -46.3885292,
    },
  };
  componentDidMount() {
    this.loadData();
    this._handleWebSocketSetup();
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

    const id = await AsyncStorage.getItem('id');
    const responseUser = await api.get('http://192.168.15.2:3333/user/' + id);
    this.setState({
      userLocation: {
        latitude: parseFloat(responseUser.data.location.latitude),
        longitude: parseFloat(responseUser.data.location.longitude),
      },
    });

    const response = await api.get('http://192.168.15.2:3333/routes');
    const routes = response.data.map((route) => {
      route.location.map((location) => {
        location.latitude = parseFloat(location.latitude);
        location.longitude = parseFloat(location.longitude);

        return location;
      });

      return route;
    });
    this.setState({routes});
    this.setState({loading: false});
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
    if (this.state.loading) {
      console.log('carregando');
      return (
        <View style={styles.spinnerView}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      console.log('else');
      return (
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            showsUserLocation={true}
            showsMyLocationButton={true}
            moveOnMarkerPress={true}
            initialRegion={this.state.myLocation}>
            <Marker coordinate={this.state.userLocation} />
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
            {this.state.routes.map((route) => {
              return (
                <Polyline
                  key={route.id + route.name}
                  coordinates={route.location}
                  strokeColor={route.id === 2 ? '#7EB572' : '#00F'}
                  strokeWidth={5}
                />
              );
            })}
            {/**
            <Polyline
              coordinates={precordinates}
              strokeColor={'#7EB572'}
              strokeWidth={5}
            />
            <Polyline
              coordinates={precordinates2}
              strokeColor={'#00F'}
              strokeWidth={5}
            />

            <Polyline
              coordinates={precordinates4}
              strokeColor={'#f0f'}
              strokeWidth={5}
            />*/}
          </MapView>
        </View>
      );
    }
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
  spinnerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
// ...

export default MapScreen;
