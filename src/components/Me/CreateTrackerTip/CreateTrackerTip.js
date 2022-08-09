import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import Colours from "../../../../config/colours.json";

export default CreateTrackerTip = () => {
  return (
    <View style={styles.lightbulbContainer}>
      <View style={styles.lightbulbIcon}>
        <FontAwesome5 name="lightbulb" size={38} color={Colours.primary} />
      </View>
      <Text style={styles.lightbulbText}>
        Click on the "plus" icon in the header bar to create your first tracker.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  lightbulbContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  lightbulbText: {
    width: "60%",
    color: Colours["grey-dark"],
    fontFamily: "avenir-reg",
  },
  lightbulbIcon: {
    marginRight: "5%",
  },
});
