import React, { useState, useEffect, useContext, createContext } from "react";
import { Alert, AsyncStorage } from "react-native";

import api from "../services/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("@postmake/token").then((tokenResult) => {
      if (tokenResult) {
        AsyncStorage.getItem("@postmake/user").then((userResult) => {
          setUser(JSON.parse(userResult));
        });
      }
      setLogged(!!tokenResult);
    });
  }, []);

  const login = async (userParams) => {
    const { status, data } = await api.post("/login", userParams);
    if (status === 200) {
      await AsyncStorage.setItem("@postmake/token", data.token);
      await AsyncStorage.setItem("@postmake/user", JSON.stringify(data.user));

      setUser(data.user);
      setLogged(true);
    } else {
      Alert.alert("Ops!", data.error);
    }
  };

  const register = async (userParams) => {
    const { status, data } = await api.post("/register", userParams);
    if (status === 201) {
      await AsyncStorage.setItem("@postmake/token", data.token);
      await AsyncStorage.setItem("@postmake/user", JSON.stringify(data.user));

      setUser(data.user);
      setLogged(true);
    } else {
      Alert.alert("Ops!", data.error);
    }
  };

  const logout = async () => {
    await AsyncStorage.clear();
    setUser(null);
    setLogged(false);
  };

  return (
    <AuthContext.Provider value={{ logged, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
