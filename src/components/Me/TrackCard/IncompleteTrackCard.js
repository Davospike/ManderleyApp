import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colours from "../../../../config/colours.json";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default IncompleteTrackCard = (props) => {
  // const typeIcon =
  //   props.item.type === "Tickbox"
  //     ? "checkbox-marked-outline"
  //     : props.item.type === "Scale"
  //     ? "sticker-emoji"
  //     : props.item.type === "Numeric"
  //     ? "numeric-1-box-outline"
  //     : null;

  const routeCalc = () => {
    if (props.item.type === "Scale") {
      if (props.navTo === "ViewDay") {
        return "ViewScale";
      } else {
        return "Scale";
      }
    } else if (props.item.type === "Tickbox") {
      if (props.navTo === "ViewDay") {
        return "ViewTickbox";
      } else {
        return "Tickbox";
      }
    } else if (props.item.type === "Numeric") {
      if (props.navTo === "ViewDay") {
        return "ViewNumeric";
      } else {
        return "Numeric";
      }
    }
  };

  const onPress = () => {
    switch (props.item.type) {
      case "Scale":
        return props.navigation.navigate(routeCalc(), {
          title: props.item.name,
          selected: props.data.value,
          paramsArray: props.item.paramsArray,
          comment: props.data.comment,
          frequency: props.item.frequency,
          date: props.date,
          id: props.item.id,
          colour: props.item.colour,
          navTo: props.navTo,
          type: "Scale",
        });
      case "Tickbox":
        return props.navigation.navigate(routeCalc(), {
          title: props.item.name,
          data: props.data,
          frequency: props.item.frequency,
          prompts: props.item.prompts,
          tickboxFreq: props.item.tickboxFreq,
          date: props.date,
          id: props.item.id,
          colour: props.item.colour,
          navTo: props.navTo,
          type: "Tickbox",
        });
      case "Numeric":
        return props.navigation.navigate(routeCalc(), {
          title: props.item.name,
          number: props.data.value,
          units: props.item.units,
          colour: props.item.colour,
          comment: props.data.comment,
          frequency: props.item.frequency,
          date: props.date,
          id: props.item.id,
          navTo: props.navTo,
          type: "Numeric",
        });
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View style={[styles.container, props.style]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 6,
          }}
        >
          {/* <MaterialCommunityIcons
            name={typeIcon}
            size={25}
            color={Colours["grey-dark"]}
            style={{ paddingRight: 10 }}
          /> */}
          <Text numberOfLines={1} style={styles.titleStyle}>
            {props.item.name}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <MaterialCommunityIcons
            name={"chevron-right"}
            size={38}
            color={Colours.primary}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    elevation: 1,
    borderColor: Colours["grey-light"],
    borderWidth: 0.25,
    shadowOffset: {
      height: 2,
      width: -2,
    },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 0.5,
    overflow: "hidden",
    flexDirection: "row",
    paddingHorizontal: "5%",
    paddingVertical: 2,
    justifyContent: "space-between",
    alignItems: "center",
  },

  minorCard: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },
  titleStyle: {
    color: Colours["grey-dark"],
    fontFamily: "avenir-reg",
    fontSize: 18,
  },
  subtitleStyle: {
    color: "#000",
    opacity: 0.5,
    fontSize: 12,
  },
});
