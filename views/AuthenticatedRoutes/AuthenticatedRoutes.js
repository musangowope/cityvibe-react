import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Explore from "./Explore";

const AuthenticatedRoutes = createStackNavigator({
  Explore: { screen: Explore },
});
export default createAppContainer(AuthenticatedRoutes);
