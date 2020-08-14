import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import api from "../services/api";

const UserItem = ({ following, user }) => {
  const [followingState, setFollowingState] = useState(following);

  const iconName = followingState ? "user-minus" : "user-plus";
  const iconColor = followingState ? "#F50707" : "#56A3A6";

  const handleFollow = async () => {
    setFollowingState(!followingState);
    let response = null;
    if (!followingState) {
      response = await api.post("/follow", { id: user._id });
    } else {
      response = await api.delete(`/unfollow/${user._id}`);
    }
    if (response?.status !== 204) {
      setFollowingState(following);
    }
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemContent}>
        <View style={styles.initialContainer}>
          <Text style={styles.initial}>{user.name[0].toUpperCase()}</Text>
        </View>
        <Text style={styles.title}>{user.name}</Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={handleFollow}>
        <Feather name={iconName} color={iconColor} size={18} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  initialContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 10,
    backgroundColor: "#A9A9A9",
    justifyContent: "center",
    alignItems: "center",
  },
  initial: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  title: {
    color: "#000",
    fontSize: 22,
    paddingHorizontal: 10,
  },
  itemContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default UserItem;
