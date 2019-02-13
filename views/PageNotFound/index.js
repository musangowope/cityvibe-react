import React, { Component } from "react";
import { View } from "react-native";
import { Text, Input } from "react-native-elements";
import { BackButton } from "react-router-native";

class PageNotFound extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          padding: 10
        }}
      >
        <BackButton />
        <Text>404</Text>
      </View>
    );
  }
}

export default PageNotFound;
