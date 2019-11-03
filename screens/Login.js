//Login.js
import React from 'react'
import { StyleSheet, View, Button, TextInput } from 'react-native'
//import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from 'AsyncStorage'


const axios = require('axios')

export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
    spinner: false
  }

  

  handleEmailChange = email => {
    this.setState({ email })
  }

  handlePasswordChange = password => {
    this.setState({ password })
  }

  onLogin = async () => {
    const { email, password } = this.state
    

    
    try{
      const response = await axios.post('http://192.168.0.103:3000/api/auth', {
        email : email,
        password : password
      })

      await AsyncStorage.setItem('storage_Key', response.data)

      if(response.status == '200') this.props.navigation.navigate('App')

      
    }catch (error){
      alert(error)
    }
  
    
  }

  goToSignup = () => this.props.navigation.navigate('Signup')
  render() {
    const { email, password } = this.state

    return (
      <View style={styles.container}>
        <View style={{ margin: 10 }}>
          <TextInput
            name='email'
            value={email}
            placeholder='Enter email'
            autoCapitalize='none'
            onChangeText={this.handleEmailChange}
          />
        </View>
        <View style={{ margin: 10 }}>
          <TextInput
            name='password'
            value={password}
            placeholder='Enter password'
            secureTextEntry
            onChangeText={this.handlePasswordChange}
          />
        </View>
        <Button title='Login' onPress={this.onLogin} />
        <Button title='Go to Signup' onPress={this.goToSignup} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})