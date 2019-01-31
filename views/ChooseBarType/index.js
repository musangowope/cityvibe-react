import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LogoutButton from "../../components/temporary-helper-componts/LogoutButton";

const ChooseBarType = () => {
  return (
    <View style={styles.container}>
      <Text>Choose Bar Type</Text>
      <LogoutButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default ChooseBarType;
