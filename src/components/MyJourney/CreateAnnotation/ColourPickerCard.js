import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ColorPalette from "../../../libraries/react-native-color-palette";
import Ionicon from "react-native-vector-icons/Ionicons";
import Colours from "../../../../config/colours.json";
import TextWrapper from "../../UI/Text/TextWrapper";

const ColourPickerCard = (props) => {
  let [borderColor, setBorderColor] = useState(
    props.colour ? Colours.secondary : Colours.primary
  );
  return (
    <View
      style={{
        ...styles.container,
        borderColor,
      }}
    >
      <View style={styles.titleContainer}>
        <TextWrapper
          med
          style={{ ...styles.titleStyle, opacity: props.edit ? 0.5 : 1 }}
        >
          {props.title}
        </TextWrapper>
        <TextWrapper
          med
          style={{
            paddingLeft: 10,
            color: Colours["grey-light"],
          }}
        >
          {!props.fromAnnotation ? "(5 of 5)" : "(6 of 6)"}
        </TextWrapper>
      </View>
      <View style={styles.optionsContainer}>
        <View style={styles.inputContainer}>
          <ColorPalette
            onChange={(colour) => {
              if (!props.colour) {
                setBorderColor(Colours.secondary);
              }
              props.setColour(colour);
            }}
            value={props.colour}
            colors={[
              "#49DCB1",
              "#7A89FB",
              "#F49D6E",
              "#E8B4BC",
              "#6622CC",
              "#959595",
            ]}
            title={props.subtitle}
            icon={
              <Ionicon
                name={"ios-checkmark-circle"}
                size={25}
                color={"white"}
              />
              // React-Native-Vector-Ionicons Example
            }
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
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  titleContainer: {
    justifyContent: "center",
    paddingTop: "6%",
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleStyle: {
    paddingBottom: 2,
    fontSize: 24,
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

export default React.memo(ColourPickerCard);
