import React from "react";
import { StyleSheet, View, Text } from "react-native";
import dateFormat from "dateformat";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colours from "../../../../config/colours.json";
import Intuicon from "../../Icon/Intuicon";
import TextWrapper from "../../UI/Text/TextWrapper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { convertDateTypeCalendar } from "../../../helpers/date";
import { logEvent, events } from "../../../helpers/amplitude";

export default DateBox = (props) => {
  let dateString = dateFormat(props.date, "dddd, dS mmm, yyyy");
  const [firstPart, secondPart] = (
    dateString.substring(0, dateString.length - 4) +
    "~" +
    dateString.substring(dateString.length - 4)
  ).split("~");

  const navRoute =
    props.route.params && props.route.params.navFrom
      ? props.route.params.navFrom
      : "Landing";

  const navOptions = {
    navFrom:
      props.route.params && props.route.params.navFrom
        ? props.route.params.navFrom
        : "Landing",
    dataBrowser:
      props.route.params && props.route.params.dataBrowser ? true : false,
    fromMessage:
      props.route.params && props.route.params.fromMessage ? true : false,
  };

  arrowPressLeft = () => {
    logEvent(events.me.me_act_previous_day);
    props.navigation.navigate(navRoute, {
      ...navOptions,
      dateString: convertDateTypeCalendar(
        new Date(Date.parse(props.date) - 86400000)
      ),
    });
  };
  // logic for navigating to next day (forwards)
  arrowPressRight = () => {
    logEvent(events.me.me_act_next_day);
    props.navigation.navigate(navRoute, {
      ...navOptions,
      dateString: convertDateTypeCalendar(
        new Date(Date.parse(props.date) + 86400000)
      ),
    });
  };
  // logic for returning to current date
  returnHome = () => {
    logEvent(events.me.me_act_current_day);
    props.navigation.navigate(navRoute, {
      ...navOptions,
      dateString: convertDateTypeCalendar(new Date()),
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1.5,
        }}
      >
        <View>
          <TouchableOpacity onPress={arrowPressLeft}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={28}
              color={Colours.primary}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            disabled={props.date === convertDateTypeCalendar(new Date())}
            onPress={returnHome}
          >
            <Intuicon
              name="track_calendar"
              size={40}
              color={
                props.date === convertDateTypeCalendar(new Date())
                  ? Colours["grey-dark"]
                  : Colours.primary
              }
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ alignItems: "center", flex: 4 }}>
        <TextWrapper med style={{ ...styles.text, lineHeight: 23 }}>
          {firstPart + secondPart}
        </TextWrapper>
      </View>
      <View
        style={{
          alignItems: "flex-end",
          justifyContent: "flex-end",
          flex: 1,
        }}
      >
        <TouchableOpacity onPress={arrowPressRight}>
          <MaterialCommunityIcons
            name="chevron-right"
            size={28}
            color={Colours.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 5,
    elevation: 5,
    borderBottomColor: Colours["grey-light"],
    borderBottomWidth: 0.25,
  },
  text: {
    fontSize: 14,
    color: Colours["grey-dark"],
  },
});
