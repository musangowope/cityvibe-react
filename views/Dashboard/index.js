import React, { Component } from "react";
import { Platform, View } from "react-native";
import { Text, Input } from "react-native-elements";
import { Constants, Location, Permissions } from "expo";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      errorMessage: null
    };
  }

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  render() {
    const { navigation } = this.props;
    const placeType = navigation.getParam(
      "placeType",
      "No place type selected"
    );

    let text = "Waiting..";
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }

    return (
      <View
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          padding: 10
        }}
      >
        <Text>The dashboard. The bar type is {placeType}</Text>
        <Text>Location, {text}</Text>
        <Input placeholder="search for pub, club or restaurant" />
      </View>
    );
  }
}

export default Dashboard;
