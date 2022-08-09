import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import * as meActions from "../../../store/actions/me";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { HeaderBackButton } from "@react-navigation/stack";
import RecordButton from "../../../components/Me/RecordScreenButton/RecordScreenButton.js";
import Colours from "../../../../config/colours.json";
import TextWrapper from "../../../components/UI/Text/TextWrapper";
import { getCurrentTimestamp } from "../../../helpers/date";
import { logEvent, events } from "../../../helpers/amplitude";
import KeyboardUIFix from "../../../components/UI/KeyboardUIFix";
/**
 * @component
 * @param  {object} props
 */
const Scale = (props) => {
  const dispatch = useDispatch();

  //selected index
  const [selected, setSelected] = useState(0);

  //comment
  const [comment, setComment] = useState("");

  //adjusting back button return path
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
    const setSelectedInit = () => {
      setSelected(props.route.params.selected);
    };

    const setCommentInit = () => {
      if (
        !(
          props.route.params.comment === "" &&
          props.route.params.selected === -1
        )
      ) {
        setComment(props.route.params.comment);
      }
    };

    setSelectedInit();
    setCommentInit();
  }, []);

  // ScaleView UI
  const ScaleView = () => {
    // individual scale option
    const ScaleOption = (props) => {
      const opacity = selected === props.index ? 1.0 : 0.3;
      return (
        <View style={{ alignItems: "center" }}>
          <Text style={{ ...styles.radioIcon, opacity }}>{props.emoji}</Text>
          <View>
            <TouchableOpacity
              onPress={() => {
                setSelected(props.index);
                setComment(props.statement);
              }}
            >
              <Icon
                name={
                  selected === props.index
                    ? "radiobox-marked"
                    : "radiobox-blank"
                }
                style={[
                  styles.radioButton,
                  {
                    color:
                      selected === props.index
                        ? Colours.secondary
                        : Colours.primary,
                  },
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    };

    //return an array of scale options for each category
    return props.route.params.paramsArray.map((item, index) => {
      return (
        <ScaleOption
          index={index}
          emoji={item.emoji}
          statement={item.statement}
          key={index}
        />
      );
    });
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
            <TextWrapper med numberOfLines={1} style={styles.titleStyle}>
              {props.route.params.title}
            </TextWrapper>
            <TextWrapper reg numberOfLines={1} style={styles.subtitleStyle}>
              {props.route.params.subtitle}
            </TextWrapper>

            <View
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                backgroundColor: "ababab",
                paddingHorizontal: "2%",
                paddingVertical: "3%",
              }}
            >
              <ScaleView />
            </View>
            <View
              style={{ color: "#000000", width: "100%", height: 40 }}
            ></View>

            {/* comment */}
            <TextWrapper
              reg
              numberOfLines={3}
              style={{ color: Colours["grey-dark"] }}
            >
              Comment
            </TextWrapper>
            <TextInput
              style={{
                ...styles.inputBoxStyle,
                fontSize: 24,
                fontFamily: "avenir-reg",
              }}
              multiline={true}
              maxLength={512}
              value={comment}
              onChangeText={(text) => setComment(text)}
            />
          </View>
          {/* record entry button */}
          <RecordButton
            valid={comment.trim() !== "" || selected !== -1 ? true : false}
            colour={
              props.route.params.colour
                ? props.route.params.colour
                : Colours.primary
            }
            onPress={() => {
              if (comment.trim() !== "" || selected !== -1) {
                if (props.route.params.selected !== -1) {
                  dispatch(
                    meActions.updateTrackerData(
                      "Scale",
                      props.route.params.id,
                      props.route.params.title,
                      { value: selected, comment },
                      props.route.params.date,
                      getCurrentTimestamp()
                    )
                  );
                } else {
                  dispatch(
                    meActions.createTrackerData(
                      "Scale",
                      props.route.params.id,
                      props.route.params.title,
                      { value: selected, comment },
                      props.route.params.date,
                      getCurrentTimestamp()
                    )
                  );
                }

                logEvent(events.me.me_act_record, { type: "Scale" });
                props.navigation.navigate(props.route.params.navTo);
              } else {
                Alert.alert(
                  "Oops",
                  "You must select a category or add a comment"
                );
              }
            }}
            color={Colours.primary}
          />
        </View>
        <KeyboardUIFix />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexWrap: "nowrap",
    elevation: 1,
    borderRadius: 10,
    borderColor: Colours.primary,
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
  radioButton: {
    fontSize: 38,
  },
  radioIcon: {
    fontSize: 30,
  },
});

export default Scale;
