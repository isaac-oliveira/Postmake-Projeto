import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Button from "../components/Button";
import api from "../services/api";

const Add = () => {
  const navigation = useNavigation();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [hashtags, setHashTags] = useState("");

  const handlePost = async () => {
    const hashtagsList = hashtags.split(" ");

    const { status, data } = await api.post("/post", {
      title,
      subject,
      hashtags: hashtagsList,
    });

    if (status === 201) {
      navigation.navigate("Profile");
    } else {
      Alert.alert("Ops!", data.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <Text style={styles.label}>Assunto</Text>
      <TextInput
        style={styles.subject}
        multiline
        textAlignVertical="top"
        value={subject}
        onChangeText={setSubject}
      />
      <Text style={styles.label}>Hashtags</Text>
      <TextInput
        style={styles.input}
        value={hashtags}
        onChangeText={setHashTags}
      />
      <Button title="Postar" onPress={handlePost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    paddingVertical: 10,
  },
  label: {
    fontWeight: "bold",
    color: "#4F6D7A",
    fontSize: 20,
    padding: 5,
    marginTop: 10,
    marginHorizontal: 10,
  },
  input: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  subject: {
    flex: 1,
    fontSize: 18,
    textAlign: "justify",
    padding: 20,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});

export default Add;
