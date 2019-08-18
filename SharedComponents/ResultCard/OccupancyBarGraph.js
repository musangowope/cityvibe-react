import React, { Fragment } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import FontText from "../FontText";

const OccupancyBarGraph = ({ percentage }) => {
  const percentageText = `${percentage}%`;
  return (
    <Fragment>
      <FontText
        text="OCCUPANCY AT THIS HOUR"
        textStyle={{
          color: "#FFF",
          marginBottom: 5
        }}
      />
      <View
        style={{
          backgroundColor: "rgba(255, 15, 95, 0.43)",
          height: 30,
          width: "100%",
          position: "relative",
          margin: "auto",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View
          style={{
            backgroundColor: "#ff0f5f",
            width: `${percentage}%`,
            color: "#fff",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0
          }}
        />

        <FontText
          text={percentageText}
          textStyle={{
            color: "#FFF"
          }}
        />
      </View>
    </Fragment>
  );
};

OccupancyBarGraph.propTypes = {
  percentage: PropTypes.number
};
OccupancyBarGraph.defaultProps = {
  percentage: 15
};

export default OccupancyBarGraph;
