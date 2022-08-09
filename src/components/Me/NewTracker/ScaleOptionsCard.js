import React, { useState, useEffect, useRef } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colours from "../../../../config/colours.json";

import EmojiBoard from "../../../libraries/react-native-emoji-board";
import TextWrapper from "../../UI/Text/TextWrapper";

const ScaleOptionsCard = React.forwardRef((props, ref) => {
  const [selected, setSelected] = useState(false);
  const [complete, setComplete] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [editing, setEditing] = useState(true);
  const [option1Emoji, setOption1Emoji] = useState(
    props.optionData.paramsArray[0] && props.optionData.paramsArray[0].emoji
      ? props.optionData.paramsArray[0].emoji
      : ""
  );
  const [option2Emoji, setOption2Emoji] = useState(
    props.optionData.paramsArray[1] && props.optionData.paramsArray[1].emoji
      ? props.optionData.paramsArray[1].emoji
      : ""
  );
  const [option3Emoji, setOption3Emoji] = useState(
    props.optionData.paramsArray[2] && props.optionData.paramsArray[2].emoji
      ? props.optionData.paramsArray[2].emoji
      : ""
  );
  const [option4Emoji, setOption4Emoji] = useState(
    props.optionData.paramsArray[3] && props.optionData.paramsArray[3].emoji
      ? props.optionData.paramsArray[3].emoji
      : ""
  );
  const [option5Emoji, setOption5Emoji] = useState(
    props.optionData.paramsArray[4] && props.optionData.paramsArray[4].emoji
      ? props.optionData.paramsArray[4].emoji
      : ""
  );

  const [option1Statement, setOption1Statement] = useState(
    props.optionData.paramsArray[0] && props.optionData.paramsArray[0].statement
      ? props.optionData.paramsArray[0].statement
      : ""
  );
  const [option2Statement, setOption2Statement] = useState(
    props.optionData.paramsArray[1] && props.optionData.paramsArray[1].statement
      ? props.optionData.paramsArray[1].statement
      : ""
  );
  const [option3Statement, setOption3Statement] = useState(
    props.optionData.paramsArray[2] && props.optionData.paramsArray[2].statement
      ? props.optionData.paramsArray[2].statement
      : ""
  );
  const [option4Statement, setOption4Statement] = useState(
    props.optionData.paramsArray[3] && props.optionData.paramsArray[3].statement
      ? props.optionData.paramsArray[3].statement
      : ""
  );
  const [option5Statement, setOption5Statement] = useState(
    props.optionData.paramsArray[4] && props.optionData.paramsArray[4].statement
      ? props.optionData.paramsArray[4].statement
      : ""
  );

  useEffect(() => {
    let completeCount = 0;
    let incompleteCount = 0;
    if (option1Emoji && option1Statement) {
      completeCount += 1;
    }
    if (
      !(
        (option1Emoji && option1Statement) ||
        (!option1Emoji && !option1Statement)
      )
    ) {
      incompleteCount += 1;
    }
    if (option2Emoji && option2Statement) {
      completeCount += 1;
    }
    if (
      !(
        (option2Emoji && option2Statement) ||
        (!option2Emoji && !option2Statement)
      )
    ) {
      incompleteCount += 1;
    }
    if (option3Emoji && option3Statement) {
      completeCount += 1;
    }
    if (
      !(
        (option3Emoji && option3Statement) ||
        (!option3Emoji && !option3Statement)
      )
    ) {
      incompleteCount += 1;
    }
    if (option4Emoji && option4Statement) {
      completeCount += 1;
    }
    if (
      !(
        (option4Emoji && option4Statement) ||
        (!option4Emoji && !option4Statement)
      )
    ) {
      incompleteCount += 1;
    }
    if (option5Emoji && option5Statement) {
      completeCount += 1;
    }
    if (
      !(
        (option5Emoji && option5Statement) ||
        (!option5Emoji && !option5Statement)
      )
    ) {
      incompleteCount += 1;
    }
    if (!complete && completeCount >= 2 && incompleteCount === 0) {
      setComplete(true);
      props.onComplete(true);
    } else if (complete && (completeCount < 2 || incompleteCount)) {
      setComplete(false);
      props.onComplete(false);
    }
  }, [
    option1Emoji,
    option1Statement,
    option2Statement,
    option2Emoji,
    option3Emoji,
    option3Statement,
    option4Emoji,
    option4Statement,
    option5Emoji,
    option5Statement,
  ]);

  useEffect(() => {
    if (
      props.optionData.paramsArray[0] &&
      props.optionData.paramsArray[0].emoji
    ) {
      setEditing(true);
    } else {
      setEditing(false);
    }
  }, []);

  const updateIcon = (emoji) => {
    selected ? setSelected(true) : null;
    switch (currentPosition) {
      case 1:
        setOption1Emoji(emoji);
        props.optionData.paramsArray[0].emoji = emoji;
        break;
      case 2:
        setOption2Emoji(emoji);
        props.optionData.paramsArray[1].emoji = emoji;
        break;
      case 3:
        setOption3Emoji(emoji);
        props.optionData.paramsArray[2].emoji = emoji;
        break;
      case 4:
        setOption4Emoji(emoji);
        props.optionData.paramsArray[3].emoji = emoji;
        break;
      case 5:
        setOption5Emoji(emoji);
        props.optionData.paramsArray[4].emoji = emoji;
        break;
    }
  };
  return (
    <View
      style={{
        ...styles.container,
        borderColor: complete ? Colours.secondary : Colours.primary,
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
            Categories
          </TextWrapper>
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

      {editing ? null : (
        <EmojiBoard
          ref={ref}
          containerStyle={{
            width: "100%",
            // height: "100%",
            alignItems: "center",
            // justifyContent: "flex-start",
            position: "absolute",
          }}
          showBoard={isVisible}
          onClick={(emojiObj) => {
            updateIcon(emojiObj.code);
            setIsVisible(false);
          }}
          onRemove={() => {
            setIsVisible(false);
            updateIcon(null);
          }}
        />
      )}

      <View style={styles.optionsContainer}>
        <TextWrapper reg style={styles.inputTextStyle}>
          Create between two and five categories
        </TextWrapper>

        {/* 1 */}
        {(editing && props.optionData.paramsArray[0]) || !editing ? (
          <View style={styles.option}>
            <View style={styles.iconContainer}>
              <TextWrapper
                reg
                style={{
                  opacity: props.edit ? 0.5 : 1.0,
                }}
              >
                Category 1 icon
              </TextWrapper>
              <TouchableOpacity
                onPress={() => {
                  if (props.edit) {
                    Alert.alert("Oops", "Cannot edit the category icon");
                  } else {
                    setCurrentPosition(1);
                    if (!isVisible) {
                      props.scrollTime();
                    }
                    setIsVisible(!isVisible);
                  }
                }}
                disabled={props.edit ? true : false}
              >
                <View style={{ paddingLeft: 10 }}>
                  {option1Emoji ? (
                    <Text
                      style={{
                        opacity: props.edit ? 0.5 : 1.0,
                      }}
                    >
                      {option1Emoji}
                    </Text>
                  ) : (
                    <MaterialCommunityIcons
                      name="plus-circle"
                      color={Colours.primary}
                      size={20}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputBoxStyle}
                placeholder="Write label..."
                value={option1Statement}
                onChangeText={(newText) => {
                  setOption1Statement(newText);
                  props.optionData.paramsArray[0].statement = newText;
                }}
              />
            </View>
          </View>
        ) : null}

        {/* 2 */}
        {(editing && props.optionData.paramsArray[1]) || !editing ? (
          <View style={styles.option}>
            <View style={styles.iconContainer}>
              <TextWrapper
                reg
                style={{
                  opacity: props.edit ? 0.5 : 1.0,
                }}
              >
                Category 2 icon
              </TextWrapper>
              <TouchableOpacity
                onPress={() => {
                  if (props.edit) {
                    Alert.alert("Oops", "Cannot edit the category icon");
                  } else {
                    setCurrentPosition(2);
                    if (!isVisible) {
                      props.scrollTime();
                    }
                    setIsVisible(!isVisible);
                  }
                }}
                disabled={props.edit ? true : false}
              >
                <View style={{ paddingLeft: 10 }}>
                  {option2Emoji ? (
                    <Text
                      style={{
                        opacity: props.edit ? 0.5 : 1.0,
                      }}
                    >
                      {option2Emoji}
                    </Text>
                  ) : (
                    <MaterialCommunityIcons
                      name="plus-circle"
                      color={Colours.primary}
                      size={20}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputBoxStyle}
                placeholder="Write label..."
                value={option2Statement}
                onChangeText={(newText) => {
                  setOption2Statement(newText);
                  props.optionData.paramsArray[1].statement = newText;
                }}
              />
            </View>
          </View>
        ) : null}

        {/* 3 */}
        {(editing && props.optionData.paramsArray[2]) || !editing ? (
          <View style={styles.option}>
            <View style={styles.iconContainer}>
              <TextWrapper
                reg
                style={{
                  opacity: props.edit ? 0.5 : 1.0,
                }}
              >
                Category 3 icon
              </TextWrapper>
              <TouchableOpacity
                onPress={() => {
                  if (props.edit) {
                    Alert.alert("Oops", "Cannot edit the category icon");
                  } else {
                    setCurrentPosition(3);
                    if (!isVisible) {
                      props.scrollTime();
                    }
                    setIsVisible(!isVisible);
                  }
                }}
                disabled={props.edit ? true : false}
              >
                <View style={{ paddingLeft: 10 }}>
                  {option3Emoji ? (
                    <Text
                      style={{
                        opacity: props.edit ? 0.5 : 1.0,
                      }}
                    >
                      {option3Emoji}
                    </Text>
                  ) : (
                    <MaterialCommunityIcons
                      name="plus-circle"
                      color={Colours.primary}
                      size={20}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputBoxStyle}
                placeholder="Write label..."
                value={option3Statement}
                onChangeText={(newText) => {
                  setOption3Statement(newText);
                  props.optionData.paramsArray[2].statement = newText;
                }}
              />
            </View>
          </View>
        ) : null}

        {/* 4 */}
        {(editing && props.optionData.paramsArray[3]) || !editing ? (
          <View style={styles.option}>
            <View style={styles.iconContainer}>
              <TextWrapper
                reg
                style={{
                  opacity: props.edit ? 0.5 : 1.0,
                }}
              >
                Category 4 icon
              </TextWrapper>
              <TouchableOpacity
                onPress={() => {
                  if (props.edit) {
                    Alert.alert("Oops", "Cannot edit the category icon");
                  } else {
                    setCurrentPosition(4);
                    if (!isVisible) {
                      props.scrollTime();
                    }
                    setIsVisible(!isVisible);
                  }
                }}
                disabled={props.edit ? true : false}
              >
                <View style={{ paddingLeft: 10 }}>
                  {option4Emoji ? (
                    <Text
                      style={{
                        opacity: props.edit ? 0.5 : 1.0,
                      }}
                    >
                      {option4Emoji}
                    </Text>
                  ) : (
                    <MaterialCommunityIcons
                      name="plus-circle"
                      color={Colours.primary}
                      size={20}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputBoxStyle}
                placeholder="Write label..."
                value={option4Statement}
                onChangeText={(newText) => {
                  setOption4Statement(newText);
                  props.optionData.paramsArray[3].statement = newText;
                }}
              />
            </View>
          </View>
        ) : null}

        {/* 5 */}
        {(editing && props.optionData.paramsArray[4]) || !editing ? (
          <View style={styles.option}>
            <View style={styles.iconContainer}>
              <TextWrapper
                reg
                style={{
                  opacity: props.edit ? 0.5 : 1.0,
                }}
              >
                Category 5 icon
              </TextWrapper>
              <TouchableOpacity
                onPress={() => {
                  if (props.edit) {
                    Alert.alert("Oops", "Cannot edit the category icon");
                  } else {
                    setCurrentPosition(5);
                    if (!isVisible) {
                      props.scrollTime();
                    }
                    setIsVisible(!isVisible);
                  }
                }}
                disabled={props.edit ? true : false}
              >
                <View style={{ paddingLeft: 10 }}>
                  {option5Emoji ? (
                    <Text
                      style={{
                        opacity: props.edit ? 0.5 : 1.0,
                      }}
                    >
                      {option5Emoji}
                    </Text>
                  ) : (
                    <MaterialCommunityIcons
                      name="plus-circle"
                      color={Colours.primary}
                      size={20}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputBoxStyle}
                placeholder="Write label..."
                value={option5Statement}
                onChangeText={(newText) => {
                  setOption5Statement(newText);
                  props.optionData.paramsArray[4].statement = newText;
                }}
              />
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
});

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
    paddingBottom: 15,
  },
  titleContainer: {
    height: 60,
    justifyContent: "center",
    paddingTop: "6%",
    paddingHorizontal: 15,
  },
  titleStyle: {
    color: Colours["grey-dark"],
    paddingBottom: 2,
    fontSize: 18,
  },
  inputBoxStyle: { fontFamily: "avenir-reg" },
  inputTextStyle: {
    color: Colours["grey-subtitle"],
    paddingHorizontal: 15,
  },
  optionsContainer: {
    width: "100%",
  },
  option: {
    paddingHorizontal: 15,
    marginVertical: 15,
  },
  iconContainer: {
    flexDirection: "row",
  },
});

export default React.memo(ScaleOptionsCard);
