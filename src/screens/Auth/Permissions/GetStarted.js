import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";

import { Button } from "react-native-paper";

import Colours from "../../../../config/colours.json";
import Intuicon from "../../../components/Icon/Intuicon";
import TextWrapper from "../../../components/UI/Text/TextWrapper";
import { events, logEvent } from "../../../helpers/amplitude";

const GetStarted = (props) => {
  return (
    <View style={styles.getStarted}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <Image
          source={require("../../../images/manderley-logo-and-name.png")}
          // People vector created by freepik - www.freepik.com
          style={styles.mainLogo}
        />
        <View style={styles.buttonContainer}>
          <Button
            theme={{
              colors: {
                primary: Colours.primary,
                underlineColor: "transparent",
              },
            }}
            style={[
              styles.bottomButton,
              { width: Dimensions.get("window").width * 0.8 },
            ]}
            labelStyle={{ fontFamily: "avenir-demi-bold" }}
            mode="contained"
            onPress={() => props.submitHandler()}
          >
            Get started
          </Button>
        </View>
        <View style={styles.lightbulbContainer}>
          <View style={styles.lightbulbIcon}>
            <Intuicon
              name="instruction-tips"
              size={65}
              color={Colours.primary}
            />
          </View>
          <TextWrapper reg style={styles.lightbulbText}>
            You can review the Privacy Statement in{" "}
            <TextWrapper
              reg
              onPress={() => {
                logEvent(events.privacy.privacy_nav_landing);
                props.navigation.navigate("About");
              }}
              style={{ color: Colours.primary, fontWeight: "bold" }}
            >
              more detail here
            </TextWrapper>{" "}
            or in the My Settings section of the App.
          </TextWrapper>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  getStarted: {
    paddingHorizontal: 20,
    paddingTop: 40,
    height: "100%",
    width: "100%",
    flex: 1,
    maxWidth: "100%",
    backgroundColor: Colours["background-grey"],
  },
  mainLogo: {
    width: Dimensions.get("window").width * 0.89,
    height: Dimensions.get("window").width * 0.28,
    marginTop: 10,
    marginBottom: 20,
  },
  logoContainer: {
    backgroundColor: "#F6F7F7",
    width: "100%",
    height: 200,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: "#fcfcfc",
    shadowOpacity: 1,
    marginTop: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  buttonContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#FFF",
    flexWrap: "nowrap",
    elevation: 3,
    borderRadius: 10,
    borderColor: "#888",
    borderWidth: 1,
    shadowOffset: {
      height: 2,
      width: -2,
    },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "center",
    padding: "3%",
  },
  lightbulbContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingBottom: 40,
  },
  lightbulbText: {
    width: "90%",
    textAlign: "left",
    fontSize: 16,
    flex: 3,
    lineHeight: 25,
  },
  lightbulbIcon: {
    flex: 1,
  },
});

export default GetStarted;
