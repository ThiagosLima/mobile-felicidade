//Login.js
import React from "react";
import {
  StyleSheet,
  View,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  Alert
} from "react-native";

import AsyncStorage from "AsyncStorage";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "../constants/Colors";
import Addresses from "../constants/Addresses";
import Input from "../components/Input";
import Button from "../components/Button";

const axios = require("axios");

export default class Login extends React.Component {
  state = {
    email: "",
    password: "",
    spinner: false
  };

  handleEmailChange = email => {
    this.setState({ email });
  };

  handlePasswordChange = password => {
    this.setState({ password });
  };

  setModal(visible) {
    this.setState({ spinner: visible });
  }

  onLogin = async () => {
    const { email, password, spinner } = this.state;

    try {
      this.setModal(!this.state.spinner);

      const response = await axios.post(
        `${Addresses.HOST}:${Addresses.PORT}/${Addresses.LOGIN}`,
        {
          email: email,
          password: password
        }
      );

      await AsyncStorage.setItem("token", response.data);

      if (response.status == "200") this.props.navigation.navigate("App");
    } catch (error) {
      this.setModal(!this.state.spinner);
      Alert.alert("Erro", "Usuário ou senha inválida.");
    }
  };

  goToSignup = () => this.props.navigation.navigate("Signup");

  render() {
    const { email, password } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          style={{ flex: 1 }}
          colors={[
            Colors.MIDDLE_SATURATED_ORANGE,
            Colors.LIGHT_SATURATED_YELLOW
          ]}
        >
          <TouchableWithoutFeedback
            style={{ flex: 1 }}
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <KeyboardAvoidingView
              behavior="padding"
              keyboardVerticalOffset={5}
              style={styles.header}
            >
              {/* <View style={styles.header}> */}

              <View style={styles.buttons}>
                <TouchableOpacity>
                  <Text
                    style={{ color: "white", fontWeight: "bold", fontSize: 20 }}
                  >
                    Entrar
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.goToSignup}>
                  <Text style={{ color: Colors.GREY, fontSize: 20 }}>
                    Cadastrar
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.card}>
                <Input
                  name="email"
                  icon_name="user-circle"
                  icon_size={22}
                  value={email}
                  placeholder="Digite o seu email"
                  autoCapitalize="none"
                  secureTextEntry={false}
                  onChangeText={this.handleEmailChange}
                />
                <Input
                  name="password"
                  icon_name="unlock-alt"
                  icon_size={25}
                  value={password}
                  placeholder="Senha                        "
                  secureTextEntry={true}
                  onChangeText={this.handlePasswordChange}
                  style={{ paddinStart: 15 }}
                />
                {this.state.spinner && <Text>Processando ...</Text>}
                <Button onPress={this.onLogin} title={"Entrar"} />
              </View>

              {/* </View> */}
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "50%"
  },
  card: {
    width: "80%",
    height: "40%",
    minHeight: "40%",
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
    paddingTop: 40
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 8
  }
});
