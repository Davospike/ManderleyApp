import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as meActions from "../../store/actions/me";
import Colours from "../../../config/colours.json";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons/";
import Intuicon from "../../components/Icon/Intuicon";
import TextWrapper from "../../components/UI/Text/TextWrapper";
import { logEvent, events } from "../../helpers/amplitude";
import { convertDateTypeCalendar } from "../../helpers/date";

/**
 * @component
 * @param  {object} props
 */
const ManageTrackers = (props) => {
  //trackers
  const trackers = useSelector(({ me }) => me.trackers);

  const dispatch = useDispatch();

  //date string
  let dateString =
    props.route.params && props.route.params.dateString
      ? new Date(props.route.params.dateString).getDay() + 6
      : new Date(convertDateTypeCalendar(new Date())).getDay() + 6;

  //render tracker UI
  const RenderTracker = (item, index, selected) => {
    return (
      <View key={index} style={styles.container}>
        <View style={{ flex: 5, justifyContent: "center" }}>
          {/* tracker name */}
          <TextWrapper
            reg
            style={{ fontSize: 18, color: Colours["grey-dark"] }}
          >
            {item.name}
          </TextWrapper>
        </View>
        <View
          style={{
            flex: 2.5,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* eye icons (which show/hide tracker) only show if the tracker's frequency means it is visible on this day */}
          {item.frequency[dateString % 7] ? (
            <TouchableOpacity
              onPress={() => {
                dispatch(
                  meActions.hideShowTracker(item.id, item.name, !selected)
                );
              }}
            >
              {selected ? (
                <MaterialCommunityIcons
                  name={"eye"}
                  size={30}
                  color={Colours.primary}
                />
              ) : (
                <MaterialCommunityIcons
                  name={"eye-off"}
                  size={30}
                  color={Colours.primary}
                />
              )}
            </TouchableOpacity>
          ) : (
            // otherwise sleep icon shown, which does nothing
            <MaterialCommunityIcons
              name={"power-sleep"}
              size={30}
              color={Colours.primary}
            />
          )}

          {/* can edit tracker if it's not the diary */}
          {item.type !== "Diary" ? (
            <TouchableOpacity
              onPress={() => {
                logEvent(events.me.me_nav_create_tracker, { edit: true });
                props.navigation.navigate("NewTracker", {
                  data: item,
                  edit: true,
                });
              }}
            >
              <Intuicon
                name="track_edit-tracker"
                size={30}
                color={Colours.primary}
              />
            </TouchableOpacity>
          ) : (
            <FontAwesome name="lock" size={24} color={Colours.primary} />
          )}
          {/* can delete tracker if it's not the diary */}
          {item.type !== "Diary" ? (
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Warning",
                  `Are you sure you want to delete ${item.name}?`,
                  [
                    {
                      text: "Cancel",
                      onPress: () => {},
                    },
                    {
                      text: "Confirm",
                      onPress: () => {
                        Alert.alert(
                          `This will also delete all the data associated with ${item.name}.`,
                          "",
                          [
                            {
                              text: "Cancel",
                              onPress: () => {},
                            },
                            {
                              text: "Confirm",
                              onPress: () => {
                                logEvent(events.me.me_act_delete_tracker);
                                dispatch(
                                  meActions.deleteTrackerAndData(
                                    item.name,
                                    item.id
                                  )
                                );
                              },
                            },
                          ]
                        );
                      },
                    },
                  ]
                );
              }}
            >
              <FontAwesome name="trash" size={29} color={Colours.primary} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          alignItems: "center",
          backgroundColor: Colours["background-grey"],
          elevation: 3,
        }}
      >
        {/* logic for rending trackers */}
        {trackers.length !== 1 ? (
          trackers
            .sort((x, y) => {
              if (x.name < y.name) {
                return -1;
              }
            })
            .filter((x) => {
              if (x.type === "Diary") {
                return false;
              } else {
                return true;
              }
            })
            .map((item, index) => {
              return RenderTracker(item, index, item.active);
            })
        ) : (
          <View style={{ width: "80%", paddingTop: 15 }}>
            <Text>
              {`You have no trackers, add one by clicking the plus button at the top of the Me section.`}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    borderColor: Colours["grey-light"],
    borderWidth: 0.25,
    shadowOffset: {
      height: 2,
      width: -2,
    },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    paddingLeft: "5%",
    paddingRight: "5%",
    flexDirection: "row",
    paddingVertical: Dimensions.get("window").height * 0.01,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ManageTrackers;
