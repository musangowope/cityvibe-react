import React, { Component } from "react";
import { Text, Input, ButtonGroup } from "react-native-elements";
import { View } from "react-native";
import firebase from "firebase";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      displayName: null,
      gender: null,
      age: null,
      password: null,
      confirmPassword: null
    };
    this.updateGender = this.updateGender.bind(this);
  }
  updateGender(gender) {
    this.setState({ gender });
  }

  signUpUser = (email, password) => {
    try {
      if (this.state.password.length < 6) {
        alert("Please enter at least 6 characters");
      } else {
        firebase.auth().createUserWithEmailAndPassword(email, password);
      }
    } catch (e) {
      console.log("Error", e);
    }
  };

  render() {
    const genderChoices = ["Male", "Female", "Non-Binary"];
    const { gender } = this.state;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Sign Up</Text>
        <Input
          placeholder="Email Address"
          onChangeText={email => this.setState({ email })}
        />
        <Input
          placeholder="Username"
          onChangeText={displayName => this.setState({ displayName })}
        />
        <Input
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
        />
        <Input
          placeholder="Confirm Password"
          onChangeText={confirmPassword => this.setState({ confirmPassword })}
        />
        <ButtonGroup
          onPress={this.updateGender}
          selectedIndex={gender}
          buttons={genderChoices}
          containerStyle={{ height: 20 }}
        />

        <Input
          placeholder="Age"
          keyboardType="numeric"
          onChangeText={age => this.setState({ age })}
          maxLength={100}
        />
      </View>
    );
  }
}

export default Register;
