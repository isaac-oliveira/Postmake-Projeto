import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import Home from "../pages/Home";
import Search from "../pages/Search";
import Add from "../pages/Add";
import Profile from "../pages/Profile";

const Tabs = createBottomTabNavigator();

const iconNames = {
  Home: "home",
  Search: "search",
  Add: "plus-circle",
  Profile: "user",
};

const Icon = (props) => {
  const { color, size } = props;
  const name = iconNames[props.name];
  return <Feather name={name} color={color} size={size} />;
};

const AppRouter = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: (props) => <Icon {...props} {...route} />,
      })}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: "#fff",
        inactiveTintColor: "#A9A9A9",
        tabStyle: {
          borderTopWidth: 0,
          backgroundColor: "#4F6D7A",
        },
      }}
    >
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Search" component={Search} />
      <Tabs.Screen name="Add" component={Add} />
      <Tabs.Screen name="Profile" component={Profile} />
    </Tabs.Navigator>
  );
};

export default AppRouter;
