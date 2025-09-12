import { View, Text } from "@shared/ui/Themed";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const Quiz = () => {
  const { id } = useLocalSearchParams();
  return (
    <View style={styles.quiz_container}>
      <Text>Quiz: {id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  quiz_container: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    padding: 40,
  },
});

export default Quiz;
