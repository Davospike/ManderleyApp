import React, { useState, useEffect } from "react";
import { View, Text, Platform } from "react-native";
import { Checkbox } from "react-native-paper";
import Colours from "../../../../config/colours.json";
import TextWrapper from "../../UI/Text/TextWrapper";

export default RepeatDays = ({ onAllChange, ...props }) => {
  const [everyDaySelected, setEveryDaySelected] = useState(props.everyDayInit);
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    setEveryDaySelected(props.allSelected);
  }, [props.allSelected]);

  const RepeatDay = ({ item, index, everyDay, everyDaySelected }) => {
    return (
      <View
        key={index}
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TextWrapper reg>{`Every ${item}`}</TextWrapper>

        {Platform.OS === "ios" ? (
          <View
            style={{
              borderRadius: 100,
              borderColor: Colours.primary,
              borderWidth: 1,
              marginLeft: "8%",
              marginVertical: 3,
            }}
          >
            <Checkbox
              color={Colours.secondary}
              status={props.selected[index] ? "checked" : "unchecked"}
              uncheckedColor={Colours.primary}
              onPress={() => {
                props.onChange(!props.selected[index], index);
              }}
            />
          </View>
        ) : (
          <Checkbox
            color={Colours.secondary}
            uncheckedColor={Colours.primary}
            status={props.selected[index] ? "checked" : "unchecked"}
            onPress={() => {
              props.onChange(!props.selected[index], index);
            }}
          />
        )}
      </View>
    );
  };
  return (
    <View>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TextWrapper reg>{`Every day`}</TextWrapper>

        {Platform.OS === "ios" ? (
          <View
            style={{
              borderRadius: 100,
              borderColor: Colours.primary,
              borderWidth: 1,
              marginLeft: "8%",
              marginVertical: 3,
            }}
          >
            <Checkbox
              color={Colours.secondary}
              uncheckedColor={Colours.primary}
              status={everyDaySelected ? "checked" : "unchecked"}
              onPress={() => {
                setEveryDaySelected(!everyDaySelected);
                onAllChange(!everyDaySelected);
              }}
            />
          </View>
        ) : (
          <Checkbox
            color={Colours.secondary}
            uncheckedColor={Colours.primary}
            status={everyDaySelected ? "checked" : "unchecked"}
            onPress={() => {
              setEveryDaySelected(!everyDaySelected);
              onAllChange(!everyDaySelected);
            }}
          />
        )}
      </View>
      {days.map((item, index) => (
        <RepeatDay item={item} index={index} key={index} />
      ))}
    </View>
  );
};
