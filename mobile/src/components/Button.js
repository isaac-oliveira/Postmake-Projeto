import React from "react";
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";

const Button = ({ title, transparent, width, loading, onPress }) => {
  if (loading)
    return (
      <View style={styles.containerTransparent}>
        <ActivityIndicator color="#56A3A6" />
      </View>
    );

  return (
    <TouchableOpacity
      style={[
        !transparent ? styles.container : styles.containerTransparent,
        { width },
      ]}
      onPress={onPress}
    >
      <Text style={!transparent ? styles.title : styles.titleTransparent}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#56A3A6",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  containerTransparent: {
    margin: 10,
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 18,
    color: "#fff",
  },
  titleTransparent: {
    fontSize: 18,
    color: "#56A3A6",
  },
});

export default Button;
