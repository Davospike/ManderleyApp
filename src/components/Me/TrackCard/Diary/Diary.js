import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Colours from "../../../../../config/colours.json";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Intuicon from "../../../Icon/Intuicon";
import TextWrapper from "../../../UI/Text/TextWrapper";

export default Diary = (props) => {
  const borderColor = Colours["grey-light"];
  // props.data.value === "" && props.data.image === "" ? Colours.primary : Colours.secondary;
  const backgroundColor = "white";
  // props.data.value === "" && props.data.image === ""
  //   ? Colours["tab-grey"]
  //   : "white";

  const routeCalc = () => {
    if (props.navTo === "ViewDay") {
      return "ViewDiary";
    } else {
      return "Diary";
    }
  };
  return (
    <TrackCard
      title="Reflections"
      borderColor={borderColor}
      backgroundColor={backgroundColor}
      id={props.id}
      comment={props.data.value}
      onPress={() =>
        props.navigation.navigate(routeCalc(), {
          title: "Reflections",
          body: props.data.value,
          image: props.data.image,
          date: props.date,
          id: props.id,
          navTo: props.navTo,
        })
      }
    >
      {props.data.image !== "" ? (
        <Image
          style={{ width: 111, height: 111 }}
          source={{
            uri: props.data.image,
          }}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: 111,
          }}
        >
          <MaterialCommunityIcons
            name={"thought-bubble-outline"}
            size={50}
            color={Colours["grey-dark"]}
          />
        </View>
      )}
    </TrackCard>
  );
};

const TrackCard = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
      <View
        style={[
          styles.container,
          {
            borderColor: props.borderColor,
            backgroundColor: props.backgroundColor,
          },
        ]}
      >
        <View style={styles.majorCard}>
          <View style={{ flexDirection: "column", paddingLeft: 0 }}>
            <Text numberOfLines={1} style={styles.titleStyle}>
              {props.title}
            </Text>

            <Text
              numberOfLines={3}
              ellipsizeMode="tail"
              style={styles.subtitleStyle}
            >
              {props.comment ? props.comment : "Write down your thoughts..."}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.minorCard,
            {
              backgroundColor: props.backgroundColor,
            },
          ]}
        >
          {props.children}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: Colours["grey-dark"],
  },
  container: {
    marginVertical: 5,
    backgroundColor: "#FFF",
    elevation: 1,
    borderRadius: 5,
    borderTopLeftRadius: 25,
    borderColor: Colours["grey-light"],
    borderWidth: 0.7,
    shadowOffset: {
      height: 2,
      width: -2,
    },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
  },
  majorCard: {
    flex: 1.75,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
  },
  minorCard: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF",
    justifyContent: "center",
  },
  titleStyle: {
    color: Colours["grey-dark"],
    paddingBottom: 12,
    fontFamily: "avenir-reg",
    fontSize: 18,
  },
  subtitleStyle: {
    color: "#000",
    opacity: 0.5,
    fontSize: 12,
  },
});
