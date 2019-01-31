import React from "react";
import { Button } from "react-native-elements";
import firebase from "firebase";

const LogoutButton = () => {
  const signOutUser = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Button style={{ width: "100%" }} title="Logout" onPress={signOutUser} />
  );
};

export default LogoutButton;
