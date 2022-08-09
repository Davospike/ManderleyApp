import React from "react";
import Carousel from "../Auth/Onboarding/Carousel";
import { Alert, StyleSheet, View, Text, Linking } from "react-native";
import Colours from "../../../config/colours.json";
import TextWrapper from "../../components/UI/Text/TextWrapper";
import OnboardingCommonItems from '../Auth/Onboarding/OnboardingCommonItems';

export default GettingStarted = (props) => {
  return (
    <View style={styles.container}>
      <Carousel
        style="slide"
        navigation={props.navigation}
        items={OnboardingCommonItems}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Colours["background-grey"],
  },
});
