import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import * as meActions from "../../../store/actions/me";
import { HeaderBackButton } from "@react-navigation/stack";
import RecordButton from "../../../components/Me/RecordScreenButton/RecordScreenButton.js";
import Colours from "../../../../config/colours.json";
import Intuicon from "../../../components/Icon/Intuicon";
import TextWrapper from "../../../components/UI/Text/TextWrapper";
import { getCurrentTimestamp } from "../../../helpers/date";
import { logEvent, events } from "../../../helpers/amplitude";
import KeyboardUIFix from "../../../components/UI/KeyboardUIFix";

/**
 * This function will check an array contains boolean values
 * @param  {boolean[]} arr
 *
 * @returns {boolean} - Whether the array is valid
 */
const arrayValid = (arr) => {
  return arr.some((elem) => elem === true || elem === false);
};

/**
 * @component
 * @param  {object} props
 */
const TickBox = (props) => {
  const dispatch = useDispatch();

  //whether the box has been ticked
  const [tickBoxTick, setTickBoxTick] = useState([]);

  //comment
  const [comment, setComment] = useState("");

  //check if it's first time (i.e. if the array contains any truth/false values)
  const firstTime =
    arrayValid(props.route.params.data.value) === false ? true : false;

  /**
   * Function which updates the tickbox value whenever the ticks are toggled
   *
   * @param  {number} index
   * @param  {boolean} value
   *
   * @returns {void}
   */
  const updateTickValue = (index, value) => {
    const newTickBoxTick = [...tickBoxTick];
    newTickBoxTick[index] = value;
    setTickBoxTick(newTickBoxTick);
  };

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
    const setTickBoxTickInit = () => {
      setTickBoxTick(props.route.params.data.value);
    };

    const setCommentInit = () => {
      setComment(props.route.params.data.comment);
    };

    setTickBoxTickInit();
    setCommentInit();
  }, []);

  //tick entry UI
  const TickEntry = ({ prompt, index }) => {
    return (
      <View>
        <TextWrapper reg numberOfLines={1} style={styles.subtitleStyle}>
          {prompt}
        </TextWrapper>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          {tickBoxTick[index] === true ? (
            <View style={styles.iconSet}>
              <TouchableOpacity
                onPress={() => {
                  updateTickValue(index, false);
                }}
              >
                <View style={{ paddingRight: "25%" }}>
                  <Intuicon
                    name="track_tick-no"
                    size={75}
                    color={Colours.primary}
                  />
                </View>
              </TouchableOpacity>
              <Intuicon
                name="track_tick-yes"
                size={75}
                color={props.route.params.colour}
              />
            </View>
          ) : tickBoxTick[index] === false ? (
            <View style={styles.iconSet}>
              <View style={{ paddingRight: "25%" }}>
                <Intuicon
                  name="track_tick-no"
                  size={75}
                  color={props.route.params.colour}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  updateTickValue(index, true);
                }}
              >
                <Intuicon
                  name="track_tick-yes"
                  size={75}
                  color={Colours.primary}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.iconSet}>
              <TouchableOpacity
                onPress={() => {
                  updateTickValue(index, false);
                }}
              >
                <View style={{ paddingRight: "25%" }}>
                  <Intuicon
                    name="track_tick-no"
                    size={75}
                    color={Colours.primary}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  updateTickValue(index, true);
                }}
              >
                <Intuicon
                  name="track_tick-yes"
                  size={75}
                  color={Colours.primary}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
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
            {props.route.params.prompts.map((prompt, index) => {
              if (index < props.route.params.tickboxFreq) {
                return <TickEntry key={index} prompt={prompt} index={index} />;
              }
            })}
            <TextWrapper reg>Comment</TextWrapper>
            <TextInput
              placeholder="..."
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
          <RecordButton
            valid={
              arrayValid(tickBoxTick) || comment.trim() !== "" ? true : false
            }
            colour={
              props.route.params.colour
                ? props.route.params.colour
                : Colours.primary
            }
            onPress={() => {
              if (arrayValid(tickBoxTick) || comment.trim() !== "") {
                //condition for updating data
                if (!firstTime) {
                  dispatch(
                    meActions.updateTrackerData(
                      "Tickbox",
                      props.route.params.id,
                      props.route.params.title,
                      { value: tickBoxTick, comment },
                      props.route.params.date,
                      getCurrentTimestamp()
                    )
                  );
                  // condition for creating new data
                } else {
                  dispatch(
                    meActions.createTrackerData(
                      "Tickbox",
                      props.route.params.id,
                      props.route.params.title,
                      {
                        value: tickBoxTick,
                        comment,
                      },
                      props.route.params.date,
                      getCurrentTimestamp()
                    )
                  );
                }

                logEvent(events.me.me_act_record, { type: "Tickbox" });
                props.navigation.navigate(props.route.params.navTo);
              } else {
                Alert.alert("Oops", "You must press a thumb or add a comment");
              }
            }}
          />
        </View>
      </View>
      <KeyboardUIFix />
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
  iconRing: {
    borderColor: Colours.primary,
    borderWidth: 2,
    borderRadius: 100,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  iconSet: {
    flexDirection: "row",
    margin: 30,
  },
  icon: {
    color: Colours.primary,
  },
});

export default TickBox;
