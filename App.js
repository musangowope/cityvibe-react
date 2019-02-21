import React from "react";
import { firebaseBasConfig } from "./utils/fireBaseConfig";
import LoginRoutes from "./LoginRoutes";
import AuthenticatedRoutes from "./AuthenticatedRoutes";
import ChooseBarType from "./views/ChoosePlaceType";

import LoadingPage from "./components/Loader";

import * as firebase from "firebase";

firebase.initializeApp(firebaseBasConfig);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      authenticated: false
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // console.log(user);
        this.setState({ loading: false, authenticated: true });
      } else {
        this.setState({ loading: false, authenticated: false });
      }
    });
  }

  render() {
    if (this.state.loading) return <LoadingPage />;
    if (!this.state.authenticated) {
      return <LoginRoutes />;
    }

    return <AuthenticatedRoutes />;
  }
}
