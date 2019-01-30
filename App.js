import React from "react";
import { NativeRouter, Route } from "react-router-native";
import { firebaseBasConfig } from "./utils/fireBaseConfig";
import Login from "./views/Login";
import * as firebase from "firebase";

firebase.initializeApp(firebaseBasConfig);

export default class App extends React.Component {
  render() {
    return (
      <NativeRouter>
        <Route exact path="/" component={Login} />
      </NativeRouter>
    );
  }
}
