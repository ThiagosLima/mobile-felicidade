import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Agenda, LocaleConfig } from "react-native-calendars";
import ActionButton from "react-native-action-button";
import moment from "moment";
import { getUserId } from "../utils/users";
import brLocale from "../utils/configLocale";
import felicidadeApi from "../api/felicidadeApi";
import { NavigationEvents } from "react-navigation";

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agendaId: "",
      items: {}
    };
  }

  async componentDidMount() {
    await this.getApiData();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents
          onWillFocus={async payload => await this.getApiData()}
        />
        <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItems}
          selected={new Date()}
          renderItem={this.renderItem}
          renderEmptyDate={this.renderEmptyDate}
          rowHasChanged={this.rowHasChanged}
          minDate={"2018-05-10"}
          maxDate={"2020-05-30"}
          theme={{
            selectedDayBackgroundColor: "#EEAB00",
            agendaKnobColor: "#EEAB00",
            agendaTodayColor: "#EEAB00"
            // backgroundColor: "#fff"
          }}
        />
        <ActionButton
          buttonColor="#808080"
          onPress={() =>
            this.props.navigation.navigate("EventDetail", {
              event: { _id: "", agendaId: this.state.agendaId }
            })
          }
        />
      </View>
    );
  }

  getApiData = async () => {
    const userId = await getUserId();
    const { data } = await felicidadeApi.get(`/agenda?user=${userId}`);
    const { _id: agendaId, events } = data[0];
    const items = this.formatItems(events);
    this.setState({ agendaId, items });
  };

  formatItems = items => {
    const formatedItems = {};
    items.map(item => {
      const key = item.initialDate.split("T")[0];
      if (key in formatedItems) formatedItems[key].push(item);
      else formatedItems[key] = [item];
    });
    return formatedItems;
  };

  loadItems = async day => {
    // Load empty days
    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = this.timeToString(time);
      if (!this.state.items[strTime]) {
        this.state.items[strTime] = [];
      }
    }

    // Add empty days to the state
    const newItems = {};
    Object.keys(this.state.items).forEach(key => {
      newItems[key] = this.state.items[key];
    });
    this.setState({ items: newItems });
  };

  formatDate = date => {
    const formated = moment(date).format("DD/MM/YYYY HH:mm");
    return formated;
  };

  renderItem = item => {
    const initialDate = this.formatDate(item.initialDate);
    const finalDate = this.formatDate(item.finalDate);

    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("EventDetail", {
            event: {
              ...item,
              initialDate,
              finalDate,
              agendaId: this.state.agendaId
            }
          })
        }>
        <View style={[styles.item, { height: item.height }]}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.data}>Início: {initialDate}h</Text>
          <Text style={styles.data}>Término: {finalDate}h</Text>
          <Text style={styles.content}>{item.content}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#EEAB00",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },
  data: {
    color: "#fff",
    paddingStart: 20
  },
  content: {
    color: "#fff",
    padding: 20
  }
});

LocaleConfig.locales["br"] = brLocale;
LocaleConfig.defaultLocale = "br";
