import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import ChooseBarType from "./views/ChoosePlaceType";
import Dashboard from "./views/Dashboard";

const AuthenticatedRoutes = createStackNavigator({
  ChooseBarType: { screen: ChooseBarType },
  Dashboard: { screen: Dashboard }
});
export default createAppContainer(AuthenticatedRoutes);
