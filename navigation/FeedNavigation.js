import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import HomeScreen from "../screens/Home";
import FeedSavedScreen from "../screens/FeedSavedScreen";
import AddScreen from "../screens/AddScreen";
import Colors from "../constants/Colors";

const RouteConfigs = {
  Feed: {
    screen: HomeScreen
  },
  Add: {
    screen: AddScreen
  }
  // Salvos: {
  //   screen: FeedSavedScreen
  // }
};

const TabNavigatorConfig = {
  initialRouteName: "Feed",
  tabBarOptions: {
    activeTintColor: Colors.BROWN,
    style: {
      backgroundColor: Colors.LIGHT_SATURATED_YELLOW
    },
    indicatorStyle: {
      backgroundColor: Colors.BROWN
    }
  }
};

export default createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);
