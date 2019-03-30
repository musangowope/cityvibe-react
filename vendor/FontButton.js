import React, { Component, Fragment } from "react";
import { Font } from "expo";
import PropTypes from "prop-types";
import { Button } from "react-native-elements";

class FontButton extends Component {
  static defaultProps = {
    textStyle: {},
    fontWeight: "bold",
    text: "",
    containerStyle: {}
  };

  static propTypes = {
    textStyle: PropTypes.object,
    fontWeight: PropTypes.string,
    text: PropTypes.string,
    containerStyle: PropTypes.object
  };

  state = {
    fontLoaded: false,
    fontFamily: ""
  };

  loadFont = (fontWeight = null) => {
    switch (fontWeight) {
      case "light":
        this.setState({
          fontFamily: "open-sans-condensed-light"
        });
        return {
          "open-sans-condensed-light": require("../assets/fonts/OpenSansCondensed-Light.ttf")
        };
      case "light-italic":
        this.setState({
          fontFamily: "open-sans-condensed-light-italic"
        });
        return {
          "open-sans-condensed-light-italic": require("../assets/fonts/OpenSansCondensed-LightItalic.ttf")
        };
      case "bold":
        this.setState({
          fontFamily: "open-sans-condensed-bold"
        });
        return {
          "open-sans-condensed-bold": require("../assets/fonts/OpenSansCondensed-Bold.ttf")
        };
      default:
        return {
          "open-sans-condensed-light": require("../assets/fonts/OpenSansCondensed-Light.ttf")
        };
    }
  };

  loadAssetAsync = async () => {
    await Font.loadAsync(this.loadFont(this.props.fontWeight));
    this.setState({ fontLoaded: true });
  };

  componentDidMount() {
    this.loadAssetAsync();
  }

  render() {
    return (
      <Fragment>
        {this.state.fontLoaded ? (
          <Button
            titleStyle={{
              fontFamily: this.state.fontFamily,
              fontSize: 16,
              ...this.props.textStyle
            }}
            containerStyle={{ ...this.props.containerStyle }}
            title={this.props.text}
            type="clear"
          />
        ) : null}
      </Fragment>
    );
  }
}

export default FontButton;
