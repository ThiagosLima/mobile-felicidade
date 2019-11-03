import React from 'react'
import { StyleSheet, Text, View} from 'react-native'
import AsyncStorage from 'AsyncStorage'


// Home.navigationOptions = {
//   headerTitle: 'none'
// };


export default class Home extends React.Component {

  static navigationOptions = {
    header: null,
  };


  constructor() {
    super()
    this.state = {
      token: ''
    }
    this.getUserToken()

  }
  

  getUserToken = async () => {
    try{
      const token = await AsyncStorage.getItem('storage_Key')
      
      this.setState({token})
    }catch(error){
      alert(error)
    }
  
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
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