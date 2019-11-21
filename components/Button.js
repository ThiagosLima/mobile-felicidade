import React from "react";

import { TouchableOpacity, StyleSheet, View, Text } from "react-native";

import Colors from "../constants/Colors";

const Button = props => {
  return (
    <TouchableOpacity
      {...props}
      style={{ ...styles.props, ...styles.container }}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 45,
    width: 245,
    backgroundColor: Colors.MIDDLE_SATURATED_ORANGE,
    borderRadius: 50,
    elevation: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "white"
  }
});

export default Button;
