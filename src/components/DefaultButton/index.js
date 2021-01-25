import React from 'react';
import Button from 'react-native-paper/lib/commonjs/components/Button';
import {StyleSheet, Text, View, Image} from 'react-native';

export default function DefaultButton(props) {
  const styles = StyleSheet.create({
    initalButton: {
      backgroundColor: '#7DB572',
      color: '#000',
      minWidth: 200,
      minHeight: 45,

      borderRadius: 5,
      margin: 5,
    },

    labelInitalButton: {
      color: '#000',
      fontSize: 18,
    },
  });
  return (
    <View>
      <Button
        mode="contained"
        style={styles.initalButton}
        contentStyle={styles.initalButton}
        labelStyle={styles.labelInitalButton}
        onPress={() => {
          props.doAction();
        }}
        {...props}>
        {props.text}
      </Button>
    </View>
  );
}
