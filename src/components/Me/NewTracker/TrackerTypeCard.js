import React, { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colours from "../../../../config/colours.json";
import TextWrapper from "../../UI/Text/TextWrapper";

const TrackerTypeCard = (props) => {
  const [selected, setSelected] = useState(props.value);

  const updateTracker = (value) => {
    if (!props.edit) {
      setSelected(value);
      props.optionData.units = null;
      props.optionData.paramsArray = [
        { emoji: null, statement: null },
        { emoji: null, statement: null },
        { emoji: null, statement: null },
        { emoji: null, statement: null },
        { emoji: null, statement: null },
      ];
      props.updateTrackerType(value);
    }
  };

  return (
    <TouchableOpacity
      disabled={!props.edit}
      style={{
        ...styles.container,
        borderColor: props.edit
          ? Colours["grey-light"]
          : selected !== ""
          ? Colours.secondary
          : Colours.primary,
        opacity: props.edit ? 0.35 : 1,
      }}
      onPress={() => {
        Alert.alert("Oops", "Cannot edit the tracker type");
      }}
    >
      <View style={styles.titleContainer}>
        <TextWrapper
          med
          style={{ ...styles.titleStyle, opacity: props.edit ? 0.5 : 1 }}
        >
          Select Tracker type
        </TextWrapper>
        <TextWrapper
          med
          style={{
            paddingLeft: 10,
            color: Colours["grey-light"],
          }}
        >
          (2 of 5)
        </TextWrapper>
      </View>
      <View style={styles.optionsContainer}>
        <View style={styles.optionContainer}>
          <TextWrapper reg style={styles.optionText}>
            Number
          </TextWrapper>
          <TouchableOpacity
            disabled={props.edit}
            onPress={() => updateTracker("Numeric")}
            selected={props.value && props.value === "Numeric" ? true : false}
          >
            <Ionicons
              name={
                selected === "Numeric"
                  ? "md-radio-button-on"
                  : "md-radio-button-off"
              }
              style={{
                ...styles.radioIcon,
                color:
                  selected === "Numeric" ? Colours.secondary : Colours.primary,
                opacity: props.edit ? 0.5 : 1,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.optionContainer}>
          <TextWrapper reg style={styles.optionText}>
            Tickbox
          </TextWrapper>
          <TouchableOpacity
            disabled={props.edit}
            onPress={() => updateTracker("Tickbox")}
            selected={props.value && props.value === "Tickbox" ? true : false}
          >
            <Ionicons
              name={
                selected === "Tickbox"
                  ? "md-radio-button-on"
                  : "md-radio-button-off"
              }
              style={{
                ...styles.radioIcon,
                color:
                  selected === "Tickbox" ? Colours.secondary : Colours.primary,
                opacity: props.edit ? 0.5 : 1,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.optionContainer}>
          <TextWrapper reg style={styles.optionText}>
            Category
          </TextWrapper>
          <TouchableOpacity
            disabled={props.edit}
            onPress={() => updateTracker("Scale")}
            selected={props.value && props.value === "Scale" ? true : false}
          >
            <Ionicons
              name={
                selected === "Scale"
                  ? "md-radio-button-on"
                  : "md-radio-button-off"
              }
              style={{
                ...styles.radioIcon,
                color:
                  selected === "Scale" ? Colours.secondary : Colours.primary,
                opacity: props.edit ? 0.5 : 1,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexWrap: "nowrap",
    elevation: 1,
    borderRadius: 10,
    borderWidth: 1.25,
    marginVertical: 15,
    shadowOffset: {
      height: 2,
      width: -2,
    },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    overflow: "hidden",
    width: "95%",
    paddingHorizontal: 15,
    flex: 1,
  },
  optionText: {
    color: Colours["grey-dark"],
  },
  titleContainer: {
    height: "25%",
    justifyContent: "space-between",
    paddingTop: "6%",
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  titleStyle: {
    color: Colours["grey-dark"],
    paddingBottom: 2,
    fontSize: 18,
  },
  optionsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
  },
  radioIcon: {
    fontSize: 38,
    lineHeight: 38,
    borderColor: "white",
  },
  optionContainer: {
    alignItems: "center",
  },
});

export default React.memo(TrackerTypeCard);
