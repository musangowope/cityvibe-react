import React, { Component, Fragment } from "react";
import { Platform, View, ImageBackground } from "react-native";
import Image from "react-native-remote-svg";
import { Constants, Location, Permissions } from "expo";
import axios from "axios";
import { Button } from "react-native-elements";
import DashboardNav from "./components/DashboardNav";
import ResultCard from "./components/ResultCard";
import FontText from "../../../vendor/FontText";
import LogoutButton from "../../../vendor/temporary-helper-componts/LogoutButton";
import { getNearMeUrl } from "../../../functions/retrieveGooglePlaceUrls";
import images from "../../../constants/image-constants";
import ImageButton from "../../../vendor/ImageButton";

class Explore extends Component {
  static navigationOptions = {
    headerTitle: "Some title",
    headerStyle: {
      display: "none"
    }
  };

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
            // console.log(this.state.places);
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
    //
    // let text = "Accessing GPS Location..";
    // if (this.state.errorMessage) {
    //   text = this.state.errorMessage;
    // } else if (this.state.location) {
    //   text = JSON.stringify(this.state.location);
    // }

    return (
      <Fragment>
        <DashboardNav />

        <View
          style={{
            marginLeft: 5
          }}
        >
          <FontText
            text="Explore"
            fontWeight="bold"
            textStyle={{
              fontSize: 32
            }}
          />
        </View>

        <View
          style={{
            flexWrap: "wrap",
            flexFlow: "row",
            flexDirection: "row"
          }}
        >
          <ImageButton
            bgImageUrl={images.categories.barBg}
            buttonIconUrl={images.icons.barImage}
            iconText="Bar"
            fontWeight="light"
            containerStyle={{
              flexBasis: "50%",
              padding: 5
            }}
          />

          <ImageButton
            bgImageUrl={images.categories.cafeBg}
            buttonIconUrl={images.icons.cafeImage}
            iconText="Cafe"
            fontWeight="light"
            containerStyle={{
              flexBasis: "50%",
              padding: 5
            }}
          />

          <ImageButton
            bgImageUrl={images.categories.restaurantBg}
            buttonIconUrl={images.icons.restaurantImage}
            iconText="Restaurant"
            fontWeight="light"
            containerStyle={{
              flexBasis: "50%",
              padding: 5
            }}
          />

          <ImageButton
            bgImageUrl={images.categories.nightClubBg}
            buttonIconUrl={images.icons.clubImage}
            iconText="Night Club"
            fontWeight="light"
            containerStyle={{
              flexBasis: "50%",
              padding: 5
            }}
          />
        </View>

        <ResultCard />

        <LogoutButton />

        {/*{this.state.isLoadingPlaces && <Text>Loading places</Text>}*/}

        {/*<Card title="HELLO WORLD" image={`https://www.fillmurray.com/640/360`}>*/}
        {/*<Text style={{ marginBottom: 10 }}>*/}
        {/*The idea with React Native Elements is more about component*/}
        {/*structure than actual design.*/}
        {/*</Text>*/}
        {/*<Button*/}
        {/*backgroundColor="#03A9F4"*/}
        {/*buttonStyle={{*/}
        {/*borderRadius: 0,*/}
        {/*marginLeft: 0,*/}
        {/*marginRight: 0,*/}
        {/*marginBottom: 0*/}
        {/*}}*/}
        {/*title="VIEW NOW"*/}
        {/*/>*/}
        {/*</Card>*/}
      </Fragment>
    );
  }
}

export default Explore;
