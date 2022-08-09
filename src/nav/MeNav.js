import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screens
import Landing from "../screens/Me/Landing.js";
import NewTracker from "../screens/Me/NewTracker.js";
import ManageTrackers from "../screens/Me/ManageTrackers.js";
////Record
import Numeric from "../screens/Me/Record/Numeric.js";
import Diary from "../screens/Me/Record/Diary.js";
import Scale from "../screens/Me/Record/Scale.js";
import Tickbox from "../screens/Me/Record/Tickbox.js";
import { defaultOptions } from "../helpers/nav";
import CreateTracker from "../screens/Auth/Onboarding/Videos/CreateTracker";
import EditTrackerHeaderRight from "../components/Me/EditTrackerHeaderRight/EditTrackerHeaderRight";
import LandingHeaderRight from "../components/Me/LandingHeaderRight/LandingHeaderRight";

const Stack = createStackNavigator();

export default MeNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={({ navigation, route }) => {
          return {
            title: "Me",
            ...defaultOptions,
            headerTitleContainerStyle: {
              flex: 1,
              alignItems: "center",
              paddingLeft: 0,
            },
            headerRight: () => (
              <LandingHeaderRight navigation={navigation} route={route} />
            ),
          };
        }}
      />
      <Stack.Screen
        name="Diary"
        component={Diary}
        options={() => ({
          title: "Reflections",
          ...defaultOptions,
        })}
      />
      <Stack.Screen
        name="CreateTrackerVideo"
        component={CreateTracker}
        options={{
          title: "Tutorial",
          ...defaultOptions,
        }}
      />
      <Stack.Screen
        name="Numeric"
        component={Numeric}
        options={({ route, navigation }) => ({
          title: "My Tracker",
          ...defaultOptions,
          headerRight: () => (
            <EditTrackerHeaderRight
              route={route}
              navigation={navigation}
              returnPath={"Numeric"}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Scale"
        component={Scale}
        options={({ route, navigation }) => ({
          title: "My Tracker",
          ...defaultOptions,
          headerRight: () => (
            <EditTrackerHeaderRight
              route={route}
              navigation={navigation}
              returnPath={"Scale"}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Tickbox"
        component={Tickbox}
        options={({ route, navigation }) => ({
          title: "My Tracker",
          ...defaultOptions,
          headerRight: () => (
            <EditTrackerHeaderRight
              route={route}
              navigation={navigation}
              returnPath={"Tickbox"}
            />
          ),
        })}
      />
      <Stack.Screen
        name="NewTracker"
        component={NewTracker}
        options={({ route }) => ({
          title: route.params.edit === true ? "Edit Tracker" : "New Tracker",
          ...defaultOptions,
        })}
      />
      <Stack.Screen
        name="ManageTrackers"
        component={ManageTrackers}
        options={({}) => ({
          title: "My trackers",
          ...defaultOptions,
        })}
      />
    </Stack.Navigator>
  );
};
