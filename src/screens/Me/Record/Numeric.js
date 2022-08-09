import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import * as meActions from "../../../store/actions/me";
import { HeaderBackButton } from "@react-navigation/stack";
import Colours from "../../../../config/colours.json";
import RecordButton from "../../../components/Me/RecordScreenButton/RecordScreenButton.js";
import TextWrapper from "../../../components/UI/Text/TextWrapper";
import { getCurrentTimestamp } from "../../../helpers/date";
import { logEvent, events } from "../../../helpers/amplitude";
import KeyboardUIFix from "../../../components/UI/KeyboardUIFix";

/**
 * @component
 * @param  {object} props
 */
const Numeric = (props) => {
  const dispatch = useDispatch();

  //numeric value
  const [numericText, setNumericText] = useState("");
  //comment
  const [comment, setComment] = useState("");

  //update back button depending on return path
  useLayoutEffect(() => {
    const updateBackButton = () => {
      props.navigation.setOptions({
        headerLeft: () => (
          <HeaderBackButton
            onPress={() => props.navigation.navigate(props.route.params.navTo)}
          />
        ),
      });
    };

    updateBackButton();
  }, [props.navigation]);

  //initialise state
  useEffect(() => {
    const setNumericTextValue = () => {
      setNumericText(props.route.params.number);
    };

    const setCommentInit = () => {
      setComment(props.route.params.comment);
    };

    setNumericTextValue();
    setCommentInit();
  }, []);

  /**
   * Function which validates the entry
   *
   * @returns {boolean} - Whether the entry is valid
   */
  const validEntry = () => {
    const valNumber = () => {
      return !isNaN(numericText) ? true : false;
    };

    if (numericText.trim() !== "" || comment.trim() !== "") {
      if (valNumber()) {
        return true;
      } else return false;
    } else {
      return false;
    }
  };

  return (
    <ScrollView>
      <View style={{ paddingVertical: 5, alignItems: "center" }}>
        <View
          style={{
            ...styles.container,
            ...props.style,
            borderColor: props.route.params.colour
              ? props.route.params.colour
              : Colours.primary,
          }}
        >
            <View style={styles.majorCard}>
              <Text numberOfLines={1} style={styles.titleStyle}>
                {props.route.params.title}
              </Text>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                {/* number recording entry */}
                <TextInput
                  keyboardType={"decimal-pad"}
                  autoCapitalize="words"
                  style={{
                    ...styles.inputBoxStyle,
                    fontSize: 44,
                    fontFamily: "avenir-reg",
                  }}
                  value={numericText}
                  placeholder={"..."}
                  maxLength={5}
                  onChangeText={(newText) => setNumericText(newText)}
                />
                <TextWrapper
                  med
                  style={{
                    color: Colours["grey-dark"],
                    fontSize: 44,
                    lineHeight: 50,
                  }}
                >
                  {" "}
                  {props.route.params.units}
                </TextWrapper>
              </View>
              <View style={{ color: "#000000", width: "100%", height: 40 }} />

              {/* comment */}
              <TextWrapper reg>Comment</TextWrapper>
              <TextInput
                placeholder="..."
                style={{
                  ...styles.inputBoxStyle,
                  fontSize: 24,
                  fontFamily: "avenir-reg",
                }}
                multiline={true}
                value={comment}
                maxLength={512}
                onChangeText={(text) => setComment(text)}
              />
            </View>
            {/* record entry button */}
            <RecordButton
              valid={numericText === "" && comment === "" ? false : true}
              colour={
                props.route.params.colour
                  ? props.route.params.colour
                  : Colours.primary
              }
              onPress={() => {
                if (validEntry()) {
                  if (props.route.params.number || props.route.params.comment) {
                    dispatch(
                      meActions.updateTrackerData(
                        "Numeric",
                        props.route.params.id,
                        props.route.params.title,
                        { value: numericText, comment },
                        props.route.params.date,
                        getCurrentTimestamp()
                      )
                    );
                  } else {
                    dispatch(
                      meActions.createTrackerData(
                        "Numeric",
                        props.route.params.id,
                        props.route.params.title,
                        { value: numericText, comment },
                        props.route.params.date,
                        getCurrentTimestamp()
                      )
                    );
                  }
                  logEvent(events.me.me_act_record, { type: "Numeric" });
                  props.navigation.navigate(props.route.params.navTo);
                } else {
                  Alert.alert("Oops", "You must add a number value or a comment");
                }
              }}
              color={Colours.primary}
            />
        </View>
      </View>
      <KeyboardUIFix/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexWrap: "nowrap",
    elevation: 1,
    borderRadius: 10,
    borderWidth: 1.25,
    shadowOffset: {
      height: 2,
      width: -2,
    },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    overflow: "hidden",
    flexDirection: "column",
    justifyContent: "center",
    width: "90%",
  },
  majorCard: {
    flex: 1,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
  },
  titleStyle: {
    color: Colours["grey-dark"],
    paddingBottom: 12,
    fontSize: 24,
    fontFamily: "avenir-reg",
  },
  subtitleStyle: {
    color: Colours["grey-dark"],
    opacity: 0.5,
    fontSize: 14,
  },
  inputBoxStyle: {
    color: Colours["grey-dark"],
    paddingTop: 8,
    paddingBottom: 8,
    borderColor: "#D9D5DC",
    borderBottomWidth: 1,
  },
});

export default Numeric;
