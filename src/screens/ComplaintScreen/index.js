import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

class ComplaintScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Config your shit.</Text>
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

export default ComplaintScreen;
