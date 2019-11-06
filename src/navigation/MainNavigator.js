import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/homeScreen";
import CalendarScreen from "../screens/calendarScreen";
import HabitsScreen from "../screens/habitsScreen";
import InfoScreen from "../screens/infoScreen";
import SettingsScreen from "../screens/settingsScreen";
import EventDetailScreen from "../screens/eventDetail";

const tabScreenConfig = {
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: "Início",
      tabBarIcon: tabInfo => (
        <Ionicons name="md-home" size={25} color={tabInfo.tintColor} />
      )
    }
  },
  Calendar: {
    screen: CalendarScreen,
    navigationOptions: {
      tabBarLabel: "Calendário",
      tabBarIcon: tabInfo => (
        <Ionicons name="md-calendar" size={25} color={tabInfo.tintColor} />
      )
    }
  },
  Habits: {
    screen: HabitsScreen,
    navigationOptions: {
      tabBarLabel: "Hábitos",
      tabBarIcon: tabInfo => (
        <Ionicons name="md-walk" size={25} color={tabInfo.tintColor} />
      )
    }
  },
  Info: {
    screen: InfoScreen,
    navigationOptions: {
      tabBarLabel: "Informações",
      tabBarIcon: tabInfo => (
        <Ionicons
          name="md-information-circle"
          size={25}
          color={tabInfo.tintColor}
        />
      )
    }
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarLabel: "Ajustes",
      tabBarIcon: tabInfo => (
        <Ionicons name="md-settings" size={25} color={tabInfo.tintColor} />
      )
    }
  }
};

const mainTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: "#807B52",
        inactiveColor: "#FFF",
        shifting: true,
        barStyle: {
          backgroundColor: "#FCE133"
        }
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: "#807B52",
          inactiveTintColor: "#FFF",
          style: {
            backgroundColor: "#FCE133"
          }
        }
      });

const mainStackNavigator = createStackNavigator(
  {
    Tabs: mainTabNavigator,
    EventDetail: EventDetailScreen
  },
  {
    initialRouteName: "Tabs",
    defaultNavigationOptions: {
      title: "Felicidade"
    }
  }
);

export default createAppContainer(mainStackNavigator);
