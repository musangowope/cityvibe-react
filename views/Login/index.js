import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";

export default class Login extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>CityVibe</Text>
        <Input placeholder="Email Address" />
        <Input placeholder="Password" />
        <View
          style={{
            width: "100%",
            marginBottom: 10
          }}
        >
          <Text style={{ textAlign: "right" }}>Dont have an account</Text>
        </View>
        <Text>OR</Text>

        <View style={{width: "100%", marginTop: 10, marginEnd: 10}}><Button style={{width: '100%'}} title="Login"/></View>
        <View style={{width: "100%", marginTop: 10, marginEnd: 10}}><Button style={{width: '100%'}} title="Facebook"/></View>
        <View style={{width: "100%", marginTop: 10, marginEnd: 10}}><Button style={{width: '100%'}} title="Google"/></View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
