import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import api from "../services/api";
import PostItem from "../components/PostItem";
import useAuth from "../hooks/useAuth";

import logo from "../assets/logo-profile.png";
import ListEmpty from "../components/ListEmpty";

const Profile = () => {
  const navigation = useNavigation();

  const { user, logout } = useAuth();
  const [userInfo, setUserInfo] = useState({
    posts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.addListener("focus", () => {
      api.get("/profile").then((response) => {
        const { data } = response;
        setUserInfo(data);

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

  const ListHeaderComponent = () => (
    <ImageBackground
      style={styles.header}
      imageStyle={styles.image}
      source={logo}
      resizeMode="center"
    >
      <TouchableOpacity style={styles.btn} onPress={logout}>
        <Feather name="log-out" size={22} color="#fff" />
      </TouchableOpacity>
      <View style={styles.headerInfo}>
        <View>
          <Text style={styles.headerTitle}>{user?.name}</Text>
          <Text style={styles.headerSubtitle}>{user?.email}</Text>
        </View>
        <View>
          <Text style={[styles.headerTitle, styles.followers]}>
            {userInfo.followers}
          </Text>
          <Text style={styles.headerSubtitle}>Seguindo</Text>
        </View>
      </View>
    </ImageBackground>
  );

  const ListEmptyComponent = () => (
    <ListEmpty loading={loading} message="Nenhum post encontrado" />
  );

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={userInfo?.posts.length === 0 ? styles.content : {}}
      data={userInfo.posts}
      keyExtractor={(post) => post._id}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  header: {
    width: "100%",
    height: 240,
    backgroundColor: "#4F6D7A",
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  btn: {
    padding: 15,
    alignSelf: "flex-end",
  },
  headerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
  },
  headerSubtitle: {
    color: "#A9A9A9",
    fontSize: 18,
  },
  followers: {
    textAlign: "center",
  },
  list: {
    flex: 1,
  },
});

export default Profile;
