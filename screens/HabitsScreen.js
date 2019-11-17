import React, { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
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
      <View style={styles.container}>
        <FlatList
          keyExtractor={category => category}
          data={this.state.categories}
          renderItem={({ item: category }) => {
            return (
              <TouchableOpacity
                style={styles.line}
                onPress={() => {
                  this.props.navigation.navigate("HabitDetail", {
                    category: category,
                    habits: this.filterHabits(category, this.state.habits)
                  });
                }}>
                <Text style={styles.item}>{category}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    color: "#EEAB00",
    fontSize: 16,
    padding: 10,
    paddingStart: 20
  },
  line: {
    borderColor: "#EEAB00",
    borderBottomWidth: 1,
    borderTopWidth: 1
  },
  container: {
    borderColor: "#EEAB00",
    borderBottomWidth: 3,
    borderTopWidth: 3
  }
});

export default HabitsScreen;
