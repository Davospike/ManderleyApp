import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Image,
  Dimensions,
} from "react-native";
import Intuicon from "../../../components/Icon/Intuicon";
import Colours from "../../../../config/colours.json";
import { ScrollView } from "react-native-gesture-handler";
import TextWrapper from "../../../components/UI/Text/TextWrapper";

export const Slide = (props) => {
  return (
    <View style={styles.slide}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <View style={styles.consentContainer}>
          <TextWrapper reg style={styles.topText}>
            {props.topText}
          </TextWrapper>
          <Switch
            style={styles.switch}
            value={props.consentOptions[props.index - 4]}
            onValueChange={(c) => {
              props.onUpdateConsent(props.index - 4, c);
            }}
            trackColor={{ true: Colours.secondary }}
            thumbColor={"white"}
          />
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={props.image}
            style={{
              height: Dimensions.get("window").height * 0.4,
              width: Dimensions.get("window").width * 0.8,
            }}
          />
        </View>
        <View style={styles.bottomContainer}>
          {props.lightbulbText ? (
            <View style={styles.lightbulbContainer}>
              <View style={styles.lightbulbIcon}>
                <Intuicon name="instruction-tips" size={38} />
              </View>
              <TextWrapper reg style={styles.lightbulbText}>
                {props.lightbulbText}
              </TextWrapper>
            </View>
          ) : null}

          {props.warningText ? (
            <View style={styles.warningContainer}>
              <Intuicon
                name="instruction-tips"
                size={65}
                color={Colours.primary}
              />
              <TextWrapper reg style={styles.warningText}>
                {props.warningText}
              </TextWrapper>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    paddingHorizontal: 20,
    paddingTop: 40,
    height: "100%",
    width: "100%",
    flex: 1,
    maxWidth: "100%",
    backgroundColor: Colours["background-grey"],
  },
  topText: {
    width: "100%",
    fontSize: 16,
    flex: 8,
    lineHeight: 25,
  },
  switch: {
    paddingLeft: 2,
    flex: 2,
  },
  consentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    flex: 1,
  },
  imageContainer: {
    height: Dimensions.get("window").height * 0.4,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
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
    lineHeight: 25,
  },
  lightbulbIcon: {
    flex: 1,
  },
  warningIcon: {
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
    lineHeight: 25,
  },
  bottomContainer: {
    justifyContent: "center",
  },
});

export default Slide;
