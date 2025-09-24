import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import Colors from "@shared/constants/Colors";
import { useClientOnlyValue } from "@shared/hooks/useClientOnlyValue";
import { useTheme } from "@shared/hooks/useTheme";
import { Text, View } from "@shared/ui/Themed";
import { Image } from "react-native";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { effectiveTheme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[effectiveTheme].tint,
        tabBarInactiveTintColor: Colors[effectiveTheme].tabIconDefault,
        tabBarStyle: {
          backgroundColor: Colors[effectiveTheme].background,
        },
        headerStyle: {
          backgroundColor: Colors[effectiveTheme].background,
        },
        headerTintColor: Colors[effectiveTheme].text,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerTitle: () => (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 15 }}
            >
              <Image
                source={require("../../shared/assets/images/icon1.png")}
                style={{
                  objectFit: "contain",
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                }}
              />

              <Text style={{ fontSize: 20, fontWeight: "500" }}>Home</Text>
            </View>
          ),
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
