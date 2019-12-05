import React from "react";
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
  Modal,
  Button,
  Picker
} from "react-native";
// import { Container, Header, Content, Picker, Form } from "native-base";
import AsyncStorage from "AsyncStorage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors";
import Addresses from "../constants/Addresses";

import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo
} from "@expo/vector-icons";

const axios = require("axios");

export default class AddScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      token: "",
      title: "",
      text: "",
      itemSelected: "key0",
      name: "",
      _id: "",
      modalVisible: false
    };

    this.getUserToken();
  }

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  handleTitleChange = title => {
    this.setState({ title });
  };

  handleTextChange = text => {
    this.setState({ text });
  };

  getUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      this.setState({ token });

      const response = await axios.request({
        url: Addresses.ME,
        method: "get", // default
        baseURL: Addresses.BASE_URL,
        headers: {
          "x-auth-token": this.state.token,
          "content-type": "application/json"
        }
      });
      this.setState(({ name, _id } = response.data));
    } catch (error) {
      console.log(error);
    }
  };

  onClickSalvar = async () => {
    try {
      const r = await axios.request({
        url: "feed",
        method: "post", // default
        baseURL: Addresses.BASE_URL,
        headers: {
          "x-auth-token": this.state.token,
          "content-type": "application/json"
        },
        data: {
          title: this.state.title,
          description: this.state.text,
          isAnon: this.state.itemSelected == "0"
        }
      });
      this.setModalVisible(!this.state.modalVisible);
      this.setState({
        text: "",
        title: ""
      });
    } catch (error) {
      Alert.alert("Não foi possível efetuar o seu post.");
      console.log(error.message);
    }
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onClickTitle = () => {
    this.setModalVisible(!this.state.modalVisible);
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={5}
        style={styles.header}
      >
        <View style={styles.container}>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center"
              }}
            >
              <View style={styles.containerUser}>
                {/* <FontAwesome
                name='user-o'
                style={{ paddingRight: 5, justifyContent: 'center' }}
                size={15} /> */}

                <Picker
                  selectedValue={this.state.itemSelected}
                  style={{ height: 20, width: 150 }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ itemSelected: itemValue })
                  }
                >
                  <Picker.Item label={this.state.name} value={this.state._id} />
                  <Picker.Item label="Anônimo" value="0" />
                </Picker>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row", paddingTop: 15 }}>
            <View style={styles.containerTitle}>
              <TextInput
                name="title"
                value={this.state.title}
                placeholder="Título"
                onChangeText={this.handleTitleChange}
                multiline={false}
                style={{ maxHeight: 45 }}
                // numberOfLines={5}
                // scrollEnabled={true}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", paddingTop: 15 }}>
            <View style={styles.containerText}>
              <TextInput
                name="text"
                value={this.state.text}
                placeholder="Descrição"
                onChangeText={this.handleTextChange}
                multiline={true}
                style={{ maxHeight: 45 }}
                // numberOfLines={5}
                // scrollEnabled={true}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", paddingTop: 15 }}>
            <TouchableOpacity
              style={styles.buttons}
              onPress={this.onClickSalvar}
            >
              <Text style={styles.buttonsColor}>Salvar</Text>
            </TouchableOpacity>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            // style={{
            //   backgroundColor: "blue",
            //   flexDirection: "column",
            //   justifyContent: "center",
            //   alignItems: "center",
            //   padding: 30
            // }}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View
              style={{
                backgroundColor: Colors.LIGHT_SATURATED_YELLOW,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 30
              }}
            >
              <Text>
                A sua publicação foi enviada!
                {"\n"}
                Espere a autorização para a publição aparecer para os outros
                usuários.
              </Text>

              <View style={{ paddingTop: 30 }}>
                <Button
                  color={Colors.BROWN}
                  title="OK"
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                />
              </View>
            </View>
          </Modal>

          <View style={{ flexDirection: "row", paddingTop: 15 }}>
            <TouchableOpacity style={styles.buttons}>
              <Text style={styles.buttonsColor}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    flexDirection: "column",
    margin: 15,
    borderRadius: 5,
    elevation: 5,
    padding: 10
  },
  containerUser: {
    flexDirection: "row",
    // justifyContent: "center",
    paddingStart: 45,
    alignItems: "center",
    backgroundColor: Colors.LIGHT_SHADE_YELLOW,
    borderRadius: 25,
    padding: 10,
    flex: 1
  },
  containerAuthor: {
    alignItems: "flex-end",
    backgroundColor: Colors.LIGHT_SHADE_YELLOW,
    borderRadius: 25,
    flexDirection: "row",
    padding: 10
  },
  containerTitle: {
    backgroundColor: Colors.LIGHT_SHADE_YELLOW,
    borderRadius: 25,
    // justifyContent: "center",
    paddingStart: 50,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    flex: 1
  },
  containerText: {
    backgroundColor: Colors.LIGHT_SHADE_YELLOW,
    borderRadius: 25,
    //justifyContent: "center",
    paddingStart: 50,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    flex: 1
  },
  containerModal: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    flex: 1
  },
  picker: {
    height: 100,
    marginTop: 30,
    width: "80%",
    padding: 5
  },
  inputView: {
    borderColor: Colors.MIDDLE_SATURATED_ORANGE,
    borderWidth: 2,
    borderRadius: 50,
    elevation: 1,
    paddingStart: 8,
    flexDirection: "row",
    alignItems: "center",
    padding: 5
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 5,
    flex: 1
  },
  buttons: {
    backgroundColor: Colors.BROWN,
    borderRadius: 25,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    flex: 1
  },
  buttonsColor: {
    color: Colors.LIGHT_SHADE_YELLOW
  }
});
