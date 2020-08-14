import React from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { AuthProvider } from "./src/hooks/useAuth";
import Routes from "./src/routes";

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#49636F" />
          <Routes />
        </SafeAreaView>
      </AuthProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#49636F",
  },
});

export default App;
