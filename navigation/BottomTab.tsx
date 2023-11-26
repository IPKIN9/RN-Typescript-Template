import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import * as React from "react";
import Home from "../screens/pages/Home";
import Status from "../screens/pages/Status";
import Profile from "../screens/pages/Profile";
import Colors from './../shared/Colors'

export default function TabNavigation() {
  const Tab = createBottomTabNavigator();

  const styles = StyleSheet.create({
    tabBarStyling: {
      backgroundColor: "#F5F5F5",
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
            <MaterialCommunityIcons name="view-dashboard" size={28} color={color} />
          ),
          tabBarStyle: styles.tabBarStyling,
          tabBarLabelStyle: styles.tabLabelStyling,
          tabBarActiveTintColor: "#3b82f6",
          tabBarInactiveTintColor: "#8E8E93",
        }}
      />
      <Tab.Screen
        name="Status"
        component={Status}
        options={{
          tabBarLabel: "Status",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="receipt" size={28} color={color} />
          ),
          tabBarStyle: styles.tabBarStyling,
          tabBarLabelStyle: styles.tabLabelStyling,
          tabBarActiveTintColor: "#3b82f6",
          tabBarInactiveTintColor: "#8E8E93",
        }}
      />
       <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Me",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="face-man-profile" size={28} color={color} />
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
