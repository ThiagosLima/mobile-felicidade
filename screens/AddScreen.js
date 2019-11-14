import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView

} from 'react-native'
import { Picker } from 'native-base';
import AsyncStorage from 'AsyncStorage'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Colors from '../constants/Colors'
import Addresses from '../constants/Addresses'

const axios = require('axios')


export default class AddScreen extends React.Component {

  constructor() {
    super()
    this.state = {
      token: '',
      title: '',
      text: '',
      itemSelected: 'key0',
      name: '',
      _id: ''
    }

    this.getUserToken()

  }

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  handleTitleChange = title => {
    this.setState({ title })
  }

  handleTextChange = text => {
    this.setState({ text })
  }

  getUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      this.setState({ token })

      const response = await axios.request({
        url: Addresses.ME,
        method: 'get', // default
        baseURL: Addresses.BASE_URL,
        headers: {
          'x-auth-token': this.state.token,
          'content-type': 'application/json'
        },
      })
      this.setState({ name, _id } = response.data)

      console.log(response.data)
    } catch (error) {

      console.log(error)

    }

  }

  onClickSalvar = async () => {
    try {
      const r = await axios.request({
        url: 'feed',
        method: 'post', // default
        baseURL: Addresses.BASE_URL,
        headers: {
          'x-auth-token': this.state.token,
          'content-type': 'application/json'
        },
        data: {
          title: this.state.title,
          description: this.state.text,
          isAnon: this.state.itemSelected == '0',

        }
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  render() {

    const { title, text } = this.state

    return (

      // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <View >
        {/* <KeyboardAwareScrollView> */}
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={100}
          style={{ flex: 1, backgroundColor: 'grey', flexDirection: 'column', justifyContent: 'center', }}
        >

          <View>
            <ScrollView
              sytle={{ ...styles.scrow }}
              horizontal={true}
              scrollEnabled={true}
              showsVerticalScrollIndicator={true}
              style={{ flex: 1 }}
            >



              <View style={styles.container}>
                <View style={styles.picker}>
                  <Picker
                    note
                    mode="dropdown"
                    style={{}}
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange.bind(this)}
                  >
                    <Picker.Item label={this.state.name} value={this.state.name} />
                    <Picker.Item label="Anônimo" value='0' />

                  </Picker>
                </View>


                <View style={{ ...styles.inputView, height: 45, width: '80%' }}>
                  <TextInput
                    name='title'
                    value={title}
                    placeholder='Título                             '
                    autoCapitalize='none'
                    secureTextEntry={false}
                    onChangeText={this.handleTitleChange}
                    autoCorrect={true}

                  >
                  </TextInput>
                </View>

                <View style={{ ...styles.inputView, height: '30%', minHeight: '25%', width: '80%', borderRadius: 5 }}>
                  <TextInput
                    name='Text'
                    value={text}
                    placeholder='Descrição'
                    autoCapitalize='none'
                    secureTextEntry={false}
                    onChangeText={this.handleTextChange}
                    autoCorrect={true}
                    multiline={true}
                    scrollEnabled={true}
                  // numberOfLines={10}

                  >
                  </TextInput>
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.buttons} onPress={this.onClickSalvar}>
                    <Text style={styles.buttonsColor}>Salvar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttons}>
                    <Text style={styles.buttonsColor}>Cancelar</Text>
                  </TouchableOpacity>
                </View>

              </View>


            </ScrollView>
          </View>


        </KeyboardAvoidingView>

        {/* </KeyboardAwareScrollView> */}
      </View>




      // </TouchableWithoutFeedback>








    )
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    flex: 1

  },
  picker: {
    height: 100,
    marginTop: 30,
    width: '80%',
    padding: 5,

  },
  inputView: {
    borderColor: Colors.MIDDLE_SATURATED_ORANGE,
    borderWidth: 2,
    borderRadius: 50,
    elevation: 1,
    paddingStart: 8,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  buttons: {
    height: 45,
    width: '40%',
    backgroundColor: Colors.LIGHT_SHADE_YELLOW,
    borderRadius: 50,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  buttonsColor: {
    color: Colors.BROWN
  },
  scrow: {
    flex: 1,

  }
})