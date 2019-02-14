import React, { Component } from "react";
import { Platform, View } from "react-native";
import { Text, Input } from "react-native-elements";
import { Constants, Location, Permissions } from "expo";
import { getNearMeUrl } from "../../functions/retrieveGooglePlaceUrls";
import axios from "axios";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      errorMessage: null,
      places: []
    };
  }

  componentDidUpdate() {
    if (this.state.location) {
      this.getPlacesNearYou();
    }
  }

  getPlacesNearYou = () => {
    const { navigation } = this.props;
    const {
      location: {
        coords: { latitude: lat, longitude: long }
      }
    } = this.state;
    axios
      .get(getNearMeUrl(lat, long, navigation.getParam("placeType", null)))
      .then(res => {
        console.log(res.data)
      })
      .catch(e => {
        console.log('Oh no, there was some error', e)
      });
  };

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

        <Input placeholder="search for pub, club or restaurant" />
      </View>
    );
  }
}

export default Dashboard;
