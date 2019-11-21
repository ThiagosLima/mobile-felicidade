import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native'
import { Card } from 'react-native-elements'
import AsyncStorage from 'AsyncStorage'

import { Icon, Fab } from 'native-base';
import Colors from '../constants/Colors'
import Addresses from '../constants/Addresses'

const axios = require('axios')



export default class Home extends React.Component {

  constructor() {
    super()
    this.state = {
      token: '',
      data: [],

    }

  }

  async componentDidMount() {
    await this.getFeeds()
  }


  getFeeds = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      // this.setState({ token })

      this.setState({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGQ1ODk4NWI2MjNhMzAwMjE2ZDk0YmYiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNTc0Mjc1NDYxfQ.AIcyyE-xLyW778H9Z-ZtTp3gv4fP0sITrMhk1amPgwc' })

      const response = await axios.request({
        url: '/feed',

        method: 'get', // default

        baseURL: 'http://192.168.0.103:3000/api',

      })
      console.log('')
      console.log('')
      console.log('')
      this.setState({ data: [...response.data] })

    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }




  render() {

    return (

      <View style={styles.container}>



        <SafeAreaView style={{}}>
          <FlatList
            data={this.state.data}
            refreshing={false}
            style={{ marginBottom: 22 }}
            renderItem={({ item }) =>
              <Card
                title={item.title}
                containerStyle={styles.containeCard}

              >


                <Text textAlign='left'>{item.description}</Text>
                <Text>{"\n"}</Text>
                {item.isAnon && <Text>Anônimo</Text>}
                {!item.isAnon && <Text>{item.name}</Text>}
              </Card>}
            keyExtractor={item => item._id}
          />
        </SafeAreaView>





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
  containeCard: {
    flex: 1,
    backgroundColor: 'white',
    elevation: 7,
    minWidth: '90%'

  }

})