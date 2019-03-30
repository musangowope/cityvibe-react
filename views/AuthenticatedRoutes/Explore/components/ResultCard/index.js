import React from "react";
import Image from "react-native-remote-svg";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import OccupancyBarGraph from "./OccupancyBarGraph";
import FontText from "../../../../../vendor/FontText";
import FontButton from "../../../../../vendor/FontButton";
import images from "../../../../../constants/image-constants";

const ResultCard = ({
  placeTitle,
  placeAddress,
  occupancyRate,
  upVotes,
  downVotes,
  placeImageUrl
}) => {
  return (
    <View
      style={{
        backgroundColor: "#022141",
        height: 350,
        margin: 5
      }}
    >
      <View
        style={{
          height: "60%",
          position: "relative"
        }}
      >
        <Image
          style={{ height: "100%", width: "100%", position: "absolute" }}
          source={placeImageUrl}
        />
        <View
          style={{
            width: "100%",
            height: "100%",
            // justifyContent: "space-between",
            flexDirection: "column",
            flexFlow: "column",
            justifyContent: "space-between"
          }}
        >
          <View style={{ backgroundColor: "#FF7CC4", width: "40%" }}>
            <FontText
              text={placeTitle.toUpperCase()}
              fontWeight="bold"
              textStyle={{
                color: "#FFFF",
                padding: 5,
                marginTop: "auto",
                marginBottom: "auto",
                marginLeft: "auto",
                marginRight: "auto",
                fontSize: 16
              }}
            />
          </View>

          <View>
            <View style={{ margin: 10 }}>
              <OccupancyBarGraph />
            </View>
            <FontButton
              text="VIEW DETAILS"
              fontWeight="bold"
              containerStyle={{
                margin: 0,
                backgroundColor: "#B181DB"
              }}
              textStyle={{
                color: "#FFFF",
                padding: 5,
                marginTop: "auto",
                marginBottom: "auto",
                marginLeft: "auto",
                marginRight: "auto",
                width: "100%"
              }}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          height: "40%",
          backgroundColor: "#5245AE",
          flexDirection: "column",
          flexFlow: "column",
          justifyContent: "space-between"
        }}
      >
        <FontText
          text={placeAddress}
          fontWeight="light"
          textStyle={{
            color: "#fff",
            padding: 10
          }}
        />

        <View style={{ alignSelf: "flex-end" }}>
          <FontText
            text="VOTES TONIGHT"
            fontWeight="light"
            textStyle={{
              color: "#fff"
            }}
          />

          <View
            style={{
              flexDirection: "row",
              flexFlow: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image source={images.icons.heartImage} />
            <FontText
              text={upVotes.toString()}
              fontWeight="light"
              textStyle={{
                color: "#fff",
                padding: 10
              }}
            />

            <Image source={images.icons.dislikeImage} />
            <FontText
              text={downVotes.toString()}
              fontWeight="light"
              textStyle={{
                color: "#fff",
                padding: 10
              }}
            />
          </View>
        </View>
        <View />
      </View>
    </View>
  );
};

ResultCard.propTypes = {
  placeTitle: PropTypes.string,
  placeAddress: PropTypes.string,
  occupancyRate: PropTypes.number,
  upVotes: PropTypes.number,
  downVotes: PropTypes.number,
  placeImageUrl: PropTypes.any
};

ResultCard.defaultProps = {
  placeTitle: "No title",
  placeAddress: "No address",
  occupancyRate: 0,
  upVotes: 0,
  downVotes: 0,
  placeImageUrl: images.placeholderImage
};

export default ResultCard;
