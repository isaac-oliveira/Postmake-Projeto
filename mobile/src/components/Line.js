import React from "react";
import { View, StyleSheet } from "react-native";

const Line = () => {
  return <View style={styles.line} />;
};

const styles = StyleSheet.create({
  line: {
    height: 1,
    backgroundColor: "#000",
  },
});

export default Line;
