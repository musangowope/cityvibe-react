import React from "react";
import { firebaseBasConfig } from "./utils/fireBaseConfig";
import LoginRoutes from "./views/LoginRoutes/LoginRoutes";
import AuthenticatedRoutes from "./views/AuthenticatedRoutes/AuthenticatedRoutes";

import LoadingPage from "./vendor/Loader";

import * as firebase from "firebase";

firebase.initializeApp(firebaseBasConfig);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      authenticated: false
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
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
