import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Line from "./Line";
import { Feather } from "@expo/vector-icons";
import api from "../services/api";

const PostItem = ({ post }) => {
  const [reactType, setReactType] = useState(post.react?.type);
  const hashtags = post.hashtags.join(" ");

  const getColor = (type) => {
    if (reactType === type) {
      iconColors = {
        loved: "#00F3FD",
        like: "#06F102",
        dislike: "#F50707",
      };

      return iconColors[reactType];
    }
    return "#000";
  };

  const handleReact = async (type) => {
    setReactType(type);
    const { status } = await api.post(`/react/${post._id}/${type}`);
    if (status !== 204) setReactType(post.react?.type);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.username}>{post.user_name}</Text>
      <Line />
      <View style={styles.content}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.subject}>{post.subject}</Text>
        <Text style={styles.hashtags}>{hashtags}</Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          styles={styles.btn}
          onPress={() => handleReact("loved")}
        >
          <Feather name="heart" size={24} color={getColor("loved")} />
        </TouchableOpacity>
        <TouchableOpacity
          styles={styles.btn}
          onPress={() => handleReact("like")}
        >
          <Feather name="thumbs-up" size={24} color={getColor("like")} />
        </TouchableOpacity>
        <TouchableOpacity
          styles={styles.btn}
          onPress={() => handleReact("dislike")}
        >
          <Feather name="thumbs-down" size={24} color={getColor("dislike")} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginVertical: 15,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  username: {
    fontWeight: "bold",
    color: "#4F6D7A",
    fontSize: 20,
    padding: 5,
  },
  content: {
    padding: 10,
  },
  title: {
    fontWeight: "bold",
    color: "#000",
    fontSize: 20,
    padding: 5,
    textAlign: "center",
  },
  subject: {
    fontSize: 18,
    textAlign: "justify",
  },
  hashtags: {
    paddingVertical: 10,
    fontWeight: "bold",
    fontSize: 20,
    color: "#56A3A6",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    alignSelf: "center",
    padding: 15,
  },
  btn: {
    padding: 10,
  },
});

export default PostItem;
