import { Tabs } from "expo-router";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Apple News",
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="apple1" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Tesla News",
          tabBarIcon: ({ color, focused }) => (
            <Fontisto name="tesla" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
