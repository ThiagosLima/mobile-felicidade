import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import DatePicker from "react-native-datepicker";
import felicidadeApi from "../api/felicidadeApi";
import { getUserId } from "../utils/users";

const EventDetailScreen = ({ navigation }) => {
  const { _id, agendaId, ...oldEvent } = navigation.getParam("event");
  console.log(agendaId);

  const newEvent = {
    ...oldEvent,
    initialDate: new Date(),
    finalDate: new Date()
  };

  const [event, setEvent] = useState(_id ? oldEvent : newEvent);
  // console.log(event);
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <TextInput
          placeholder="Atividade"
          multiline
          style={styles.input}
          value={event.title}
          onChangeText={newTitle => setEvent({ ...event, title: newTitle })}
        />
        <TextInput
          placeholder="Descrição"
          multiline
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
            try {
              // Get agendaId if not defined
              const userId = await getUserId();
              const { data } = await felicidadeApi.get(
                `/agenda?user=${userId}`
              );
              const { _id: agendaId } = data[0];

              // Define url
              let url = `/agenda/${agendaId}`;
              url = _id ? `${url}?eventId=${_id}` : url;

              const body = { event };
              await felicidadeApi.put(url, body);
            } catch (error) {
              console.log(error);
            }
            navigation.goBack();
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
    borderRadius: 25,
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
    borderRadius: 25,
    borderWidth: 2,
    color: "#EEAB00",
    maxHeight: 90,
    padding: 10,
    paddingStart: 30,
    paddingEnd: 30,
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
