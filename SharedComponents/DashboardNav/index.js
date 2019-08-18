import React, { Fragment, useState } from "react";
import { View } from "react-native";
import { Button, Header } from "react-native-elements";
import Image from "react-native-remote-svg";
import images from "../../constants/image-constants";
import SearchInput from "../SearchInput";

const DashboardNav = () => {
  const [dashboardBoardState, setDashboardState] = useState({
    isSearchbarActive: false
  });

  const setSearchActiveState = status => {
    setDashboardState({
      ...dashboardBoardState,
      isSearchbarActive: status
    });
  };

  const { isSearchbarActive } = dashboardBoardState;

  return (
    <View
      style={{
        position: "relative",
        height: 100
      }}
    >
      <Header
        // statusBarProps={{ barStyle: 'light-content' }}
        barStyle="light-content" // or directly
        leftComponent={
          <Button
            onPress={setSearchActiveState.bind(null, true)}
            type="clear"
            icon={<Image source={images.icons.searchImage} />}
          />
        }
        centerComponent={<Image source={images.icons.starImage} />}
        rightComponent={<Image source={images.icons.avatarImage} />}
        containerStyle={{
          backgroundColor: "#5245AE",
          justifyContent: "space-around",
          position: "relative",
          zIndex: isSearchbarActive ? 0 : 7,
          height: "100%"
        }}
      />

      <SearchInput
        isActive={isSearchbarActive}
        toggleMenu={setSearchActiveState}
      />
    </View>
  );
};

export default DashboardNav;
