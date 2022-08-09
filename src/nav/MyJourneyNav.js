import * as React from "react";
import { Text, TouchableOpacity, View, Alert, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons/";

import Landing from "../screens/MyJourney/Landing.js";
import CreateAnnotation from "../screens/MyJourney/CreateAnnotation";
import ViewAnnotation from "../screens/MyJourney/ViewAnnotation.js";
//Track
import ViewDay from "../screens/Me/Landing.js";
import ViewDiary from "../screens/Me/Record/Diary.js";
import ViewNumeric from "../screens/Me/Record/Numeric.js";
import ViewScale from "../screens/Me/Record/Scale.js";
import ViewTickbox from "../screens/Me/Record/Tickbox.js";
import NewTracker from "../screens/Me/NewTracker.js";

import { deleteAnnotation } from "../store/actions/myJourney.js";

import { useDispatch } from "react-redux";
import { datesBetweenArray } from "../helpers/date.js";

import Colours from "../../config/colours.json";
import Intuicon from "../components/Icon/Intuicon";
import { defaultOptions } from "../helpers/nav.js";

import CreateAnnotationVideo from "../screens/Auth/Onboarding/Videos/CreateAnnotation.js";
import { logEvent, events } from "../helpers/amplitude.js";

const Stack = createStackNavigator();

export default MyJourneyNav = () => {
  const dispatch = useDispatch();

  const MainNav = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Calendar"
          component={Landing}
          options={({ navigation }) => ({
            title: "My Journey",
            ...defaultOptions,
            headerTitleContainerStyle: {
              flex: 1,
              alignItems: "center",
              paddingLeft: 0,
            },
            headerRight: () => (
              <View
                style={{
                  marginRight: 10,
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  style={Styles.headerButton}
                  onPress={() => {
                    logEvent(events.myJourney.myJourney_nav_create_annotation);
                    navigation.navigate("CreateAnnotation", {
                      title: "Create Annotation",
                    });
                  }}
                >
                  <MaterialCommunityIcons
                    name="plus-circle"
                    size={25}
                    color={Colours["grey-dark"]}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={Styles.headerButton}
                  onPress={() => {
                    logEvent(events.nav_tutorial, {
                      section: "myJourney",
                      title: "CreateAnnotationVideo",
                    });

                    navigation.navigate("CreateAnnotationVideo");
                  }}
                >
                  <Intuicon
                    name="info"
                    size={38}
                    color={Colours["grey-dark"]}
                  />
                </TouchableOpacity>
              </View>
            ),
          })}
        />

        <Stack.Screen
          name="CreateAnnotation"
          component={CreateAnnotation}
          options={({ route }) => ({
            title: route.params.title,
            ...defaultOptions,
          })}
        />
        <Stack.Screen
          name="CreateAnnotationVideo"
          component={CreateAnnotationVideo}
          options={{
            title: "Tutorial",
            ...defaultOptions,
          }}
        />
        <Stack.Screen
          name="ViewAnnotation"
          component={ViewAnnotation}
          options={({ navigation, route }) => ({
            title: route.params.title,
            ...defaultOptions,
            headerRight: () => (
              <View
                style={{
                  marginRight: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 44,
                    width: 44,
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    const {
                      id,
                      title,
                      startDate,
                      endDate,
                      trackers,
                      colour,
                      description,
                      trend,
                    } = route.params.annotation;

                    logEvent(events.myJourney.myJourney_nav_create_annotation, {
                      edit: true,
                    });

                    navigation.navigate("CreateAnnotation", {
                      startDate,
                      endDate,
                      annoBetweenDates: datesBetweenArray(startDate, endDate),
                      id,
                      annoTitle: title,
                      annoDescription: description,
                      annoTrackers: trackers,
                      annoColour: colour,
                      annoTrend: trend,
                      title: "Edit Annotation",
                    });
                  }}
                >
                  <FontAwesome name="edit" size={20} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      "Warning",
                      `Are you sure you want to delete ${route.params.annotation.title}?`,
                      [
                        { text: "Cancel", onPress: () => {} },
                        {
                          text: "Confirm",
                          onPress: () => {
                            const {
                              id,
                              startDate,
                              endDate,
                            } = route.params.annotation;
                            logEvent(
                              events.myJourney.myJourney_delete_annotation
                            );
                            dispatch(
                              deleteAnnotation(
                                id,
                                startDate,
                                endDate,
                                datesBetweenArray(startDate, endDate)
                              )
                            );
                            navigation.navigate("Calendar");
                          },
                        },
                      ]
                    );
                  }}
                  style={{
                    height: 44,
                    width: 44,
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FontAwesome name="trash" size={20} />
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="ViewDay"
          component={ViewDay}
          options={({ navigation }) => ({
            title: "View day",
            ...defaultOptions,

            headerRight: () => (
              <View
                style={{
                  marginRight: 10,
                }}
              >
                <TouchableOpacity
                  style={Styles.headerButton}
                  onPress={() => {
                    logEvent(events.me.me_nav_create_tracker, { edit: false });
                    navigation.navigate("NewTracker", { edit: false });
                  }}
                >
                  <MaterialCommunityIcons
                    name="plus-circle"
                    size={25}
                    color={Colours["grey-dark"]}
                  />
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="NewTracker"
          component={NewTracker}
          options={({ route }) => ({
            title: route.params.edit === true ? "Edit Tracker" : "New Tracker",
            ...defaultOptions,
            headerRight: () => (
              <View
                style={{
                  marginRight: 10,
                }}
              >
                {route.params.edit !== true ? (
                  <TouchableOpacity
                    style={Styles.headerButton}
                    onPress={() => {
                      Alert.alert("Not implemented at the moment");
                    }}
                  >
                    <MaterialCommunityIcons
                      name="magnify"
                      size={32}
                      color={Colours["grey-dark"]}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="ViewDiary"
          component={ViewDiary}
          options={({ route }) => ({ title: "Reflections", ...defaultOptions })}
        />
        <Stack.Screen
          name="ViewNumeric"
          component={ViewNumeric}
          options={({ route, navigation }) => ({
            title: "My Tracker",
            ...defaultOptions,
            headerRight: () => (
              <View
                style={{
                  marginRight: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    logEvent(events.me.me_nav_create_tracker, {
                      edit: true,
                      from: "myJourney",
                    });
                    navigation.navigate("NewTracker", {
                      data: { ...route.params, name: route.params.title },
                      edit: true,
                      returnPath: "ViewNumeric",
                      frequencyOverwriteRetPath: "ViewDay",
                    });
                  }}
                >
                  <Intuicon
                    name="track_edit-tracker"
                    size={30}
                    color={Colours["grey-dark"]}
                  />
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="ViewScale"
          component={ViewScale}
          options={({ route, navigation }) => ({
            title: "My Tracker",
            ...defaultOptions,
            headerRight: () => (
              <View
                style={{
                  marginRight: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    logEvent(events.me.me_nav_create_tracker, {
                      edit: true,
                      from: "myJourney",
                    });
                    navigation.navigate("NewTracker", {
                      data: { ...route.params, name: route.params.title },
                      edit: true,
                      returnPath: "ViewScale",
                      frequencyOverwriteRetPath: "ViewDay",
                    });
                  }}
                >
                  <Intuicon
                    name="track_edit-tracker"
                    size={30}
                    color={Colours["grey-dark"]}
                  />
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="ViewTickbox"
          component={ViewTickbox}
          options={({ route, navigation }) => ({
            title: "My Tracker",
            ...defaultOptions,
            headerRight: () => (
              <View
                style={{
                  marginRight: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    logEvent(events.me.me_nav_create_tracker, {
                      edit: true,
                      from: "myJourney",
                    });
                    navigation.navigate("NewTracker", {
                      data: { ...route.params, name: route.params.title },
                      edit: true,
                      returnPath: "ViewTickbox",
                      frequencyOverwriteRetPath: "ViewDay",
                    });
                  }}
                >
                  <Intuicon
                    name="track_edit-tracker"
                    size={30}
                    color={Colours["grey-dark"]}
                  />
                </TouchableOpacity>
              </View>
            ),
          })}
        />
      </Stack.Navigator>
    );
  };

  return MainNav();
};

const Styles = StyleSheet.create({
  headerButton: {
    height: 44,
    width: 44,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
