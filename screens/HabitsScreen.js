import React, { Component } from "react";
import { FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import felicidadeApi from "../api/felicidadeApi";

class HabitsScreen extends Component {
  state = {
    habits: [],
    categories: []
  };

  async componentDidMount() {
    const { data: habits } = await felicidadeApi.get("/habits");
    const categories = this.getCategories(habits);

    this.setState({ categories, habits });
  }

  getCategories(habits) {
    // Take unique categories
    let categories = [];
    habits.map(habit => {
      if (!categories.includes(habit.category)) categories.push(habit.category);
    });

    return categories.sort();
  }

  filterHabits(category, habits) {
    return habits.filter(habit => habit.category === category);
  }

  render() {
    return (
      <FlatList
        keyExtractor={category => category}
        data={this.state.categories}
        renderItem={({ item: category }) => {
          return (
            <ListItem
              title={category}
              bottomDivider
              chevron
              titleStyle={{
                color: "#EEAB00"
              }}
              onPress={() => {
                this.props.navigation.navigate("HabitDetail", {
                  category,
                  habits: this.filterHabits(category, this.state.habits)
                });
              }}
            />
          );
        }}
      />
    );
  }
}

export default HabitsScreen;
