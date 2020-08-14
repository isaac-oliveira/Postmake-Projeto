import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const IconInput = ({ icon, ...props }) => {
  return (
    <View style={styles.container}>
      <Feather style={styles.icon} name={icon} size={18} />
      <TextInput style={styles.input} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    padding: 20,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
});

export default IconInput;
