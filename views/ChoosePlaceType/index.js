import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Slick from "react-native-slick";
import { Button } from "react-native-elements";

class ChoosePlaceType extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Slick style={styles.wrapper} showsButtons={true}>
        <View style={styles.slide1}>
          <Text style={styles.text}>Pub</Text>
          <Button
            style={{ width: "100%" }}
            title="Drink at a Bar"
            onPress={() => {
              this.props.navigation.navigate("Dashboard", {
                placeType: "bar"
              });
            }}
          />
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Club</Text>
          <Button
            style={{ width: "100%" }}
            title="Party at a club"
            onPress={() => {
              this.props.navigation.navigate("Dashboard", {
                placeType: "club"
              });
            }}
          />
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>Restaurant</Text>
          <Button
            style={{ width: "100%" }}
            title="Eat at a restaurant"
            onPress={() => {
              this.props.navigation.navigate("Dashboard", {
                placeType: "restaurant"
              });
            }}
          />
        </View>
      </Slick>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB"
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5"
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  }
});

export default ChoosePlaceType;
