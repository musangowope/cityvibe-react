import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import firebase from "firebase";
import { Link } from "react-router-native";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  // componentDidMount() {
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       console.log(user);
  //     }
  //   });
  // }

  loginUser = (email, password) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {});
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
        .then(result => {
          //Some Action will happen here
        })
        .catch(e => console.log(e));
    }
  }

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      let providerData = firebaseUser.providerData;
      providerData.forEach(item => {
        if (
          item.providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          item.uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      });
    }
    return false;
  };

  onSignIn = googleUser => {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    let unsubscribe = firebase.auth().onAuthStateChanged(
      function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          let credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInAndRetrieveDataWithCredential(credential)
            .then(result => console.log("user signed"))
            .catch(function(error) {
              // Handle Errors here.
              let errorCode = error.code;
              let errorMessage = error.message;
              // The email of the user's account used.
              let email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              let credential = error.credential;
              // ...
            });
        } else {
          console.log("User already signed-in Firebase.");
        }
      }.bind(this)
    );
  };

  static async loginWithGoogle() {
    try {
      const result = await Expo.Google.logInAsync({
        // behavior: "web",
        androidClientId:
          "680708776313-b7c3mpfistiteelfeecj5036t2tvdk82.apps.googleusercontent.com",
        iosClientId:
          "680708776313-b7c3mpfistiteelfeecj5036t2tvdk82.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
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
          <Link to="/register">
            <Text>Dont have an account?</Text>
          </Link>
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
          <Button
            style={{ width: "100%" }}
            title="Google"
            onPress={() => Login.loginWithGoogle()}
          />
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
