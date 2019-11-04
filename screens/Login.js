//Login.js
import React from 'react'
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native'

//import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from 'AsyncStorage'

import Colors from '../constants/Colors'


import { LinearGradient } from 'expo-linear-gradient';


const axios = require('axios')


// LoginScreen.navigationOptions = {
//   headerTitle: 'none'
// };

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



    try {
      const response = await axios.post('http://192.168.0.103:3000/api/auth', {
        email: email,
        password: password
      })

      await AsyncStorage.setItem('storage_Key', response.data)

      if (response.status == '200') this.props.navigation.navigate('App')


    } catch (error) {
      alert(error)
    }


  }

  goToSignup = () => this.props.navigation.navigate('Signup')
  render() {
    const { email, password } = this.state

    return (
      <LinearGradient
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}
        colors={[Colors.MIDDLE_SATURATED_ORANGE, Colors.LIGHT_SATURATED_YELLOW]}
      >

        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={50}
            style={styles.container}
          >

            <View style={styles.card} >
              <View style={{ margin: 10 }}>
                <TextInput
                  name='email'
                  value={email}
                  placeholder='Enter email'
                  autoCapitalize='none'
                  onChangeText={this.handleEmailChange}
                  style={styles.inputEmail}
                // inlineImageLeft='search_icon'
                // selection={{ start: 3, end: 3 }}
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


          </KeyboardAvoidingView>

        </TouchableWithoutFeedback>
      </LinearGradient>


    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputEmail: {

    height: 45,
    width: 245,
    borderColor: Colors.MIDDLE_SATURATED_ORANGE,
    borderWidth: 2,
    borderRadius: 50,
    elevation: 1
  },

  card: {
    backgroundColor: 'white'
  }
})