import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { events, logEvent } from "../../../helpers/amplitude";
import Intuicon from "../../Icon/Intuicon";
import Colours from "../../../../config/colours.json";

export default LandingHeaderRight = ({ navigation, route }) => (
  <View
    style={{
      marginRight: 10,
      flexDirection: "row",
    }}
  >
    <TouchableOpacity
      style={styles.headerButton}
      onPress={() => {
        logEvent(events.me.me_nav_create_tracker, { edit: false });
        navigation.navigate("NewTracker", { edit: false });
      }}
    >
      <MaterialCommunityIcons
        name="plus-circle"
        size={25}
        color={Colours["grey-dark"]}
      />
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.headerButton}
      onPress={() => {
        logEvent(events.me.me_nav_manage_trackers);
        navigation.navigate("ManageTrackers", {
          dateString:
            route.params && route.params.dateString
              ? route.params.dateString
              : null,
        });
      }}
    >
      <Intuicon
        name="track_manage-tracker"
        size={38}
        color={Colours["grey-dark"]}
      />
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.headerButton}
      onPress={() => {
        logEvent(events.nav_tutorial, {
          section: "me",
          title: "CreateTrackerVideo",
        });
        navigation.navigate("CreateTrackerVideo");
      }}
    >
      <Intuicon name="info" size={38} color={Colours["grey-dark"]} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  headerButton: {
    height: 44,
    width: 44,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
