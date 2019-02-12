import React from "react";
import { Button } from "react-native-elements";
import { withRouter } from "react-router-native";

const BackButton = ({ history }) => {
  return (
    <Button
      style={{ width: "100%" }}
      title="Back"
      onPress={() => history.goBack()}
    />
  );
};

export default withRouter(BackButton);
