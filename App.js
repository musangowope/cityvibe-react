import React from "react";
import { NativeRouter, Route, Switch } from "react-router-native";
import { firebaseBasConfig } from "./utils/fireBaseConfig";
import Login from "./views/Login";
import Register from "./views/Register";
import ChooseBarType from "./views/ChooseBarType";
import LoadingPage from "./components/LoadingPage";
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
        console.log(user);
        this.setState({ loading: false, authenticated: true });
      } else {
        this.setState({ loading: false, authenticated: false });
      }
    });
  }

  render() {
    if (this.state.loading) return <LoadingPage />;
    if (!this.state.authenticated) {
      return (
        <NativeRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </NativeRouter>
      );
    }

    return (
      <NativeRouter>
        <Switch>
          <Route exact path="/" component={ChooseBarType} />
        </Switch>
      </NativeRouter>
    );
  }
}
