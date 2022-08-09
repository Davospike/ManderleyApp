import React, { useReducer, useCallback, useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import * as firebase from "firebase";
import { forgotPassword } from "../../helpers/firebase";
import { TextInput, Button } from "react-native-paper";
import Colours from "../../../config/colours.json";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TextWrapper from "../../components/UI/Text/TextWrapper";
import { logEvent, events } from "../../helpers/amplitude";

/**
 * Function which, given state and action objects, creates a new state object
 *
 * @param {object} state
 * @param {object} action
 *
 * @returns {object} - New state object
 */
const localReducer = (state, action) => {
  switch (action.type) {
    //case for updating form
    case "UPDATE": {
      const inputValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };
      const isValid =
        inputValues["newPassword"] === inputValues["newPasswordConf"]
          ? true
          : false;
      return {
        ...state,
        inputValues,
        isValid,
      };
    }
    //case for clearing passwords
    case "CLEAR PASSWORDS": {
      const inputValues = {
        ...state.inputValues,
        currentPassword: "",
        newPassword: "",
        newPasswordConf: "",
      };
      return {
        ...state,
        inputValues,
      };
    }
    default:
      return state;
  }
};

/**
 * @component
 * @param  {Object} props
 */
const PasswordChange = (props) => {
  //old password
  const [pwSelected, setPwSelected] = useState(false);

  //new password
  const [newPwSelected, setNewPwSelected] = useState(false);

  //confirm password
  const [newPwConfSelected, setNewPwConfSelected] = useState(false);

  //defining state which is manipulated by the local reducer
  const [localState, localDispatch] = useReducer(localReducer, {
    inputValues: {
      currentPassword: "",
      newPassword: "",
      newPasswordConf: "",
    },
    isValid: false,
  });

  //handler for input changes => email, password of confirm password inputs
  const inputChangeHandler = useCallback(
    (input, value) => {
      localDispatch({
        type: "UPDATE",
        input,
        value,
      });
    },
    [localDispatch]
  );

  /**
   * This function will reset the password if all input fields are entered correctly
   * @returns {void}
   */
  const resetHandler = async () => {
    //validate input
    if (localState.isValid) {
      try {
        //generate credentials
        var user = firebase.auth().currentUser;
        var credential = firebase.auth.EmailAuthProvider.credential(
          user.email,
          localState.inputValues.currentPassword
        );

        //check credentials
        const result = await user.reauthenticateWithCredential(credential);
        if (result) {
          //update password
          await user.updatePassword(localState.inputValues.newPassword);
          logEvent(events.mySettings.mySettings_act_change_password_succ);
          Alert.alert("Password changed successfully", null, [
            { text: "OK", onPress: () => props.navigation.goBack() },
          ]);
        }
      } catch (error) {
        //warn user and clear passwords
        Alert.alert("Current password incorrect");
        localDispatch({
          type: "CLEAR PASSWORDS",
        });
      }
    } else {
      //warn user and clear passwords
      Alert.alert("Passwords do not match");
      localDispatch({
        type: "CLEAR PASSWORDS",
      });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name="lock-open-outline"
          size={28}
          color={pwSelected ? Colours["primary"] : Colours["grey-dark"]}
        />

        {/* current password */}
        <TextInput
          theme={{
            colors: {
              primary: Colours.primary,
              underlineColor: "transparent",
            },
          }}
          style={{
            width: Dimensions.get("window").width * 0.8,
          }}
          onFocus={() => {
            setPwSelected(true);
          }}
          onBlur={() => {
            setPwSelected(false);
          }}
          label="Current Password"
          mode="outlined"
          autoCorrect={false}
          onChangeText={(input) => inputChangeHandler("currentPassword", input)}
          placeholder="Enter your current password"
          secureTextEntry
          value={localState.inputValues.currentPassword}
        />
      </View>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name="lock-outline"
          size={28}
          color={newPwSelected ? Colours["primary"] : Colours["grey-dark"]}
        />
        {/* new password */}
        <TextInput
          theme={{
            colors: {
              primary: Colours.primary,
              underlineColor: "transparent",
            },
          }}
          style={{
            width: Dimensions.get("window").width * 0.8,
          }}
          onFocus={() => {
            setNewPwSelected(true);
          }}
          onBlur={() => {
            setNewPwSelected(false);
          }}
          label="New password"
          mode="outlined"
          autoCorrect={false}
          onChangeText={(input) => inputChangeHandler("newPassword", input)}
          placeholder="Input a new password"
          secureTextEntry
          value={localState.inputValues.newPassword}
        />
      </View>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name="lock-outline"
          size={28}
          color={newPwConfSelected ? Colours["primary"] : Colours["grey-dark"]}
        />
        {/* confirm password */}
        <TextInput
          theme={{
            colors: {
              primary: Colours.primary,
              underlineColor: "transparent",
            },
          }}
          style={{
            width: Dimensions.get("window").width * 0.8,
          }}
          onFocus={() => {
            setNewPwConfSelected(true);
          }}
          onBlur={() => {
            setNewPwConfSelected(false);
          }}
          label="Confirm new password"
          mode="outlined"
          autoCorrect={false}
          onChangeText={(input) => inputChangeHandler("newPasswordConf", input)}
          placeholder="Confirm your new password"
          secureTextEntry
          value={localState.inputValues.newPasswordConf}
        />
      </View>
      <View style={styles.buttonContainer}>
        {/* reset password */}
        <Button
          onPress={resetHandler}
          theme={{
            colors: {
              primary: Colours.primary,
              underlineColor: "transparent",
            },
          }}
          labelStyle={{ fontFamily: "avenir-demi-bold" }}
          style={[
            styles.bottomButton,
            { width: Dimensions.get("window").width * 0.8 },
          ]}
          mode="contained"
        >
          Change Password
        </Button>
        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity
            onPress={() => {
              forgotPassword(firebase.auth().currentUser.email);
            }}
          >
            <TextWrapper bold style={styles.forgotPasswordText}>
              Forgot password?
            </TextWrapper>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "5%",
    paddingTop: "10%",
    backgroundColor: Colours["background-grey"],
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: "5%",
  },
  darkText: {
    color: Colours["grey-dark"],
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  nicknameContainer: {
    marginLeft: 15,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "black",
  },
  passwordContainer: {
    marginTop: 30,
    width: "90%",
  },
  forgotPasswordContainer: {
    justifyContent: "center",
    marginTop: 15,
    alignItems: "flex-end",
  },
  forgotPasswordText: {
    fontSize: 14,
    color: Colours.primary,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  bottomButton: {
    borderRadius: 12,
    borderWidth: 0,
  },
});

export default PasswordChange;
