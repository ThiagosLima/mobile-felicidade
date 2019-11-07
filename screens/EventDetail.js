import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import DatePicker from "react-native-datepicker";
const axios = require('axios')

const EventDetailScreen = ({ navigation }) => {
  const { _id, ...oldEvent } = navigation.getParam("event");

  const newEvent = {
    title: "",
    content: "",
    initialDate: new Date(),
    finalDate: new Date()
  };

  const [event, setEvent] = useState(_id ? oldEvent : newEvent);

  getUserToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      return token._id
    } catch (error) {
      alert(error)
    }


  }

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <TextInput
          placeholder="Atividade"
          style={styles.input}
          value={event.title}
          onChangeText={newTitle => setEvent({ ...event, title: newTitle })}
        />
        <TextInput
          placeholder="Descrição"
          style={styles.input}
          value={event.content}
          onChangeText={newContent =>
            setEvent({ ...event, content: newContent })
          }
        />
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Data/Hora de Início</Text>
          <DatePicker
            placeholder="Data de Início"
            style={styles.date}
            customStyles={{
              dateInput: {
                borderWidth: 0
              },
              dateText: {
                color: "#fff",
                fontSize: 20
              }
            }}
            date={event.initialDate}
            mode="datetime"
            format="DD/MM/YYYY HH:mm"
            showIcon={false}
            onDateChange={newInitialDate =>
              setEvent({ ...event, initialDate: newInitialDate })
            }
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Data/Hora de Término</Text>
          <DatePicker
            placeholder="Data de Término"
            style={styles.date}
            customStyles={{
              dateInput: {
                borderWidth: 0
              },
              dateText: {
                color: "#fff",
                fontSize: 20
              }
            }}
            date={event.finalDate}
            mode="datetime"
            format="DD/MM/YYYY HH:mm"
            showIcon={false}
            onDateChange={newFinalDate =>
              setEvent({ ...event, finalDate: newFinalDate })
            }
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            console.log("salvar");
            try {
              console.log(event);
              let url = await axios.get(`${Addresses.HOST}:${Addresses.PORT}/users/${this.getUserToken()}`);
              url = _id ? `${url}?eventId=${_id}` : url;

              console.log(url);



              await axios.put(url, {
                name: "User03",
                event: {
                  ...event
                }
              });

              console.log("fim salvar");
            } catch (error) {
              console.log(error);
            }
          }}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#EEAB00",
    ...StyleSheet.absoluteFillObject
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 15,
    margin: 30,
    ...StyleSheet.absoluteFillObject
  },
  infoContainer: {
    backgroundColor: "#EEAB00",
    borderRadius: 15,
    margin: 10,
    paddingStart: 20,
    alignItems: "stretch"
  },
  infoText: {
    color: "#fff",
    paddingTop: 20
  },
  input: {
    borderColor: "#EEAB00",
    borderRadius: 50,
    borderWidth: 2,
    color: "#EEAB00",
    height: 45,
    padding: 5,
    paddingStart: 20,
    margin: 10
  },
  date: {
    width: 250
  },
  button: {
    backgroundColor: "#EEAB00",
    borderColor: "#EEAB00",
    borderRadius: 50,
    height: 45,
    margin: 10,
    alignItems: "stretch",
    justifyContent: "center"
  },
  buttonText: {
    color: "#fff",
    alignSelf: "center"
  }
});

export default EventDetailScreen;
