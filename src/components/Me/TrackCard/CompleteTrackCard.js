import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colours from "../../../../config/colours.json";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TextWrapper from "../../UI/Text/TextWrapper";
import Intuicon from "../../../components/Icon/Intuicon";

export default CompleteTrackCard = (props) => {
  // const typeIcon =
  //   props.item.type === "Tickbox"
  //     ? "checkbox-marked-outline"
  //     : props.item.type === "Scale"
  //     ? "sticker-emoji"
  //     : props.item.type === "Numeric"
  //     ? "numeric-1-box-outline"
  //     : null;

  const comment = props.data.comment ? props.data.comment : "...";

  const value =
    props.data.value !== undefined && props.data.value !== ""
      ? props.data.value
      : "...";

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
          colour: props.item.colour,
          date: props.date,
          id: props.item.id,
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
          colour: props.item.colour,
          id: props.item.id,
          navTo: props.navTo,
          type: "Tickbox",
        });
      case "Numeric":
        return props.navigation.navigate(routeCalc(), {
          title: props.item.name,
          number: props.data.value,
          units: props.item.units,
          comment: props.data.comment,
          frequency: props.item.frequency,
          date: props.date,
          colour: props.item.colour,
          id: props.item.id,
          navTo: props.navTo,
          type: "Numeric",
        });
      default:
        return null;
    }
  };

  const TickIcon = ({ tick }) => {
    return tick === true ? (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Intuicon name="track_tick-yes" size={44} color={props.item.colour} />
      </View>
    ) : tick === false ? (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Intuicon name="track_tick-no" size={44} color={props.item.colour} />
      </View>
    ) : (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <View
          style={{
            borderRadius: 100,
            height: 5,
            width: 5,
            backgroundColor: props.item.colour,
          }}
        />
        {/* <Intuicon name="track_tick-no" size={7} color={props.item.colour} /> */}
      </View>
    );
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
            style={{ paddingRight: 15 }}
          /> */}
          <View style={{ paddingVertical: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextWrapper med numberOfLines={1} style={styles.titleStyle}>
                {props.item.name}
              </TextWrapper>
              <TextWrapper reg style={{ paddingLeft: 10, fontSize: 12 }}>
                {`·   ${props.data.timestamp}`}
              </TextWrapper>
            </View>
            <Text
              style={{ fontFamily: "avenir-reg", width: 150 }}
              numberOfLines={1}
            >
              {comment}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 4,
          }}
        >
          {props.item.type === "Numeric" ? (
            <View style={{ alignItems: "center" }}>
              <TextWrapper
                med
                style={{
                  fontSize: 20,
                  color: props.item.colour
                    ? props.item.colour
                    : Colours["grey-dark"],
                }}
              >
                {value}
              </TextWrapper>
              <TextWrapper
                style={{
                  color: props.item.colour
                    ? props.item.colour
                    : Colours["grey-dark"],
                }}
                med
              >
                {props.item.units}
              </TextWrapper>
            </View>
          ) : props.item.type === "Scale" ? (
            props.data.value !== -1 ? (
              <View style={{ alignItems: "center" }}>
                <Text style={{ fontSize: 30, color: props.item.colour }}>
                  {props.item.paramsArray[props.data.value].emoji}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <TextWrapper
                  med
                  style={{ fontSize: 20, color: props.item.colour }}
                >
                  ...
                </TextWrapper>
              </View>
            )
          ) : props.item.type === "Tickbox" ? (
            !props.data.value.some((value) => {
              return value !== null;
            }) ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <TextWrapper
                  med
                  style={{ fontSize: 20, color: props.item.colour }}
                >
                  ...
                </TextWrapper>
              </View>
            ) : (
              <View style={{ flexDirection: "row" }}>
                {props.data.value
                  ? props.data.value.map((tick, index) => {
                      return <TickIcon key={index} tick={tick} />;
                    })
                  : null}
              </View>
            )
          ) : null}
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
    fontSize: 14,
  },
});
