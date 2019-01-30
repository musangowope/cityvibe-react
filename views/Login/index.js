import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import firebase from "firebase";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);
      }
    });
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

  loginUser = (email, password) => {
    console.log(email, password);
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          console.log(user);
        });
    } catch (e) {
      console.log("Error", e);
    }
  };

  async loginWithFacebook() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      "367516193677709",
      { permissions: ["public_profile"] }
    );
    if (type === "success") {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
        .then(user => {
          console.log(user);
        })
        .catch(e => console.log(e));
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>CityVibe</Text>
        <Input
          placeholder="Email Address"
          onChangeText={email => this.setState({ email })}
        />
        <Input
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
        />
        <View style={{ width: "100%", marginTop: 10, marginEnd: 10 }}>
          <Button
            style={{ width: "100%" }}
            title="Login"
            onPress={() => {
              this.loginUser(this.state.email, this.state.password);
            }}
          />
        </View>
        <View
          style={{
            width: "100%",
            marginBottom: 10,
            marginTop: 10
          }}
        >
          <Button
            title="Don't have an account?"
            type="clear"
            onPress={() => {
              this.signUpUser(this.state.email, this.state.password);
            }}
          />
        </View>
        <Text>OR</Text>

        <View style={{ width: "100%", marginTop: 10, marginEnd: 10 }}>
          <Button
            style={{ width: "100%" }}
            title="Facebook"
            onPress={() => {
              this.loginWithFacebook();
            }}
          />
        </View>
        <View style={{ width: "100%", marginTop: 10, marginEnd: 10 }}>
          <Button style={{ width: "100%" }} title="Google" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
