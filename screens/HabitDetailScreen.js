import React from "react";
import { FlatList, Text, View } from "react-native";

const HabitDetail = ({ navigation }) => {
  const category = navigation.getParam("category");
  const habits = navigation.getParam("habits");

  // console.log(habits);
  return (
    <View>
      <Text>{category}</Text>
      <FlatList
        keyExtractor={habit => habit._id}
        data={habits}
        renderItem={({ item }) => {
          console.log(item.title);
          // <View>
          //   <Text>{item.title}</Text>
          //   <Text>{habit.content}</Text>
          // </View>;
        }}
      />
    </View>
  );
};

export default HabitDetail;
