import React, { useState, useEffect, Fragment } from "react";
import { firebaseBasConfig } from "./utils/fireBaseConfig";
import LoginRoutes from "./views/LoginRoutes/LoginRoutes";
import AuthenticatedRoutes from "./views/AuthenticatedRoutes/AuthenticatedRoutes";

import LoadingPage from "./SharedComponents/Loader";

import * as firebase from "firebase";

firebase.initializeApp(firebaseBasConfig);

const App = () => {
  const [isAuthenticated, setAuthenticationState] = useState(false);
  const [loading, setLoadingState] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setLoadingState(false);
        setAuthenticationState(true);
      } else {
        setLoadingState(false);
        setAuthenticationState(false);
      }
    });
  }, []);

  const getRoute = () => {
    if (loading) return <LoadingPage />;
    if (!isAuthenticated) {
      return <LoginRoutes />;
    }
    return <AuthenticatedRoutes />;
  };

  return <Fragment>{getRoute()}</Fragment>;
};

export default App;
