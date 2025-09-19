import { Text, View } from "@shared/ui/Themed";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

const GettingStarted = () => {
  return (
    <View style={[styles.container]}>
      <View style={styles.img_container}>
        <Image
          source={require("../../shared/assets/images//getting-started.png")}
          style={styles.getting_started_img}
        />
        <Text style={[styles.text]}>
          Find interesting frontend quizzes to boost up your {"\n"}
          knowledge
        </Text>
      </View>
      <View style={styles.btns_container}>
        <TouchableOpacity
          style={styles.getting_started_btn}
          onPress={() => router.replace("/(auth)/register")}
        >
          <Text style={styles.getting_started_text}>GETTING STARTED</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.have_acc_btn}
          onPress={() => router.replace("/(auth)/login")}
        >
          <Text style={styles.have_acc_text}>I ALREADY HAVE AN ACCOUNT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 30,
    height: "100%",
  },
  img_container: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  getting_started_img: {
    objectFit: "contain",
    width: "100%",
    height: 450,
  },
  text: {
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 40,
  },
  btns_container: {
    backgroundColor: "transparent",
    gap: 20,
    marginTop: "auto",
  },
  getting_started_btn: {
    backgroundColor: "#7C3AED",
    padding: 14,
    borderRadius: 50,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    width: "100%",
  },
  getting_started_text: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "semibold",
    color: "#fff",
  },
  have_acc_btn: {
    backgroundColor: "#EDE9FE",
    padding: 14,
    borderRadius: 50,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    width: "100%",
  },
  have_acc_text: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "semibold",
    color: "#7C3AED",
  },
});

export default GettingStarted;
