import * as React from "react";
import { Platform, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "../screens/Auth/Landing.js";
import Onboarding from "../screens/Auth/Onboarding/Onboarding.js";
import DevOptions from "../screens/Auth/DevOptions";
import { defaultOptions } from "../helpers/nav.js";
import CreateTracker from "../screens/Auth/Onboarding/Videos/CreateTracker.js";
import CreateAnnotation from "../screens/Auth/Onboarding/Videos/CreateAnnotation.js";
import CreatePost from "../screens/Auth/Onboarding/Videos/CreatePost.js";
import ForgotPassword from "../screens/Auth/ForgotPassword.js";

const Stack = createStackNavigator();

export default AuthNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{
          headerShown: false,
          ...defaultOptions,
          headerTitleContainerStyle: {
            flex: 1,
            alignItems: "center",
            paddingLeft: 0,
          },
        }}
      />
      <Stack.Screen
        name="DevOptions"
        component={DevOptions}
        options={{
          ...defaultOptions,
          title: "Developer options",
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          ...defaultOptions,
          title: "",
        }}
      />
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{
          headerLeft: null,
          ...defaultOptions,
          title: "Getting Started",
        }}
      />
      <Stack.Screen
        name="CreateTracker"
        component={CreateTracker}
        options={({ route }) => ({
          title: `Tutorial: Create Tracker`,
          ...defaultOptions,
          headerTitleContainerStyle: {
            flex: 1,
            alignItems: "center",
            paddingLeft:
              Platform.OS === "ios" ? Dimensions.get("window").width * 0.2 : 0,
          },
        })}
      />
      <Stack.Screen
        name="CreateAnnotation"
        component={CreateAnnotation}
        options={{
          title: `Tutorial: Create Annotation`,
          ...defaultOptions,
          headerTitleContainerStyle: {
            flex: 1,
            alignItems: "center",
            paddingLeft:
              Platform.OS === "ios" ? Dimensions.get("window").width * 0.2 : 0,
          },
        }}
      />
      <Stack.Screen
        name="CreatePost"
        component={CreatePost}
        options={{
          title: `Tutorial: Create Post`,
          ...defaultOptions,
          headerTitleContainerStyle: {
            flex: 1,
            alignItems: "center",
            paddingLeft:
              Platform.OS === "ios" ? Dimensions.get("window").width * 0.2 : 0,
          },
        }}
      />
    </Stack.Navigator>
  );
};
