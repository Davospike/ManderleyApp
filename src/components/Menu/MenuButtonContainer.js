import * as React from "react";
import { View, StyleSheet } from "react-native";
import Colours from "../../../config/colours.json";

export default MenuButtonContainer = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: Colours["background-grey"],
  },
});
