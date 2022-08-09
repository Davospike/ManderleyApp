import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
} from "react-native";
import Colours from "../../../../config/colours.json";
import TextWrapper from "../../../components/UI/Text/TextWrapper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import dateFormat from "dateformat";
import { Checkbox } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default DateRangeCard = (props) => {
  const optionObject = {
    0: "Previous 7 days",
    1: "Previous 30 days",
    2: "Previous 6 months",
    3: "Custom range",
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const startDate = useRef(
    props.startDate ? props.startDate : new Date().toISOString()
  );
  const endDate = useRef(
    props.endDate ? props.endDate : new Date().toISOString()
  );
  const [complete, setComplete] = useState(false);
  const [selected, setSelected] = useState(props.edit ? 3 : 0);

  useEffect(() => {
    let d1 = null;
    const d2 = new Date(
      new Date().setDate(new Date().getDate() - 1)
    ).toISOString();
    switch (selected) {
      case 0:
        d1 = new Date(
          new Date().setDate(new Date().getDate() - 7)
        ).toISOString();
        break;
      case 1:
        d1 = new Date(
          new Date().setDate(new Date().getDate() - 30)
        ).toISOString();
        break;
      case 2:
        d1 = new Date(
          new Date().setMonth(new Date().getMonth() - 6)
        ).toISOString();
        break;
      default:
        break;
    }
    if (selected !== 3) {
      startDate.current = d1;
      endDate.current = d2;
      props.startDateChange(d1);
      props.endDateChange(d2);
    }
  }, [selected]);

  const showDatePicker = (dateType) => {
    setDatePickerVisibility(dateType);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    dateSelected(date);
    hideDatePicker();
  };

  const dateSelected = (date) => {
    date = date.toISOString();
    if (isDatePickerVisible === "start") {
      startDate.current = date;
      props.startDateChange(date);
    } else {
      endDate.current = date;
      props.endDateChange(date);
    }

    if (startDate.current && endDate.current) {
      setComplete(true);
    } else if (complete === true) {
      setComplete(false);
    }
  };

  const dateView = (dateString) => {
    if (dateString === "") {
      return "...";
    } else {
      return dateFormat(dateString, "dddd, dS mmm, yyyy");
    }
  };

  const DateCheckbox = (props) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TextWrapper reg style={{ marginLeft: 10 }}>
          {props.option}
        </TextWrapper>
        {Platform.OS === "ios" ? (
          <View
            style={{
              borderRadius: 100,
              borderColor: Colours.primary,
              borderWidth: 1,
            }}
          >
            <Checkbox
              color={Colours.secondary}
              uncheckedColor={Colours.primary}
              status={props.selected === props.index ? "checked" : "unchecked"}
              onPress={() => {
                props.onChange(props.index);
              }}
            />
          </View>
        ) : (
          <Checkbox
            color={Colours.secondary}
            uncheckedColor={Colours.primary}
            status={props.selected === props.index ? "checked" : "unchecked"}
            onPress={() => {
              props.onChange(props.index);
            }}
          />
        )}
      </View>
    );
  };

  return (
    <View
      style={{
        ...styles.container,
        ...props.heightStyle,
      }}
    >
      <View style={styles.titleContainer}>
        <TextWrapper med style={styles.titleStyle}>
          Date range
        </TextWrapper>
        <TextWrapper
          med
          style={{
            paddingLeft: 10,
            color: selected ? Colours["grey-subtitle"] : Colours["grey-light"],
          }}
        >
          (3 of 6)
        </TextWrapper>
      </View>
      <View style={styles.inputContainer}>
        {Object.keys(optionObject).map((option, index) => {
          return (
            <DateCheckbox
              index={index}
              key={index}
              option={optionObject[option]}
              selected={selected}
              onChange={(value) => {
                setSelected(value);
              }}
            />
          );
        })}
      </View>
      {selected === 3 ? (
        <View style={{ marginTop: 20, marginLeft: 10 }}>
          <TouchableOpacity
            style={{ marginBottom: 10 }}
            onPress={() => {
              showDatePicker("start");
            }}
          >
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextWrapper reg>{`Starts`}</TextWrapper>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextWrapper reg>{`${dateView(
                  startDate.current
                )}`}</TextWrapper>

                <MaterialCommunityIcons
                  name="chevron-down"
                  color={Colours.primary}
                  size={30}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              showDatePicker("end");
            }}
          >
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextWrapper reg>{`Ends`}</TextWrapper>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextWrapper reg>{`${dateView(endDate.current)}`}</TextWrapper>
                <MaterialCommunityIcons
                  name="chevron-down"
                  color={Colours.primary}
                  size={30}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}

      <DateTimePickerModal
        isVisible={isDatePickerVisible !== false ? true : false}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
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
    borderColor: Colours.secondary,
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
