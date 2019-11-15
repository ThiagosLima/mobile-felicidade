import React from 'react'
import {
  Alert,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  ScrollView,
  Modal

} from 'react-native'
import { Container, Header, Content, Picker, Form } from "native-base";
import AsyncStorage from 'AsyncStorage'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/Colors'
import Addresses from '../constants/Addresses'

import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'

const axios = require('axios')


export default class AddScreen extends React.Component {

  constructor() {
    super()
    this.state = {
      token: '',
      title: 'Default',
      text: 'Default',
      itemSelected: 'key0',
      name: '',
      _id: '',
      modalVisible: false,
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
          // 'x-auth-token': this.state.token,
          // 'content-type': 'application/json'
          'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGM0MjdmMGZmZjkzYTAwMTJlNDk2MjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTczODI4OTQwfQ.lKGFkJPXTusuYqfpM6aRtw2KVaNAKM9fUTwjjJ-QMME',
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

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onClickTitle = () => {

    this.setModalVisible(!this.state.modalVisible)
  }

  render() {

    return (

      // <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      // <View >


      <View style={styles.container}>

        <TouchableOpacity style={styles.containerAuthor}>
          <Text>Anderson</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', padding: 15 }}>
          <FontAwesome
            name='user-o'
            style={{ paddingRight: 25 }}
            size={40}
          />
          <TouchableOpacity
            style={{ backgroundColor: Colors.LIGHT_SHADE_YELLOW, borderRadius: 25, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', padding: 10 }}>

            <Text >Sem Título</Text>
            <MaterialCommunityIcons
              name='square-edit-outline'
              style={{}}
              size={10} />


          </TouchableOpacity>

        </View>



        <View style={{ ...styles.inputView, height: 45, width: '80%' }}>

          <Text>{this.state.title}</Text>
          {/* <TextInput
            name='title'
            value={title}
            placeholder='Título                             '
            autoCapitalize='none'
            secureTextEntry={false}
            onChangeText={this.handleTitleChange}
            autoCorrect={true}

          >
          </TextInput> */}
        </View>

        <View style={{ ...styles.inputView, height: '30%', minHeight: '25%', width: '80%', borderRadius: 5 }}>


          <TouchableOpacity style={{ flex: 1 }} onPress={this.onClickTitle}>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
            >
              <View style={styles.containerModal}>
                <View style={{ ...styles.inputView, height: '30%', minHeight: '25%', width: '80%', borderRadius: 5 }}>
                  <TextInput
                    name='Text'
                    value={this.state.text}
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
                  <TouchableOpacity style={styles.buttons} onPress={this.onClickSalvar && this.onClickTitle}>
                    <Text style={styles.buttonsColor}>Salvar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttons} onPress={this.onClickTitle}>
                    <Text style={styles.buttonsColor}>Cancelar</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </Modal>
            <Text>{this.state.text}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttons} onPress={this.onClickSalvar}>
            <Text style={styles.buttonsColor}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons}>
            <Text style={styles.buttonsColor}>Cancelar</Text>
          </TouchableOpacity>
        </View>
        {/* </LinearGradient> */}



      </View >











    )
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    flex: 1,
    // borderWidth: 2,
    // borderColor: 'black',
    margin: 15,
    borderRadius: 5,
    elevation: 5,
    padding: 10
  },
  containerAuthor: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },
  containerModal: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
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
