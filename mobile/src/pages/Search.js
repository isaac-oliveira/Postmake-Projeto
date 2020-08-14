import React, { useState, useEffect } from "react";
import { View, FlatList, TextInput, StyleSheet } from "react-native";

import api from "../services/api";
import UserItem from "../components/UserItem";
import ListEmpty from "../components/ListEmpty";
import { Feather } from "@expo/vector-icons";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/user?search=${search}`).then((response) => {
      const { data } = response;
      setUsers(data);

      setLoading(false);
    });
  }, [search]);

  const renderItem = ({ item }) => {
    return <UserItem following={item.following} user={item.user} />;
  };

  const ListEmptyComponent = () => (
    <ListEmpty loading={loading} message="Nenhum usuário encontrado" />
  );

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar"
          value={search}
          onChangeText={setSearch}
        />
        <Feather style={styles.icon} name="search" size={16} />
      </View>
      <FlatList
        style={styles.list}
        contentContainerStyle={users.length === 0 ? styles.content : {}}
        data={users}
        keyExtractor={(item) => item.user.id}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    paddingHorizontal: 15,
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
  icon: {
    padding: 10,
  },
  content: {
    flex: 1,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  list: {
    marginVertical: 5,
    marginHorizontal: 10,
  },
});

export default Search;
