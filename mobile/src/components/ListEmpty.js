import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

const ListEmpty = ({ loading, message }) => {
  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#56A3A6" />
      </View>
    );
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontWeight: "bold",
  },
});

export default ListEmpty;
