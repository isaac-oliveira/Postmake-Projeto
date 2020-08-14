import React, { useState } from "react";
import { KeyboardAvoidingView, Image, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import IconInput from "../components/IconInput";
import Line from "../components/Line";
import Button from "../components/Button";

import useAuth from "../hooks/useAuth";
import logo from "../assets/logo-user-plus.png";

const Register = () => {
  const { register } = useAuth();
  const navigation = useNavigation();

  const [name, setName] = useState("user1");
  const [email, setEmail] = useState("user1@gmail.com");
  const [password, setPassword] = useState("12345");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    await register({
      name,
      email,
      password,
    });
    setLoading(false);
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image style={styles.img} source={logo} />
      <View style={styles.card}>
        <IconInput
          icon="user"
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <Line />
        <IconInput
          icon="mail"
          placeholder="E-mail"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Line />
        <IconInput
          icon="key"
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Button
        title="Cadastrar"
        width="70%"
        loading={loading}
        onPress={handleRegister}
      />
      <Button title="Entrar" transparent width="70%" onPress={handleLogin} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4F6D7A",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 150,
    height: 150,
  },
  card: {
    width: "70%",
    backgroundColor: "#ffffff",
    marginVertical: 20,
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

export default Register;
