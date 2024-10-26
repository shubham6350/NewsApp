import { Tabs } from "expo-router";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";
import { Text } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabel: ({ focused }) => {
          let labelText;

          if (route.name === "index") {
            labelText = "Apple News";
          } else if (route.name === "explore") {
            labelText = "Tesla News";
          }
          return (
            <Text
              style={{
                fontWeight: focused ? "700" : "400",
              }}
            >
              {labelText}
            </Text>
          );
        },
        tabBarStyle: {
          borderTopEndRadius: 16,
          borderTopStartRadius: 16,
          paddingVertical: 4,
          paddingHorizontal: 16,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFFF",
          shadowOpacity: 0.1,
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Apple News",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="apple1" size={20} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Tesla News",
          tabBarIcon: ({ color, focused }) => (
            <Fontisto name="tesla" size={20} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
