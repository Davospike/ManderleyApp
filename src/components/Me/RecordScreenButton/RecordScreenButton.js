import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Colours from "../../../../config/colours.json";

export default RecordButton = (props) => {
  const valid = props.valid;

  return (
    <View
      style={{
        width: "100%",
        height: 57,
        backgroundColor: props.colour
          ? props.colour
          : valid
          ? Colours.secondary
          : Colours.tickRecordBar,
        opacity: props.valid ? 1.0 : props.opacity ? props.opacity : 0.5,
      }}
    >
      <TouchableOpacity onPress={props.onPress}>
        <Icon
          name="check-circle"
          style={{
            color: "white",
            fontSize: 54,
            alignSelf: "center",
          }}
        />
      </TouchableOpacity>
    </View>
  );
};
