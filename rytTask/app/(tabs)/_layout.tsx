import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { View, Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#3366FF",
        tabBarInactiveTintColor: "#94A3B8",
        tabBarStyle: {
          height: 70,
          borderRadius: 30,
          position: "absolute",
          marginBottom: 26,
          marginRight: 20,
          marginLeft: 20,
          paddingHorizontal: 10,
          paddingTop: 10,
          paddingBottom: 5,
          backgroundColor: "#FFFFFF",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
        },
        tabBarShowLabel: false,
        headerShown: false,
        
        tabBarIcon: ({ color, focused }) => {
          let iconName;
          let label = "";

          if (route.name === "index") {
            iconName = "home";
            label = "Home";
          } else if (route.name === "transfer") {
            iconName = "exchange";
            label = "Transfer";
          } else if (route.name === "profile") {
            iconName = "user";
            label = "Profile";
          }

          return (
            <View className="items-center justify-center w-20">
              <FontAwesome name={iconName as any} size={24} color={color} />
              {focused && (
                <Text className="text-xs mt-1 text-center">{label}</Text>
              )}
            </View>
          );
        },
      })}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="transfer" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
