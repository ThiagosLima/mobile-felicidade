import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AsyncStorage from 'AsyncStorage'


export default class FeedSavedScreen extends React.Component {


  constructor({ navigation }) {
    super()
    this.state = {
      token: ''
    }
    this.getUserToken()
    // navigation.header = null

  }


  getUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token')

      this.setState({ token })
    } catch (error) {
      alert(error)
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Feed Saved Screen</Text>
        <Text>{this.state.token}</Text>
        <Text>Another text</Text>
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