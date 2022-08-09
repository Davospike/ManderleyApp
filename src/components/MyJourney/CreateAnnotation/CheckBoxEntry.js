import React from "react";
import { View, Text, StyleSheet } from "react-native";

import CheckBoxUnit from "./CheckBoxUnit.js";
import Colours from "../../../../config/colours.json";
import TextWrapper from "../../UI/Text/TextWrapper.js";

export default CheckBoxEntryCard = (props) => {
  return (
    <View
      style={{
        ...styles.container,
        borderColor: props.selectedArray.reduce((prev, curr) => prev | curr, 0)
          ? Colours.secondary
          : Colours.primary,
      }}
    >
      <View style={styles.titleContainer}>
        <TextWrapper med style={styles.titleStyle}>
          {props.title}
        </TextWrapper>
        <TextWrapper
          med
          style={{
            paddingLeft: 10,
            color: Colours["grey-light"],
            flex: 1,
          }}
        >
          (4 of 6)
        </TextWrapper>
      </View>
      <View style={styles.optionsContainer}>
        <View style={styles.inputContainer}>
          {props.optionArray.map((option, index) => {
            return (
              <CheckBoxUnit
                key={index}
                option={option}
                selected={props.selectedArray[index]}
                onChange={(value) => {
                  let newSelected = [...props.selectedArray];
                  newSelected[index] = value;
                  props.onInputChange(newSelected);
                }}
              />
            );
          })}
        </View>
      </View>
    </View>
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
    minHeight: 85,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    overflow: "hidden",
    width: "95%",
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  titleContainer: {
    paddingTop: "6%",
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  titleStyle: {
    color: Colours["grey-dark"],
    paddingBottom: 2,
    lineHeight: 30,
    fontSize: 24,
    flex: 5,
  },
  optionsContainer: {
    width: "100%",
  },
  inputContainer: {
    width: "100%",
  },
  inputBoxStyle: {
    // flex: 1,
    width: "100%",
    color: "#000",
    alignSelf: "stretch",
    paddingTop: 8,
    paddingBottom: 8,
    borderColor: "#D9D5DC",
    borderBottomWidth: 1,
    fontSize: 16,
    lineHeight: 16,
  },
});
