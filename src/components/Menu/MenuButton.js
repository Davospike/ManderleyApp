import * as React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import Colours from "../../../config/colours.json";
import TextWrapper from "../UI/Text/TextWrapper";

export default MenuButton = ({ onPress, text, Icon = null }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.menuButton}>
        <TextWrapper med style={styles.buttonText}>
          {text}
        </TextWrapper>
        {Icon !== null ? <Icon /> : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: "6%",
    paddingRight: "6%",
    borderWidth: 0.25,
    paddingVertical: 9,
    borderColor: Colours["grey-light"],
    backgroundColor: "white",
  },
  buttonText: {
    color: Colours["grey-dark"],
    fontSize: 20,
  },
});
