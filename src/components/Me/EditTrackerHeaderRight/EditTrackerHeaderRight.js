import React from "react";
import { View, TouchableOpacity } from "react-native";
import { logEvent, events } from "../../../helpers/amplitude";
import Intuicon from "../../Icon/Intuicon";
import Colours from "../../../../config/colours.json";

export default EditTrackerHeaderRight = ({ route, navigation, returnPath }) => {
  return (
    <View
      style={{
        marginRight: 10,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          logEvent(events.me.me_nav_create_tracker, {
            edit: true,
            from: "me",
          });
          navigation.navigate("NewTracker", {
            data: { ...route.params, name: route.params.title },
            edit: true,
            returnPath: returnPath,
            frequencyOverwriteRetPath: "Landing",
          });
        }}
      >
        <Intuicon
          name="track_edit-tracker"
          size={30}
          color={Colours["grey-dark"]}
        />
      </TouchableOpacity>
    </View>
  );
};
