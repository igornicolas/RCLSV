import React from 'react';
import Button from 'react-native-paper/lib/commonjs/components/Button';
import {StyleSheet, Text, View, Image} from 'react-native';

const styles = StyleSheet.create({
  initalButton: {
    backgroundColor: '#7DB572',
    color: '#000',
    minWidth: 200,
    minHeight: 50,
    borderRadius: 5,
    margin: 5,
  },
  labelInitalButton: {
    color: '#000',
    fontSize: 18,
  },
});

export default function DefaultButton(props) {
  return (
    <View>
      <Button
        mode="contained"
        style={styles.initalButton}
        contentStyle={styles.initalButton}
        labelStyle={styles.labelInitalButton}
        onPress={() => {
          props.doAction();
        }}>
        {props.text}
      </Button>
    </View>
  );
}
