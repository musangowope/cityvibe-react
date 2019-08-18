import React, { Fragment } from "react";
import { View, ImageBackground } from "react-native";
import Image from "react-native-remote-svg";
import PropTypes from "prop-types";
import { Button, Text } from "react-native-elements";
import FontText from "./FontText";

const ImageButton = ({
  containerStyle,
  bgImageStyle,
  bgImageUrl,
  buttonIconUrl,
  iconText,
  iconTextStyle,
  fontWeight
}) => {
  return (
    <View
      style={{
        width: "100%",
        height: 100,
        ...containerStyle
      }}
    >
      <ImageBackground
        source={bgImageUrl}
        style={{
          width: "100%",
          height: "100%"
        }}
      >
        <Button
          buttonStyle={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            ...bgImageStyle
          }}
          icon={
            <Fragment>
              {buttonIconUrl && <Image source={buttonIconUrl} />}
              <FontText
                fontWeight={fontWeight}
                text={iconText}
                textStyle={{
                  color: "#FFF",
                  marginLeft: 5,
                  marginRight: 5,
                  fontSize: 24,
                  ...iconTextStyle
                }}
              />
            </Fragment>
          }
        />
      </ImageBackground>
      <FontText
        text={iconText}
        textStyle={{
          color: "#FFF",
          marginLeft: 5,
          marginRight: 5,
          fontSize: 24,
          ...iconTextStyle
        }}
      />
    </View>
  );
};

ImageButton.propTypes = {
  containerStyle: PropTypes.object,
  bgImageUrl: PropTypes.any,
  buttonIconUrl: PropTypes.any,
  iconText: PropTypes.string,
  iconTextStyle: PropTypes.object,
  bgImageStyle: PropTypes.object,
  fontWeight: PropTypes.string,
};
ImageButton.defaultProps = {
  containerStyle: {},
  bgImageUrl: "",
  buttonIconUrl: "",
  iconText: "",
  iconTextStyle: {},
  bgImageStyle: {},
  fontWeight: 'bold'
};

export default ImageButton;
