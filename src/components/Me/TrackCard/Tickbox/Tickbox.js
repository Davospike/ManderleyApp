import React from "react";
import TrackCard from "../TrackCard.js";
import Icon from "react-native-vector-icons/Ionicons";
import { StyleSheet, View } from "react-native";
import Colours from "../../../../../config/colours.json";
import Intuicon from "../../../Icon/Intuicon.js";

export default Tickbox = (props) => {
  const routeCalc = () => {
    if (props.navTo === "ViewDay") {
      return "ViewTickbox";
    } else {
      return "Tickbox";
    }
  };

  const RenderIcon =
    props.data.value === "untouched" || props.data.value === "touched" ? (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Intuicon
          name="track_no-entry-yet"
          size={75}
          color={Colours["grey-dark"]}
        />
      </View>
    ) : props.data.value === true ? (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Intuicon name="track_tick-yes" size={75} color={Colours.secondary} />
      </View>
    ) : (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Intuicon name="track_tick-no" size={75} color={Colours.primary} />
      </View>
    );

  return (
    <TrackCard
      title={props.title}
      id={props.id}
      comment={props.data.comment}
      value={props.data.value}
      onPress={() =>
        props.navigation.navigate(routeCalc(), {
          title: props.title,
          data: props.data,
          frequency: props.frequency,
          prompts: props.prompts,
          tickboxFreq: props.tickboxFreq,
          date: props.date,
          id: props.id,
          navTo: props.navTo,
          type: "Tickbox",
        })
      }
    >
      {RenderIcon}
    </TrackCard>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: "rgba(128,128,128,1)",
    fontSize: 103,
  },
});
