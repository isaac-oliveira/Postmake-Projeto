import React, { useState, useEffect } from "react";
import { FlatList, Dimensions, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import api from "../services/api";
import PostItem from "../components/PostItem";
import ListEmpty from "../components/ListEmpty";

const Home = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.addListener("focus", () => {
      api.get("/feed").then((response) => {
        const { data } = response;
        setPosts(data);

        setLoading(false);
      });
    });
    return () => {
      navigation.removeListener("focus");
    };
  }, []);

  const renderItem = ({ item }) => {
    return <PostItem post={item} />;
  };

  const ListEmptyComponent = () => (
    <ListEmpty loading={loading} message="Nenhum post encontrado" />
  );

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={posts.length === 0 ? styles.content : {}}
      data={posts}
      keyExtractor={(post) => post._id}
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
  content: {
    flex: 1,
  },
});

export default Home;
