import React from "react";
import { View, Image, Text } from "react-native";
import { Button, Input, Icon } from "react-native-elements";
import firebase from "firebase";
import { LinearGradient, Font } from "expo";
import FontText from "../../../vendor/FontText";
import LoginBg from "../../../assets/homepage-bg.png";
import colors from "../../../constants/colors";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      fontLoaded: false
    };
  }

  static navigationOptions = {
    headerStyle: {
      display: "none"
    }
  };

  loadAssetAsync = async () => {
    await Font.loadAsync({
      "open-sans-condensed-bold": require("../../../assets/fonts/OpenSansCondensed-Bold.ttf")
    });
    this.setState({ fontLoaded: true });
  };

  componentDidMount() {
    this.loadAssetAsync();
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
    const openSansCondensedBoldStyle = () => {
      return this.state.fontLoaded
        ? { fontFamily: "open-sans-condensed-bold" }
        : {};
    };

    return (
      <View
        style={{
          backgroundColor: colors.white,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          position: "relative"
        }}
      >
        <View
          style={{
            position: "absolute",
            backgroundColor: colors.hotpink,
            width: "100%",
            height: "100%"
          }}
        />

        <Image
          source={LoginBg}
          style={{ width: "100%", height: "100%", position: "absolute" }}
        />

        <LinearGradient
          colors={["transparent", colors.lightpink]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: "100%",
            width: "100%"
          }}
        />

        <View
          style={{
            width: "100%",
            height: "100%",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            padding: 20
          }}
        >
          <FontText
            text="CITY VIBE"
            textStyle={{
              color: "white",
              fontSize: 50
            }}
          />

          <View style={{ width: "100%", marginTop: 10, marginBottom: 10 }}>
            <FontText
              text="EMAIL"
              fontWeight="bold"
              textStyle={{
                color: "white",
                fontSize: 16
              }}
            />
            <Input
              onChangeText={email => this.setState({ email })}
              value={this.state.email.toLowerCase()}
              containerStyle={{
                marginTop: 10,
                marginBottom: 10
              }}
              inputStyle={{
                backgroundColor: "rgba(165, 199, 247, 0.8)",
                padding: 10,
                height: 60,
                color: colors.white
              }}
            />
          </View>

          <View style={{ width: "100%", marginTop: 10, marginBottom: 10 }}>
            <FontText
              text="PASSWORD"
              fontWeight="bold"
              textStyle={{
                color: "white",
                fontSize: 16
              }}
            />

            <Input
              onChangeText={password => this.setState({ password })}
              value={this.state.password.toLowerCase()}
              containerStyle={{
                marginTop: 10,
                marginBottom: 10
              }}
              inputStyle={{
                backgroundColor: "rgba(165, 199, 247, 0.8)",
                padding: 10,
                height: 60,
                color: colors.white,
                ...openSansCondensedBoldStyle()
              }}
              labelStyle={{
                color: colors.white,
                ...openSansCondensedBoldStyle()
              }}
            />
          </View>

          <View style={{ width: "100%", marginTop: 10, marginBottom: 10 }}>
            <Button
              type="solid"
              buttonStyle={{
                backgroundColor: colors.lightpink,
                marginLeft: 10,
                marginRight: 10,
                borderRadius: 0,
                height: 60
              }}
              title="LOGIN"
              titleStyle={{
                ...openSansCondensedBoldStyle()
              }}
              onPress={() => {
                this.loginUser(this.state.email, this.state.password);
              }}
            />
          </View>
          <View
            style={{
              width: "100%",
              marginBottom: 10,
              position: "relative",
              justifyContent: "flex-end"
            }}
          >
            <Button
              title="DON'T HAVE AN ACCOUNT?"
              containerStyle={{
                position: "relative"
              }}
              titleStyle={{
                color: colors.white,
                position: "absolute",
                left: 5,
                ...openSansCondensedBoldStyle()
              }}
              type="clear"
              onPress={() => {
                this.props.navigation.navigate("Register");
              }}
            />
          </View>

          <FontText
            text="OR"
            fontWeight="bold"
            textStyle={{
              color: "white",
              fontSize: 16
            }}
          />

          <View
            style={{
              width: "100%",
              marginTop: 10,
              marginBottom: 10,
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <Icon
              raised
              name="facebook-square"
              type="font-awesome"
              color="#5245AE"
              reverse
              onPress={() => this.loginWithFacebook()}
            />

            <Icon
              raised
              name="google"
              type="font-awesome"
              color="#F73A39"
              reverse
              onPress={() => console.log("hello")}
            />
          </View>
        </View>
      </View>
    );
  }
}
