import React, { Fragment } from "react";
import { Header } from "react-native-elements";
import Image from "react-native-remote-svg";
import images from "../../../../../constants/image-constants";

const DashboardNav = () => {
  return (
    <Fragment>
      <Header
        // statusBarProps={{ barStyle: 'light-content' }}
        barStyle="light-content" // or directly
        leftComponent={<Image source={images.icons.searchImage} />}
        centerComponent={<Image source={images.icons.starImage} />}
        rightComponent={<Image source={images.icons.avatarImage} />}
        containerStyle={{
          backgroundColor: "#5245AE",
          justifyContent: "space-around"
        }}
      />
    </Fragment>
  );
};

DashboardNav.propTypes = {};
DashboardNav.defaultProps = {};

export default DashboardNav;
