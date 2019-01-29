import React from "react";
import { NativeRouter, Route } from "react-router-native";
import Login from './views/Login'

export default class App extends React.Component {
  render() {
    return (
      <NativeRouter>
        <Route exact path="/" component={Login} />
      </NativeRouter>
    );
  }
}
