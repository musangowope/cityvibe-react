import React, { useState } from "react";
import posed from "react-native-pose";
import PropTypes from "prop-types";
import { Button, Icon, Input } from "react-native-elements";

const SearchInputWrapper = posed.View({
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
});

const SearchInput = ({ isActive, toggleMenu }) => {
  return (
    <SearchInputWrapper
      style={{
        position: "absolute",
        left: 0,
        bottom: 0,
        top: 20,
        width: "100%",
        height: 80
      }}
      pose={isActive ? "visible" : "hidden"}
    >
      <Input
        placeholder="Pub, club, nightclub or restaurant"
        leftIcon={
          <Button
            onPress={toggleMenu.bind(null, false)}
            type="clear"
            icon={<Icon name="chevron-left" type="font-awesome" color="#fff" />}
          />
        }
        containerStyle={{
          width: "100%",
          backgroundColor: "#5245AE",
          alignItems: "center",
          justifyContent: "center",
          height: "100%"
        }}
        inputContainerStyle={{
          borderBottomColor: "rgba(165,199,247,0)"
        }}
        inputStyle={{
          marginLeft: 10,
          paddingLeft: 10,
          backgroundColor: "#A5C7F7",
          borderRadius: 50
        }}
        placeholderTextColor="#ffff"
        placeholderStyle={{
          color: "#fff"
        }}
      />
    </SearchInputWrapper>
  );
};

SearchInput.propTypes = {
  isActive: PropTypes.bool,
  toggleMenu: PropTypes.func.isRequired
};
SearchInput.defaultProps = {
  isActive: false
};

export default SearchInput;
