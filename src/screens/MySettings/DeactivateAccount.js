import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as firebase from "firebase";
import React, { useState } from "react";
import {
  Alert,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";

import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { dropTable, getAllTableNames } from "../../helpers/db.js";
import { reauthenticate } from "../../helpers/firebase.js";
import Colours from "../../../config/colours.json";
import TextWrapper from "../../components/UI/Text/TextWrapper.js";
import { deleteUserHash } from "../../helpers/userHash.js";
import { deleteAmpUserId } from "../../helpers/amplitude.js";
/**
 * @component
 * @param  {object} props
 */
const DeactivateAccount = (props) => {
  //password selected
  const [passwordSelected, setPasswordSelected] = useState(false);

  //password
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  /**
   * This function will, given the correct password, deactivate the user's account
   * @returns {void}
   */
  const deactivate = async () => {
    try {
      //delete local database
      let res = await getAllTableNames();
      const nameObjs = res.rows._array;
      let nameArr = nameObjs.map((item) => {
        return item.name;
      });
      const results = nameArr.map(async (item) => {
        res = await dropTable(item);
        return res;
      });
      res = await Promise.all(results);

      dispatch({ type: "Reset" });

      //remove all other user data and sign user out
      await AsyncStorage.removeItem("consentOptions");
      await deleteUserHash();
      await deleteAmpUserId();
      await firebase
        .auth()
        .currentUser.delete()
        .then(() => {
          firebase
            .auth()
            .signOut()
            .then(function () {
              // Sign-out successful.
            })
            .catch(function (error) {
              // An error happened.
            });
        })
        .catch((err) => {
          console.log(err, err.code);
        });
    } catch (err) {
      console.log("ERROR");
      console.log(err);
    }
  };

  /**
   * This function will check the password was entered correctly, and give the user a chance to change their mind.
   * @returns {void}
   */
  const submitHandler = async () => {
    try {
      await reauthenticate(password);
      Alert.alert("Are you sure?", "This cannot be undone.", [
        { text: "Cancel", onPress: () => {} },
        { text: "I'm sure", onPress: () => deactivate() },
      ]);
    } catch (err) {
      Alert.alert(
        "Oops",
        "The password entered was incorrect. Please try again."
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 20, marginTop: 5 }}>
        <TextWrapper reg style={{ fontSize: 14 }}>
          Deactivating your account will delete all the personal data you have
          collected. This cannot be undone, and you will need to sign up again
          with your email address to access the App again.
        </TextWrapper>
        <Text>{"\n\n"}</Text>
        <TextWrapper reg style={{ fontSize: 14 }}>
          For security purposes, you must confirm your password below before
          deactivating your account.
        </TextWrapper>
      </View>
      <View
        style={{
          paddingVertical: "2%",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 15,
        }}
      >
        <MaterialCommunityIcons
          name="lock-outline"
          size={28}
          color={passwordSelected ? Colours["primary"] : Colours["grey-light"]}
        />
        <View style={{ paddingHorizontal: "8%" }}>
          {/* password */}
          <TextInputWrapper
            onFocus={() => {
              setPasswordSelected(true);
            }}
            onBlur={() => {
              setPasswordSelected(false);
            }}
            label="Password"
            secureTextEntry
            onChangeText={(newVal) => setPassword(newVal)}
            placeholder="enter your password"
            value={password}
          />
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        {/* submit button */}
        <Button
          onPress={() => {
            submitHandler();
          }}
          theme={{
            colors: {
              primary: Colours.primary,
              underlineColor: "transparent",
            },
          }}
          labelStyle={{ fontFamily: "avenir-med" }}
          style={[
            styles.bottomButton,
            { width: Dimensions.get("window").width * 0.8 },
          ]}
          mode="contained"
        >
          DEACTIVATE ACCOUNT
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: Colours["background-grey"],
    alignItems: "center",
  },
});

export default DeactivateAccount;
