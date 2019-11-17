import React from "react";
import { FlatList, Text } from "react-native";
import { Card } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors";
import ButtonSmall from "../components/ButtonSmall";

const GradientCardList = props => {
  const { items } = props;

  return (
    <LinearGradient
      style={{ flex: 1, paddingBottom: 20 }}
      colors={[Colors.MIDDLE_SATURATED_ORANGE, Colors.LIGHT_SATURATED_YELLOW]}>
      <FlatList
        keyExtractor={item => item._id}
        data={items}
        renderItem={({ item }) => {
          return (
            <Card
              title={item.title}
              containerStyle={{ borderRadius: 10, elevation: 5 }}
              wrapperStyle={{ alignItems: "center" }}
              titleStyle={{
                fontSize: 16,
                color: Colors.GREY
              }}>
              <Text style={{ fontSize: 16, color: Colors.GREY }}>
                {item.content}
              </Text>
              <ButtonSmall
                onPress={() =>
                  props.navigation.navigate("EventDetail", {
                    event: item
                  })
                }>
                <Text style={{ color: Colors.GREY }}>Adicionar</Text>
              </ButtonSmall>
            </Card>
          );
        }}
      />
    </LinearGradient>
  );
};

export default GradientCardList;
