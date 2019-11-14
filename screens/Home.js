import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AsyncStorage from 'AsyncStorage'

import { Icon, Fab } from 'native-base';
import Colors from '../constants/Colors'
import Addresses from '../constants/Addresses'


export default class Home extends React.Component {

  constructor() {
    super()
    this.state = {
      token: '',
      itemSelected: 'key0',
      title: ''
    }
    this.getUserToken()
  }



  getUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      this.setState({ token })

    } catch (error) {
      alert(error)
    }
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }



  render() {

    return (

      <View style={styles.container}>
        <Text>Home</Text>
        <Text>{this.state.token}</Text>
        <Text>Another text</Text>
        <Fab
          active={true}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: Colors.BROWN }}
          position="bottomRight"
          onPress={() => this.setModalVisible(true)}>
          <Icon name="md-add" />
        </Fab>


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
  },
  modal: {
    flex: 1,
    margin: 10,
    borderRadius: 5,
    borderColor: Colors.BROWN,
    borderWidth: 5,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: "space-between",
    alignItems: 'center'
  }

})