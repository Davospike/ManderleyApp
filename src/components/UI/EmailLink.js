import React from "react";
import { Text, Linking } from "react-native";
import Colours from "../../../config/colours.json";

export default EmailLink = () => {
  return (
    <Text
      style={{ color: Colours.primary, fontWeight: "bold" }}
      onPress={() => {
        Linking.openURL("mailto:abigail.durrant@newcastle.ac.uk");
      }}
    >
      {" "}
      abigail.durrant@newcastle.ac.uk
    </Text>
  );
};
