import React from "react";
import TrackCard from "./../TrackCard.js";
import { Text, View } from "react-native";
import Colours from "../../../../../config/colours.json";
import Intuicon from "../../../Icon/Intuicon.js";

export default Numeric = (props) => {
  const routeCalc = () => {
    if (props.navTo === "ViewDay") {
      return "ViewNumeric";
    } else {
      return "Numeric";
    }
  };
  return (
    <TrackCard
      title={props.title}
      comment={props.data.comment}
      id={props.id}
      value={props.data.value}
      onPress={() =>
        props.navigation.navigate(routeCalc(), {
          title: props.title,
          body: props.body,
          number: props.data.value,
          units: props.paramsObject.units,
          comment: props.data.comment,
          frequency: props.frequency,
          date: props.date,
          id: props.id,
          navTo: props.navTo,
          type: "Numeric",
        })
      }
    >
      {props.data.value === "" ? (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <Intuicon
            name="track_no-entry-yet"
            size={75}
            color={Colours["grey-dark"]}
          />
        </View>
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text
            adjustsFontSizeToFit={true}
            numberOfLines={1}
            style={{
              color: Colours.primary,
              fontFamily: "avenir-reg",
              fontSize: 32,
            }}
          >
            {props.data.value}
          </Text>
          <Text
            adjustsFontSizeToFit={true}
            style={{
              color: Colours.primary,
              fontFamily: "avenir-reg",
              fontSize: 24,
            }}
          >
            {props.data.value === "" ? null : props.paramsObject.units}
          </Text>
        </View>
      )}
    </TrackCard>
  );
};
