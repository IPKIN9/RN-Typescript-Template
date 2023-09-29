import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import * as React from "react";

export default function TabNavigation() {
  const Tab = createBottomTabNavigator();

  const styles = StyleSheet.create({
    tabBarStyling: {
      backgroundColor: "#F5F5F5",
      borderTopWidth: 1,
      borderTopColor: "#E0E0E0",
      height: 55,
      paddingTop: 6,
    },
    tabLabelStyling: {
      fontSize: 14,
      fontWeight: "bold",
      paddingBottom: 5,
    },
  });

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          tabBarStyle: styles.tabBarStyling,
          tabBarLabelStyle: styles.tabLabelStyling,
          tabBarActiveTintColor: Colors.hardGreen,
          tabBarInactiveTintColor: "#8E8E93",
        }}
      /> */}
    </Tab.Navigator>
  );
}
