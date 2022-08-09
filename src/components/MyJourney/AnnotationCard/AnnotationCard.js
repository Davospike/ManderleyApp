import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";

import { convertDateDDMMYYYY } from "../../../helpers/date.js";
import { optionsObject } from "../../../../config/trends";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colours from "../../../../config/colours.json";
import { TouchableOpacity as RNGHTouchableOpacity } from "react-native-gesture-handler";
import TextWrapper from "../../UI/Text/TextWrapper.js";
import { logEvent, events } from "../../../helpers/amplitude.js";
import Intuicon from "../../Icon/Intuicon";

export default AnnotationCard = (props) => {
  const anno = props.annotation;
  const trackerTitles = props.trackerTitles;
  const showStartDate = convertDateDDMMYYYY(new Date(anno.startDate));
  const showEndDate = convertDateDDMMYYYY(new Date(anno.endDate));

  const onCardPress = () => {
    logEvent(events.myJourney.myJourney_nav_view_annotation);
    props.navigation.navigate("ViewAnnotation", {
      title: anno.title,
      annotation: anno,
      trackerTitles: props.trackerTitles,
      dataBrowser: props.dataBrowser,
      fromMessage: props.fromMessage,
      newPost: props.newPost,
    });
  };

  const TrackersText = () => {
    let trackerString = "";

    trackerTitles.map((tracker, index) => {
      trackerString += `${tracker} `;
    });

    if (trackerTitles.length > 2) {
      trackerString = `${trackerTitles[0]} + ${
        trackerTitles.length - 1
      } others`;
    }
    return <TextWrapper reg>{trackerString}</TextWrapper>;
  };

  const MainContent = () => (
    <View
      style={[styles.container, props.style, { borderTopColor: anno.colour }]}
    >
      <View style={styles.majorCard}>
        <Text numberOfLines={1} style={styles.titleStyle}>
          {anno.title}
        </Text>
        <TrackersText />

        <Text numberOfLines={1} style={styles.subtitleStyle}>
          {`${showStartDate}-${showEndDate}`}
        </Text>
        <Text numberOfLines={1} style={styles.subtitleStyle}>
          {anno.description}
        </Text>
      </View>
      <View style={styles.minorCard}>
        <Intuicon
          name={optionsObject[anno.trend].icon}
          size={70}
          color={anno.colour}
        />
        <TextWrapper reg>{optionsObject[anno.trend].text}</TextWrapper>
      </View>
    </View>
  );

  return (
    <View style={{ paddingVertical: 5 }}>
      {Platform.OS === "android" ? (
        <RNGHTouchableOpacity activeOpacity={0.5} onPress={onCardPress}>
          <MainContent />
        </RNGHTouchableOpacity>
      ) : (
        <TouchableOpacity activeOpacity={0.5} onPress={onCardPress}>
          <MainContent />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: "red",
  },
  container: {
    backgroundColor: "#FFF",
    flexWrap: "nowrap",
    elevation: 1,
    borderTopWidth: 10,
    borderRadius: 5,
    borderTopLeftRadius: 25,
    borderColor: Colours["grey-light"],
    borderWidth: 0.7,
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
  },
  majorCard: {
    flex: 1.75,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
  },
  minorCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  titleStyle: {
    color: "#000",
    paddingBottom: 12,
    fontSize: 24,
    fontFamily: "avenir-med",
  },
  subtitleStyle: {
    fontFamily: "avenir-reg",
    color: "#000",
    opacity: 0.5,
    fontSize: 14,
  },
});
