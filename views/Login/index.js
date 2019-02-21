import React from "react";
import { View, Image } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import firebase from "firebase";
import LoginBg from "../../assets/homepage-bg.png";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  static navigationOptions = {
    headerStyle: {
      display: "none"
    }
  };

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
      <View
        style={{
          backgroundColor: "#fff",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          position: "relative"
        }}
      >
        <View
          style={{
            position: "absolute",
            backgroundColor: "#FF0F5F",
            width: "100%",
            height: "100%"
          }}
        />

        <Image
          source={LoginBg}
          style={{ width: "100%", height: "100%", position: "absolute" }}
        />

        <View
          style={{
            width: "100%",
            height: "100%",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999
          }}
        >
          <Text style={{ color: "white", textTransform: "uppercase" }} h1>
            CITY VIBE
          </Text>
          <Input
            label="EMAIL ADDRESS"
            onChangeText={email => this.setState({ email })}
            containerStyle={{
              marginTop: 10,
              marginBottom: 10
            }}
            inputStyle={{
              backgroundColor: "rgba(165, 199, 247, 0.8)",
              padding: 10,
            }}
            labelStyle={{
              color: '#fff'
            }}
          />
          <Input
            label="PASSWORD"
            onChangeText={password => this.setState({ password })}
            containerStyle={{
              marginTop: 10,
              marginBottom: 10
            }}
            inputStyle={{
              backgroundColor: "rgba(165, 199, 247, 0.8)",
              padding: 10,
            }}
            labelStyle={{
              color: '#fff'
            }}
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
              title="Dont have an account"
              type="clear"
              onPress={() => {
                this.props.navigation.navigate("Register");
              }}
            >
              <Text>Dont have an account?</Text>
            </Button>
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
              disabled
              onPress={() => Login.loginWithGoogle()}
            />
          </View>
        </View>
      </View>
    );
  }
}
