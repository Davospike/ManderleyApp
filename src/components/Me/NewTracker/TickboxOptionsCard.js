import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Colours from "../../../../config/colours.json";
import TextWrapper from "../../UI/Text/TextWrapper";
import TextInputWrapper from "../../UI/Text/TextInputWrapper";
import { Ionicons } from "@expo/vector-icons";
import Prompt from "./Prompt";

const TickboxOptionsCard = (props) => {
  const [numPrompts, setNumPrompts] = useState(
    props.edit ? props.optionData.prompts.length : 1
  );

  const radioOptions = [{ index: "1" }, { index: "2" }, { index: "3" }];

  const RadioButton = ({ option }) => {
    return (
      <View style={styles.optionContainer}>
        <TextWrapper reg style={styles.optionText}>
          {option.index}
        </TextWrapper>
        <TouchableOpacity
          disabled={props.edit}
          onPress={() => {
            props.optionData.tickboxFreq = parseInt(option.index);
            setNumPrompts(option.index);
          }}
          selected={
            props.index >= 0 && props.index === option.index ? true : false
          }
        >
          <Ionicons
            name={
              numPrompts == option.index
                ? "md-radio-button-on"
                : "md-radio-button-off"
            }
            style={{
              ...styles.radioIcon,
              color:
                numPrompts == option.index
                  ? Colours.secondary
                  : Colours.primary,
              opacity: props.edit ? 0.5 : 1,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={{
        ...styles.container,
        borderColor: Colours.secondary,
      }}
    >
      <View style={styles.titleContainer}>
        <TextWrapper med style={{ ...styles.titleStyle, opacity: 1 }}>
          Times per day?
        </TextWrapper>
        <TextWrapper
          med
          style={{
            paddingLeft: 10,
            color: Colours["grey-subtitle"],
          }}
        >
          (3 of 5)
        </TextWrapper>
      </View>
      <View style={styles.optionsContainer}>
        {radioOptions.map((option, index) => {
          return <RadioButton key={index} option={option} />;
        })}
      </View>
      <View style={styles.inputContainer}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {radioOptions.map((option, index) => {
            if (index < numPrompts) {
              return (
                <Prompt
                  edit={props.edit}
                  index={option.index}
                  key={index}
                  value={props.optionData.prompts[index]}
                  setValue={(newText) => {
                    props.optionData.prompts[index] = newText;
                  }}
                />
              );
            }
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
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 1.5,

    width: "95%",
    paddingHorizontal: 15,
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
  optionText: {
    color: Colours["grey-dark"],
  },
  optionsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
  },
  inputContainer: {
    marginVertical: 10,
    width: "100%",
  },
  titleContainer: {
    // height: "25%",
    justifyContent: "space-between",
    paddingTop: "6%",
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
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
  optionContainer: {
    alignItems: "center",
  },
  radioIcon: {
    fontSize: 38,
    lineHeight: 38,
    borderColor: "white",
  },
});

export default React.memo(TickboxOptionsCard);
