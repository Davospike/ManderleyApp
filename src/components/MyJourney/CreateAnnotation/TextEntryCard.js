import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Colours from "../../../../config/colours.json";
import TextWrapper from "../../UI/Text/TextWrapper";

export default CreateAnnotationTitleCard = (props) => {
  return (
    <View
      style={{
        ...styles.container,
        ...props.heightStyle,
      }}
    >
      <View style={styles.titleContainer}>
        <TextWrapper med style={styles.titleStyle}>
          {props.title}
        </TextWrapper>
      </View>
      {props.inputPrompt ? (
        <TextWrapper reg style={styles.inputTextStyle}>
          {props.inputPrompt}
        </TextWrapper>
      ) : null}
      <TextInput
        style={styles.inputBoxStyle}
        placeholder="enter text here"
        value={props.value}
        onChangeText={props.onInputChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexWrap: "nowrap",
    elevation: 1,
    borderRadius: 10,
    borderColor: Colours.primary,
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
    paddingBottom: 30,
    paddingHorizontal: 15,
  },
  titleContainer: {
    paddingTop: "6%",
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputTextStyle: { color: Colours["grey-subtitle"] },
  titleStyle: {
    color: Colours["grey-dark"],
    paddingBottom: 2,
    fontSize: 24,
  },
  inputBoxStyle: {
    width: "100%",
    color: Colours["grey-dark"],
    alignSelf: "stretch",
    paddingTop: 8,
    paddingBottom: 8,
    borderColor: "#D9D5DC",
    borderBottomWidth: 1,
    fontSize: 16,
  },
});
