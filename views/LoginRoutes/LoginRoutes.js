import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from "./Login";
import Register from "./Register";

const LoginRoutes = createStackNavigator({
  Login: { screen: Login },
  Register: { screen: Register }
});
export default createAppContainer(LoginRoutes);
