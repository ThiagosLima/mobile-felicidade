import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Agenda, LocaleConfig } from "react-native-calendars";
import apiFelicidade from "../api/apiFelicidade";
import ActionButton from "react-native-action-button";
import moment from "moment";

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {}
    };
  }

  async componentDidMount() {
    await this.getApiData();
  }

  formatItems = items => {
    const formatedItems = {};
    items.map(item => {
      const key = item.initialDate.split("T")[0];
      if (key in formatedItems) formatedItems[key].push(item);
      else formatedItems[key] = [item];
    });
    return formatedItems;
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
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
              event: { _id: "" }
            })
          }
        />
      </View>
    );
  }

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

  getApiData = async () => {
    const { data } = await apiFelicidade.get("/users/5dc0a7a7d2fe650014eb0818");

    const events = data.events;
    const items = this.formatItems(events);
    this.setState({ items });
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
            event: { ...item, initialDate, finalDate }
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

LocaleConfig.locales["br"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Mai0",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outrubro",
    "Novembro",
    "Dezembro"
  ],
  monthNamesShort: [
    "Jan.",
    "Fev.",
    "Mar",
    "Abr.",
    "Mai.",
    "Jun.",
    "Jul.",
    "Ago.",
    "Set.",
    "Out.",
    "Nov.",
    "Dez."
  ],
  dayNames: [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado"
  ],
  dayNamesShort: ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."],
  today: "Hoje"
};
LocaleConfig.defaultLocale = "br";
