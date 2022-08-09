import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Image,
  Dimensions,
  Linking,
} from "react-native";
import Intuicon from "../../../components/Icon/Intuicon";
import Colours from "../../../../config/colours.json";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import TextWrapper from "../../../components/UI/Text/TextWrapper";
import { logEvent, events } from "../../../helpers/amplitude";

export const Slide = (props) => {
  return (
    <View style={styles.slide}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View
          style={props.header === "logo_main" ? null : styles.titleContainer}
        >
          {!(props.header === "logo_main") ? (
            <View>
              <Text style={styles.topText}>{props.topText}</Text>
            </View>
          ) : null}
          {props.header === "logo_main" ? (
            <Image
              source={require("../../../images/manderley-logo-and-name.png")}
              style={styles.mainLogo}
              // People vector created by freepik - www.freepik.com
            />
          ) : props.header === "logo_track" ? (
            <View>
              <Intuicon name={"tab_me"} color={Colours.primary} size={70} />
            </View>
          ) : props.header === "logo_journey" ? (
            <View>
              <Intuicon
                name={"tab_journey"}
                color={Colours.primary}
                size={70}
              />
            </View>
          ) : null}
        </View>
        {props.header === "logo_main" && (
          <View>
            <TextWrapper bold style={{ ...styles.topText, marginBottom: 10 }}>
              {props.topText}
            </TextWrapper>
          </View>
        )}
        <View
          style={{
            borderWidth: 1,
            borderColor: Colours.primary,
            marginBottom: 20,
          }}
        />

        <View
          style={{
            marginBottom: 20,
          }}
        >
          <TextWrapper reg style={{ fontSize: 16 }}>
            {props.bodyText}
          </TextWrapper>
        </View>

        {!(props.header === "logo_main") ? (
          <View style={styles.bottomContainer}>
            <View>
              <TextWrapper reg style={{ fontSize: 16 }}>
                {props.bottomText}
              </TextWrapper>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <View style={styles.imageContainer}>
                <TouchableOpacity
                  onPress={() => {
                    if (props.header === "logo_track") {
                      logEvent(events.nav_tutorial, {
                        section: "gettingStarted",
                        title: "CreateTrackerVideo",
                      });
                      props.navigation.navigate("CreateTracker");
                    } else if (props.header === "logo_journey") {
                      logEvent(events.nav_tutorial, {
                        section: "gettingStarted",
                        title: "CreateAnnotation",
                      });
                      props.navigation.navigate("CreateAnnotation");
                    }
                  }}
                >
                  <AntDesign
                    name="playcircleo"
                    size={80}
                    color={Colours["grey-dark"]}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  slide: {
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
  tabLogo: {
    alignItems: "flex-end",
    marginBottom: 10,
  },
  topText: {
    width: "100%",
    textAlign: "left",
    fontSize: 18,
    fontFamily: "avenir-demi-bold",
  },
  bodyText: {
    textAlign: "left",
    // fontSize: 18,
  },
  bottomText: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 10,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  imageContainer: {
    backgroundColor: Colours["background-grey"],
    width: 150,
    height: 150,
    borderColor: Colours["grey-light"],
    borderWidth: 1,
    borderRadius: 8,
    shadowColor: "#fcfcfc",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  lightbulbContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
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
  warningContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingBottom: 40,
  },
  warningText: {
    width: "90%",
    textAlign: "left",
    fontSize: 16,
    flex: 5,
  },
  warningIcon: {
    flex: 1,
  },
  bottomContainer: {
    justifyContent: "center",
    marginTop: 10,
  },
});

export default Slide;
