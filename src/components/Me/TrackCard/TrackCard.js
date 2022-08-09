import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colours from "../../../../config/colours.json";

export default TrackCard = (props) => {
  const borderColor =
    (props.value === "" && !props.comment) ||
    (props.value === -1 && !props.comment) ||
    (props.value === "untouched" && !props.comment)
      ? Colours.primary
      : Colours.secondary;
  const backgroundColor =
    (props.value === "" && !props.comment) ||
    (props.value === -1 && !props.comment) ||
    (props.value === "untouched" && !props.comment)
      ? Colours["tab-grey"]
      : "white";
  return (
    <View style={{ paddingVertical: 5 }}>
      <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
        <View
          style={[
            styles.container,
            props.style,
            { borderColor: borderColor, backgroundColor: backgroundColor },
          ]}
        >
          <View style={styles.majorCard}>
            <View>
              <Text numberOfLines={1} style={styles.titleStyle}>
                {props.title}
              </Text>
              <Text
                numberOfLines={3}
                ellipsizeMode="tail"
                style={styles.subtitleStyle}
              >
                {(props.value === "" && !props.comment) ||
                (props.value === -1 && !props.comment) ||
                (props.value.length === 0 && !props.comment)
                  ? "No entry yet..."
                  : props.comment}
              </Text>
            </View>
          </View>
          <View
            style={[styles.minorCard, { backgroundColor: backgroundColor }]}
          >
            {props.children}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexWrap: "nowrap",
    elevation: 1,
    borderRadius: 15,
    borderColor: Colours["grey-light"],
    borderTopColor: Colours.primary,
    borderTopWidth: 10,
    borderWidth: 1.25,
    shadowOffset: {
      height: 2,
      width: -2,
    },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 0.5,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "center",
  },
  majorCard: {
    flex: 1.75,
    flexDirection: "row",
    paddingHorizontal: "5%",
    paddingVertical: "5%",
  },
  minorCard: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },
  titleStyle: {
    color: Colours["grey-dark"],
    paddingBottom: 12,
    fontFamily: "avenir-reg",
    fontSize: 24,
  },
  subtitleStyle: {
    color: "#000",
    opacity: 0.5,
    fontSize: 14,
  },
});
