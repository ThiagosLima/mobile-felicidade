import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

const ButtonSmall = props => {
  return <TouchableOpacity {...props} style={styles.conteiner} />;
};

const styles = StyleSheet.create({
  conteiner: {
    backgroundColor: Colors.LIGHT_YELLOW,
    borderRadius: 50,
    height: 30,
    marginTop: 15,
    width: 100,
    elevation: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ButtonSmall;
