import React from 'react';
import TextInput from 'react-native-paper/lib/commonjs/components/TextInput/TextInput';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  inputStyle: {
    minWidth: 200,
    minHeight: 50,
    borderRadius: 5,
    margin: 5,
    color: '#fff',
  },
  labelInitalButton: {
    color: '#fff',
    fontSize: 18,
  },
});
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
export default function AdressInput(props) {
  return (
    <View style={styles.inputStyle}>
      <TextInput
        {...props}
        mode="outlined"
        label={props.label}
        onFocus={() => {
          props.goToAdress();
        }}
        showSoftInputOnFocus={false}
        onChangeText={(text) => console.log(text)}
        selectionColor="#7DB572"
        style={styles.inputStyle}
        theme={theme}
      />
    </View>
  );
}
