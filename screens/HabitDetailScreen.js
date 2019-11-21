import React from "react";
import GradientCardList from "../components/GradientCardList";

const HabitDetail = ({ navigation }) => {
  const habits = navigation.getParam("habits");

  return <GradientCardList items={habits} navigation={navigation} />;
};

export default HabitDetail;
