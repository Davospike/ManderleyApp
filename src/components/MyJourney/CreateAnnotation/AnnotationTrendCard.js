import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ColorPalette from "../../../libraries/react-native-color-palette";
import Ionicon from "react-native-vector-icons/Ionicons";
import Colours from "../../../../config/colours.json";
import { TouchableOpacity } from "react-native-gesture-handler";
import Intuicon from "../../Icon/Intuicon";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { optionsArray } from "../../../../config/trends";
import TextWrapper from "../../UI/Text/TextWrapper";

export default AnnotationTrendCard = (props) => {
  const Option = ({ id, selected, text, icon }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.setTrend(id);
        }}
      >
        <View
          style={{
            alignItems: "center",

            opacity: selected === id ? 1.0 : 0.5,
          }}
        >
          <Intuicon
            name={icon}
            size={50}
            color={selected === id ? Colours.secondary : Colours.primary}
          />
          <TextWrapper reg>{text ? text : ""}</TextWrapper>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        ...styles.container,
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
          }}
        >
          (5 of 6)
        </TextWrapper>
      </View>
      <View>
        <TextWrapper reg>How does your data make you feel?</TextWrapper>
      </View>
      <View style={styles.optionsContainer}>
        <View style={styles.inputContainer}>
          {optionsArray.map((item) => {
            return (
              <Option
                selected={props.selected}
                key={item.id}
                id={item.id}
                icon={item.icon}
                text={item.text}
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
    borderColor: Colours.secondary,
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
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "6%",
    marginBottom: 15,
  },
  titleStyle: {
    color: Colours["grey-dark"],
    paddingBottom: 2,
    fontSize: 24,
  },
  optionsContainer: {
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
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
