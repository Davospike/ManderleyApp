import React from "react";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons/";
import * as firebase from "firebase";
import { StyleSheet, TouchableOpacity, View, Dimensions } from "react-native";
import { useDispatch } from "react-redux";
import Colours from "../../../config/colours.json";
import TextWrapper from "../../components/UI/Text/TextWrapper.js";
import { logEvent, events } from "../../helpers/amplitude";
import Intuicon from "../../components/Icon/Intuicon";

/**
 * @component
 * @param  {object} props
 */
const AccountSettings = (props) => {
  const dispatch = useDispatch();

  //nickname
  const nickname = "";

  return (
    <View style={styles.container}>
      <View style={styles.bottomIcons}>
        <TouchableOpacity
          onPress={() => {
            logEvent(events.mySettings.mySettings_nav_getting_started);
            props.navigation.navigate("GettingStarted");
          }}
        >
          {/* Getting Started */}
          <View style={styles.cardStyle}>
            <TextWrapper med style={styles.text}>
              Getting Started
            </TextWrapper>
            <View style={styles.icon}>
              <Intuicon
                name="GUI-Icon-development-getting-started-65"
                size={38}
                color={Colours.primary}
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            logEvent(events.privacy.privacy_nav_landing);
            props.navigation.navigate("About");
          }}
        >
          {/* Priavcy statement */}
          <View style={styles.cardStyle}>
            <TextWrapper med style={styles.text}>
              Privacy Statement
            </TextWrapper>
            <View style={styles.icon}>
              <Intuicon
                name="profile_privacy"
                size={40}
                color={Colours.primary}
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            logEvent(events.mySettings.mySettings_nav_analytics);
            props.navigation.navigate("Analytics");
          }}
        >
          {/* Analytics */}
          <View style={styles.cardStyle}>
            <TextWrapper med style={styles.text}>
              Usage Data
            </TextWrapper>
            <View style={styles.icon}>
              <Intuicon
                name="community_explore"
                size={40}
                color={Colours.primary}
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            logEvent(events.mySettings.mySettings_nav_change_password);
            props.navigation.navigate("PasswordChange", {
              nickname,
            });
          }}
        >
          {/* change password */}
          <View style={styles.cardStyle}>
            <TextWrapper med style={styles.text}>
              Change Password
            </TextWrapper>
            <View style={styles.icon}>
              <Intuicon
                name="profile_password"
                size={40}
                color={Colours.primary}
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            logEvent(events.mySettings.mySettings_act_log_out);
            dispatch({ type: "Reset" });
            firebase
              .auth()
              .signOut()
              .then(function () {
                // Sign-out successful.
              })
              .catch(function (error) {
                // An error happened.
              });
          }}
        >
          {/* log out */}
          <View style={styles.cardStyle}>
            <TextWrapper med style={styles.text}>
              Log Out
            </TextWrapper>
            <View style={styles.icon}>
              <Intuicon name="me_logout" size={40} color={Colours.primary} />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            logEvent(events.mySettings.mySettings_nav_deactivate_account);
            props.navigation.navigate("DeactivateAccount");
          }}
        >
          {/* deactivate account */}
          <View style={styles.cardStyle}>
            <TextWrapper med style={styles.text}>
              Deactivate Account
            </TextWrapper>
            <View style={styles.icon}>
              <Intuicon
                name="profile_deactivate"
                size={40}
                color={Colours.primary}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours["background-grey"],
    alignItems: "center",
  },
  icon: { flex: 1.4 },
  bottomIcons: {
    width: "100%",
  },
  text: {
    fontSize: 18,
    color: Colours["grey-dark"],
    flex: 10,
  },
  cardStyle: {
    elevation: 5,
    borderColor: Colours["grey-light"],
    borderWidth: 0.25,
    shadowOffset: {
      height: 2,
      width: -2,
    },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    paddingLeft: "5%",
    paddingRight: "5%",
    flexDirection: "row",
    paddingVertical: Dimensions.get("window").height * 0.01,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default AccountSettings;
