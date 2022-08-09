import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Colours from "../../../../config/colours.json";
import RepeatDays from "../../Me/RepeatDays/RepeatDays";
import TextWrapper from "../../UI/Text/TextWrapper";

const TrackerFrequencyCard = (props) => {
  const [selected, setSelected] = useState(props.edit ? true : false);
  return (
    <View
      style={{
        ...styles.container,
        borderColor: selected ? Colours.secondary : Colours.primary,
      }}
    >
      <View style={styles.titleContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <TextWrapper med style={styles.titleStyle}>
            Select frequency
          </TextWrapper>
          <TextWrapper
            med
            style={{
              paddingLeft: 10,
              color: Colours["grey-light"],
            }}
          >
            (4 of 5)
          </TextWrapper>
        </View>
      </View>
      <View style={styles.optionsContainer}>
        <View style={styles.inputContainer}>
          <RepeatDays
            everyDayInit={props.frequency.reduce((res, item) => {
              return res && item;
            })}
            selected={props.frequency}
            onChange={(value, index) => {
              if (props.frequency.filter((obj) => obj).length === 1 && !value) {
                setSelected(false);
              } else {
                setSelected(true);
              }
              let newDaysSelected = [...props.frequency];
              newDaysSelected[index] = value;
              props.setFrequency(newDaysSelected);
            }}
            onAllChange={(value) => {
              setSelected(value);
              props.setFrequency([
                value,
                value,
                value,
                value,
                value,
                value,
                value,
              ]);
            }}
            allSelected={props.frequency.reduce((acc, next) => {
              return acc && next;
            })}
          />
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
    paddingBottom: 5,
    paddingHorizontal: 15,
  },
  titleContainer: {
    height: 60,
    justifyContent: "center",
    paddingTop: "6%",
    marginBottom: 15,
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
    marginBottom: 25,
    width: "100%",
  },
  inputBoxStyle: {
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

export default React.memo(TrackerFrequencyCard);
