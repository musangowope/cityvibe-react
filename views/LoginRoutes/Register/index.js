import React, { Component } from "react";
import { Text, Input, ButtonGroup, Button } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import isAlphaNumeric from "../../../functions/isAlphaNumeric.func";
import isValidEmail from "../../../functions/isValidEmail.func";
import { View } from "react-native";
import firebase from "firebase";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        email: {
          value: null,
          validationMessage: ""
        },
        displayName: {
          value: null,
          validationMessage: ""
        },
        gender: {
          value: null,
          validationMessage: "",
          genderString: ""
        },
        dateOfBirth: {
          value: null,
          validationMessage: ""
        },
        password: {
          value: null,
          validationMessage: ""
        }
      },
      validationError: false
    };
    this.updateGender = this.updateGender.bind(this);
  }
  updateGender = genderIndex => {
    this.updateValue("gender", genderIndex);
  };

  determineGender = index => {
    switch (index) {
      case 0:
        return "Male";
      case 1:
        return "Female";
      case 2:
        return "Non-Binary";
      default:
        return null;
    }
  };

  performValidationRules = (fieldName, field) => {
    switch (fieldName) {
      case "email":
        if (!field.value) {
          this.setState(prevState => ({
            ...prevState,
            fields: {
              ...prevState.fields,
              [fieldName]: {
                ...prevState.fields[fieldName],
                validationMessage: `${fieldName} is required`
              },
              validationError: true
            }
          }));
        } else if (!isValidEmail(this.state.fields.email.value)) {
          this.setState(prevState => ({
            ...prevState,
            fields: {
              ...prevState.fields,
              email: {
                ...prevState.fields.email,
                validationMessage: `Email must be valid`
              }
            },
            validationError: true
          }));
        }
        break;

      case "password":
        if (!field.value) {
          this.setState(prevState => ({
            ...prevState,
            fields: {
              ...prevState.fields,
              [fieldName]: {
                ...prevState.fields[fieldName],
                validationMessage: `${fieldName} is required`
              },
              validationError: true
            }
          }));
        } else if (this.state.fields.password.value.length < 6) {
          this.setState(prevState => ({
            ...prevState,
            fields: {
              ...prevState.fields,
              password: {
                ...prevState.fields[fieldName],
                validationMessage: "Password must be more than 6 characters"
              }
            },
            validationError: true
          }));
        } else if (!isAlphaNumeric(this.state.fields.password.value)) {
          this.setState(prevState => ({
            ...prevState,
            fields: {
              ...prevState.fields,
              password: {
                ...prevState.fields[fieldName],
                validationMessage: "Must be an alphanumeric value"
              },
              validationError: true
            }
          }));
        }
        break;

      case "gender":
        this.setState(
          prevState => ({
            fields: {
              ...prevState.fields,
              gender: {
                ...prevState.fields.gender,
                genderString: this.determineGender(field.value)
              }
            }
          }),
          () => {
            if (!this.state.fields.gender.genderString) {
              this.setState(prevState => ({
                fields: {
                  ...prevState.fields,
                  gender: {
                    ...prevState.fields[fieldName],
                    validationMessage: `${fieldName} is required`
                  },
                  validationError: true
                }
              }));
            }
          }
        );

        break;

      case "displayName":
      case "dateOfBirth":
        if (!field.value) {
          this.setState(prevState => ({
            ...prevState,
            fields: {
              ...prevState.fields,
              [fieldName]: {
                ...prevState.fields[fieldName],
                validationMessage: `${fieldName} is required`
              },
              validationError: true
            }
          }));
        }
        break;
    }
  };

  registerValidation = () => {
    this.setState({ validationError: false }, () => {
      const fieldPropNames = Object.keys(this.state.fields);
      const fields = Object.values(this.state.fields);
      fields.forEach((field, key) => {
        this.performValidationRules(fieldPropNames[key], field);
      });
    });

    if (!this.state.validationError) {
      this.signUpUser(
        this.state.fields.email.value,
        this.state.fields.password.value
      );
    }
  };

  signUpUser = (email, password) => {
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(result => {
          console.log("Result", result);
        })
        .catch(e => console.log(e.toString()));
    } catch (e) {
      console.log(e.toString());
    }
  };

  updateValue = (fieldName, value) => {
    this.setState(prevState => ({
      fields: {
        ...prevState.fields,
        [fieldName]: {
          ...prevState.fields[fieldName],
          value,
          validationMessage: ""
        }
      }
    }));
  };

  render() {
    const genderChoices = ["Male", "Female", "Non-Binary"];
    const {
      gender: { value: genderIndex }
    } = this.state.fields;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 25
        }}
      >
        <Text>Sign Up</Text>
        <Input
          placeholder="Email Address"
          errorStyle={{ color: "red" }}
          errorMessage={this.state.fields.email.validationMessage}
          onChangeText={value => {
            this.updateValue("email", value.toLowerCase().trim());
          }}
        />

        <Input
          placeholder="What should we call you"
          errorStyle={{ color: "red" }}
          autoCapitalize="none"
          errorMessage={this.state.fields.displayName.validationMessage}
          onChangeText={value => this.updateValue("displayName", value.trim())}
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          errorStyle={{ color: "red" }}
          errorMessage={this.state.fields.password.validationMessage}
          onChangeText={value => this.updateValue("password", value)}
        />

        <ButtonGroup
          onPress={this.updateGender}
          selectedIndex={genderIndex}
          buttons={genderChoices}
          containerStyle={{
            height: 20,
            borderColor: this.state.fields.gender.validationMessage
              ? "red"
              : "grey"
          }}
        />

        <Text style={{ color: "red" }}>
          {this.state.fields.gender.validationMessage}
        </Text>

        <DatePicker
          style={{ width: 200 }}
          date={this.state.fields.dateOfBirth.value}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            width: "100%",
            borderColor: this.state.fields.dateOfBirth.validationMessage
              ? "red"
              : "grey"
          }}
          onDateChange={value => this.updateValue("dateOfBirth", value)}
        />

        <Text style={{ color: "red" }}>
          {this.state.fields.dateOfBirth.validationMessage}
        </Text>

        <View style={{ width: "100%", marginTop: 10, marginEnd: 10 }}>
          <Button
            style={{ width: "100%" }}
            title="Register"
            onPress={() => this.registerValidation()}
          />
        </View>
      </View>
    );
  }
}

export default Register;
