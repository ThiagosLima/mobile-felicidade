import React from 'react'

import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import Input from './Input'


onPress = () => {
  alert('Clicked')
}

const HeaderLogin = () => {
  return <View style={styles.header}>
    <View style={styles.buttons}>
      <TouchableOpacity onPress={this.onPress}><Text style={{ color: 'white', fontWeight: 'bold' }}>Entrar</Text></TouchableOpacity>
      <TouchableOpacity><Text style={{ color: '#C4C4C4' }}>Cadastrar</Text></TouchableOpacity>

    </View>
    <View style={styles.card}>
      <Input
        value='Anderson'
        name='email'
        value={'Teste'}
        placeholder='Enter email'
        autoCapitalize='none'
      // onChangeText={this.handleEmailChange} 
      />
      <Input />
      <Input />
      <Input />
    </View>
  </View>
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue'
  },
  card: {

    width: '70%',
    height: '60%',
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 20
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 8
  }
})


export default HeaderLogin;