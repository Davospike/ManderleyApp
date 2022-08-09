import React from "react";
import TrackCard from "./../TrackCard.js";
import { Text, View } from "react-native";
import Intuicon from "../../../Icon/Intuicon.js";
import Colours from "../../../../../config/colours.json";

export default Scale = (props) => {
  const routeCalc = () => {
    if (props.navTo === "ViewDay") {
      return "ViewScale";
    } else {
      return "Scale";
    }
  };

  return (
    <TrackCard
      title={props.title}
      id={props.id}
      comment={props.data.comment}
      value={props.data.value}
      onPress={() =>
        props.navigation.navigate(routeCalc(), {
          title: props.title,
          subtitle: props.subtitle,
          selected: props.data.value,
          paramsArray: props.paramsArray,
          comment: props.data.comment,
          frequency: props.frequency,
          date: props.date,
          id: props.id,
          navTo: props.navTo,
          type: "Scale",
        })
      }
    >
      {props.paramsArray[props.data.value] ? (
        <Text style={{ fontSize: 40 }}>
          {props.paramsArray[props.data.value].emoji}
        </Text>
      ) : (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Intuicon
            name="track_no-entry-yet"
            size={75}
            color={Colours["grey-dark"]}
          />
        </View>
      )}
    </TrackCard>
  );
};
