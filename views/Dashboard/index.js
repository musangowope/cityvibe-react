import React, { Component } from "react";
import { Platform, View } from "react-native";
import { Text, Input } from "react-native-elements";
import { Constants, Location, Permissions } from "expo";
import { Card, ListItem, Button, Icon } from "react-native-elements";

import { getNearMeUrl } from "../../functions/retrieveGooglePlaceUrls";
import axios from "axios";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      errorMessage: null,
      places: [],
      isLoadingPlaces: false
    };
  }

  componentDidMount() {
    this.getPlacesNearYou();
  }

  /*Recfactor for expo*/
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.location && this.state.location !== prevState.location) {
  //     this.getPlacesNearYou();
  //   }
  // }

  getPlacesNearYou = () => {
    this.setState({
      isLoadingPlaces: true
    });

    const { navigation } = this.props;
    // const {
    //   location: {
    //     coords: { latitude: lat, longitude: long }
    //   }
    // } = this.state;

    //Fix coordinates for now
    const lat = "-33.9650608";
    const long = "18.4580094";

    axios
      .get(getNearMeUrl(lat, long, navigation.getParam("placeType", null)))
      .then(res => {
        const {
          data: { results: places }
        } = res;

        this.setState(
          {
            isLoadingPlaces: false,
            places
          },
          () => {
            console.log(this.state.places);
          }
        );
      })
      .catch(e => {
        console.log("Oh no, there was some error", e);
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
    //
    // let text = "Accessing GPS Location..";
    // if (this.state.errorMessage) {
    //   text = this.state.errorMessage;
    // } else if (this.state.location) {
    //   text = JSON.stringify(this.state.location);
    // }

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
        {/*<Text>{text}</Text>*/}

        {/*<Input placeholder="search for pub, club or restaurant" />*/}

        {this.state.isLoadingPlaces && <Text>Loading places</Text>}

        <Card title="HELLO WORLD" image={`https://www.fillmurray.com/640/360`}>
          <Text style={{ marginBottom: 10 }}>
            The idea with React Native Elements is more about component
            structure than actual design.
          </Text>
          <Button
            backgroundColor="#03A9F4"
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0
            }}
            title="VIEW NOW"
          />
        </Card>
      </View>
    );
  }
}

export default Dashboard;
