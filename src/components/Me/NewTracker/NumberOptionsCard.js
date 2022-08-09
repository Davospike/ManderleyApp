import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Colours from "../../../../config/colours.json";
import TextWrapper from "../../UI/Text/TextWrapper";
import TextInputWrapper from "../../UI/Text/TextInputWrapper";

const NumberOptionsCard = (props) => {
  const [selected, setSelected] = useState(false);
  const [complete, setComplete] = useState(props.edit ? true : false);

  const [units, setUnits] = useState(
    props.optionData.units ? props.optionData.units : null
  );

  const inputChangeHandler = (newText, input) => {
    switch (input) {
      case "units": {
        setUnits(newText);
        props.optionData.units = newText;
        break;
      }
    }
  };

  return (
    <View
      style={{
        ...styles.container,
        borderColor: complete ? Colours.secondary : Colours.primary,
      }}
    >
      <View style={styles.optionsContainer}>
        <View style={styles.inputContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <TextInputWrapper
              style={{
                flex: 5,
              }}
              onFocus={() => {
                setSelected(true);
                if (units === "") {
                  setComplete(false);
                  props.onComplete(false);
                }
              }}
              onBlur={() => {
                setSelected(false);
                if (units !== "") {
                  setComplete(true);
                  props.onComplete(true);
                } else if (units === "") {
                  setComplete(false);
                  props.onComplete(false);
                }
              }}
              theme={{
                colors: {
                  primary: complete
                    ? Colours.secondary
                    : selected
                    ? Colours.primary
                    : Colours["grey-light"],
                  underlineColor: "transparent",
                },
              }}
              label="Units"
              onChangeText={(newText) => inputChangeHandler(newText, "units")}
              placeholder="Units"
              value={units}
            />
            <TextWrapper
              med
              style={{
                paddingLeft: 10,
                color: selected
                  ? Colours["grey-subtitle"]
                  : Colours["grey-light"],
              }}
            >
              (3 of 5)
            </TextWrapper>
          </View>
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
    fontSize: 24,
  },
  optionsContainer: {
    width: "100%",
  },
  inputContainer: {
    marginVertical: 10,
    width: "100%",
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

export default React.memo(NumberOptionsCard);
