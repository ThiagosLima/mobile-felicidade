import React, { Component } from 'react'

import { View, StyleSheet, TextInput } from 'react-native'

import Colors from '../constants/Colors'

const Input = props => {
  return <TextInput
    {...props}
    style={{ ...styles.props, ...styles.inputEmail }}


  // inlineImageLeft='search_icon'
  // selection={{ start: 3, end: 3 }}
  />
}

const styles = StyleSheet.create({
  inputEmail: {

    height: 45,
    width: 245,
    borderColor: Colors.MIDDLE_SATURATED_ORANGE,
    borderWidth: 2,
    borderRadius: 50,
    elevation: 1
  }
})

export default Input