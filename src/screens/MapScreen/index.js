import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

class MapScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>You have (undefined) friends.</Text>
        <Button
          title="Config"
          onPress={() => {
            this.props.navigation.navigate('Configuração');
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
// ...

export default MapScreen;
