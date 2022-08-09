import React from "react";
import { View, Text, Platform } from "react-native";
import { Checkbox } from "react-native-paper";
import Colours from "../../../../config/colours.json";

export default CheckBoxUnit = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {Platform.OS === "ios" ? (
        <View
          style={{
            borderRadius: 100,
            borderColor: Colours.primary,
            borderWidth: 1,
          }}
        >
          <Checkbox
            color={Colours.secondary}
            uncheckedColor={Colours.primary}
            status={props.selected ? "checked" : "unchecked"}
            onPress={() => {
              props.onChange(!props.selected);
            }}
          />
        </View>
      ) : (
        <Checkbox
          color={Colours.secondary}
          uncheckedColor={Colours.primary}
          status={props.selected ? "checked" : "unchecked"}
          onPress={() => {
            props.onChange(!props.selected);
          }}
        />
      )}

      <Text style={{ marginLeft: 10 }}>{props.option}</Text>
    </View>
  );
};
