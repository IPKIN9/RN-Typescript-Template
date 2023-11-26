import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import * as React from "react";
import Home from "../screens/pages/Home";
import Colors from './../shared/Colors'

export default function TabNavigation() {
  const Tab = createBottomTabNavigator();

  const styles = StyleSheet.create({
    tabBarStyling: {
      backgroundColor: "#F5F5F5",
      borderTopWidth: 1,
      borderTopColor: "#E0E0E0",
      height: 57,
      paddingTop: 6,
      margin: 0
    },
    tabLabelStyling: {
      fontSize: 13,
      fontWeight: "bold",
      paddingBottom: 5,
      margin: 0,
      marginTop: -5
    },
  });

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={28} color={color} />
          ),
          tabBarStyle: styles.tabBarStyling,
          tabBarLabelStyle: styles.tabLabelStyling,
          tabBarActiveTintColor: "#3b82f6",
          tabBarInactiveTintColor: "#8E8E93",
        }}
      />
    </Tab.Navigator>
  );
}
