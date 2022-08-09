import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";

import Colours from "../../../../config/colours.json";

import Intuicon from "../../../components/Icon/Intuicon";
import TextWrapper from "../../../components/UI/Text/TextWrapper";

const FinalScreen = (props) => {
  return (
    <View style={styles.getStarted}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextWrapper bold style={styles.topText}>
            Settings and preferences
          </TextWrapper>
          <View>
            <Intuicon name={"tab_profile"} color={Colours.primary} size={70} />
          </View>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: Colours.primary,
            marginBottom: 15,
          }}
        />

        <View>
          <TextWrapper reg style={{ fontSize: 16 }}>
            If you give consent, we would like to collect anonymous data about
            how you use the App. We will use this usage data to improve the user
            experience.
            {"\n"}
          </TextWrapper>
        </View>

        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../../images/Onboarding-04.png")}
            style={styles.mainLogo}
          />
        </View>
        <View>
          <TextWrapper reg style={{ fontSize: 16 }}>
            {"\n\n"}
            You can change whether or not you give us permission at any time in
            the My Settings section of the App.
            {"\n\n"}
          </TextWrapper>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  getStarted: {
    paddingHorizontal: 20,
    paddingTop: 50,
    height: "100%",
    width: "100%",
    flex: 1,
    maxWidth: "100%",
    backgroundColor: Colours["background-grey"],
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
  mainLogo: {
    width: Dimensions.get("window").width * 0.59,
    height: Dimensions.get("window").width * 0.48,
    marginTop: 10,
    marginBottom: 20,
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
    flex: 5,
  },
  lightbulbIcon: {
    flex: 1,
  },
  topText: {
    textAlign: "left",
    fontSize: 18,
    fontFamily: "avenir-demi-bold",
  },
  bodyText: {
    textAlign: "left",
    fontSize: 14,
  },
});

export default FinalScreen;
