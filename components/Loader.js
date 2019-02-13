import React from 'react';
import { StyleSheet, Text, View } from "react-native";

const Loader = () => {
  return (
    <View style={styles.container}>
      <Text>Loading</Text>
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


export default Loader;
