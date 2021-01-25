import React from 'react';
import Button from 'react-native-paper/lib/commonjs/components/Button';
import {StyleSheet, Text, View, Image} from 'react-native';

const styles = StyleSheet.create({
  socialDistancing: {
    margin: 20,
  },
  label: {
    color: '#548744',
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    color: '#4F4F4F',
    fontSize: 20,

    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function AttributesDisplay(props) {
  return (
    <View style={styles.socialDistancing}>
      <View>
        <Text style={styles.label}>{props.label}</Text>
      </View>
      <View>
        <Text style={styles.value}>{props.value}</Text>
      </View>
    </View>
  );
}
