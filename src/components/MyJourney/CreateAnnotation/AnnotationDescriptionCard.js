import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Colours from "../../../../config/colours.json";
import TextWrapper from "../../UI/Text/TextWrapper";
import TextInputWrapper from "../../UI/Text/TextInputWrapper";

const TEXT_WIDTH = Dimensions.get("window").width * 0.65;

const TrackerTitleCard = (props) => {
  const [selected, setSelected] = useState(false);
  return (
    <View
      style={{
        ...styles.container,
        borderColor: Colours.secondary,
      }}
    >
      <View style={styles.inputContainer}>
        <TextInputWrapper
          style={{
            width: TEXT_WIDTH,
            flex: 5,
          }}
          onFocus={() => {
            setSelected(true);
          }}
          onBlur={() => {
            setSelected(false);
          }}
          theme={{
            colors: {
              primary: Colours.secondary,
              underlineColor: "transparent",
            },
          }}
          label="Description (optional)"
          onChangeText={props.onInputChange}
          placeholder="Description (optional)"
          value={props.value}
        />
        <TextWrapper
          med
          style={{
            paddingLeft: 10,
            color: selected ? Colours["grey-subtitle"] : Colours["grey-light"],
          }}
        >
          (2 of 6)
        </TextWrapper>
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
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    overflow: "hidden",
    width: "95%",
    paddingHorizontal: 15,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleStyle: {
    color: Colours["grey-dark"],
    paddingBottom: 2,
    fontSize: 18,
  },
  optionsContainer: {
    width: "100%",
  },
  inputContainer: {
    marginVertical: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
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

export default TrackerTitleCard;
