//Login.js
import React from 'react'
import {
  StyleSheet,
  View,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  Alert
} from 'react-native'

import AsyncStorage from 'AsyncStorage'
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../constants/Colors'
import Addresses from '../constants/Addresses'
import Input from '../components/Input'
import Button from '../components/Button'

const axios = require('axios')


export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
    name: '',
    spinner: false,
    confirmPassword: ''
  }

  handleEmailChange = email => {
    this.setState({ email })
  }

  handlePasswordChange = password => {
    this.setState({ password })
  }

  handleConfirmPasswordChange = confirmPassword => {

    this.setState({ confirmPassword })
  }

  handleNameChange = name => {
    this.setState({ name })
  }

  setModal(visible) {
    this.setState({ spinner: visible });
  }

  onLogin = async () => {
    const { email, password, name, confirmPassword, spinner } = this.state

    if (confirmPassword != password) {
      Alert.alert('Erro', 'As senhas são diferentes')
      return
    }

    try {

      this.setModal(!this.state.spinner);

      const response = await axios.post(`${Addresses.HOST}:${Addresses.PORT}/${Addresses.SIGNUP}`, {
        email: email,
        password: password,
        name: name
      })

      await AsyncStorage.setItem('token', response.headers["x-auth-token"])

      if (response.status == '200') this.props.navigation.navigate('App')


    } catch (error) {
      this.setModal(!this.state.spinner);
      Alert.alert('Erro', `Usuário ou senha inválida. Detalhes: ${error}`)
    }


  }

  goToLogin = () => this.props.navigation.navigate('Login')

  render() {
    const { email, password, name, confirmPassword } = this.state

    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          style={{ flex: 1 }}
          colors={[Colors.MIDDLE_SATURATED_ORANGE, Colors.LIGHT_SATURATED_YELLOW]}
        >

          <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView
              behavior="padding"
              keyboardVerticalOffset={5}
              style={styles.header}
            >

              {/* <View style={styles.header}> */}

              <View style={styles.buttons}>
                <TouchableOpacity onPress={this.goToLogin}><Text style={{ color: Colors.GREY, fontSize: 20 }}>Entrar</Text></TouchableOpacity>
                <TouchableOpacity><Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Cadastrar</Text></TouchableOpacity>

              </View>
              <View style={styles.card}>
                <Input
                  name='name'
                  icon_name='group'
                  icon_size={22}
                  value={name}
                  placeholder='Digite o seu primeiro nome'
                  autoCapitalize='none'
                  secureTextEntry={false}
                  onChangeText={this.handleNameChange}


                />

                <Input
                  name='email'
                  icon_name='user-circle'
                  icon_size={22}
                  value={email}
                  placeholder='Digite o seu email'
                  autoCapitalize='none'
                  secureTextEntry={false}
                  onChangeText={this.handleEmailChange}


                />
                <Input
                  name='password'
                  icon_name='unlock-alt'
                  icon_size={25}
                  value={password}
                  placeholder='Senha                        '
                  secureTextEntry={true}
                  onChangeText={this.handlePasswordChange}
                  style={{ paddinStart: 15 }}
                />

                <Input
                  name='password'
                  icon_name='unlock-alt'
                  icon_size={25}
                  value={confirmPassword}
                  placeholder='Confirme a senha'
                  secureTextEntry={true}
                  onChangeText={this.handleConfirmPasswordChange}
                  style={{ paddinStart: 15 }}
                />

                {this.state.spinner &&
                  <Text>Processando ...</Text>
                }
                <Button onPress={this.onLogin} title={'Entrar'} />
              </View>



              {/* </View> */}
            </KeyboardAvoidingView>

          </TouchableWithoutFeedback>
        </LinearGradient>


      </View>

    )
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%'

  },
  card: {

    width: '80%',
    height: '50%',
    minHeight: '50%',
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