import React from 'react'

import { View, StyleSheet, TextInput } from 'react-native'

import Colors from '../constants/Colors'

import { FontAwesome } from '@expo/vector-icons'


const Input = props => {
  return <View
    {...props}
    // style={styles.inputView}
    style={{ ...styles.props, ...styles.inputView }}
  >
    <FontAwesome name={props.icon_name} size={props.icon_size} color={Colors.MIDDLE_SATURATED_ORANGE} />
    <TextInput
      style={{ ...styles.inputField, ...styles.props }}
      placeholder={props.placeholder}
      name={props.name}
      value={props.value}
      autoCapitalize={props.autoCapitalize}
      onChangeText={props.onChangeText}
      secureTextEntry={props.secureTextEntry}
    />
  </View>
}

const styles = StyleSheet.create({
  inputView: {

    height: 45,
    width: 245,
    borderColor: Colors.MIDDLE_SATURATED_ORANGE,
    borderWidth: 2,
    borderRadius: 50,
    elevation: 1,
    paddingStart: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputField: {
    paddingStart: 8,
  }
})

export default Input