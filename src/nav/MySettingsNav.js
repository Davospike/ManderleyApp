import * as React from "react";
import { Platform, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import PasswordChange from "../screens/MySettings/PasswordChange.js";
import AccountSettings from "../screens/MySettings/AccountSettings.js";
import GettingStarted from "../screens/MySettings/GettingStarted";
import Analytics from "../screens/MySettings/Analytics";
import { defaultOptions } from "../helpers/nav";
import AboutUs from "../screens/About/AboutUs";
import ConsentList from "../screens/About/Consent/ConsentList";
import AboutLanding from "../screens/About/Landing";
import ConsentStored from "../screens/About/Consent/ConsentStored.js";
import ConsentRights from "../screens/About/Consent/ConsentRights.js";
import ConsentApproach from "../screens/About/Consent/ConsentApproach.js";
import ConsentRightsLong from "../screens/About/Consent/ConsentRightsLong.js";
import ConsentStoredLong from "../screens/About/Consent/ConsentStoredLong.js";
import SecurityCloud from "../screens/About/Security/SecurityCloud.js";
import AmplitudeService from "../screens/About/Services/AmplitudeService";
import FirebaseService from "../screens/About/Services/FirebaseService";
import DeactivateAccount from "../screens/MySettings/DeactivateAccount";
import CreateTracker from "../screens/Auth/Onboarding/Videos/CreateTracker.js";
import CreateAnnotation from "../screens/Auth/Onboarding/Videos/CreateAnnotation.js";

const Stack = createStackNavigator();
export default MySettingsNav = () => {
  return (
    <Stack.Navigator initialRouteName="AccountSettings">
      <Stack.Screen
        name="GettingStarted"
        component={GettingStarted}
        options={() => ({
          title: "Getting Started",
          ...defaultOptions,
        })}
      />
      <Stack.Screen
        name="PasswordChange"
        component={PasswordChange}
        options={() => ({
          title: "Change Password",
          ...defaultOptions,
        })}
      />
      <Stack.Screen
        name="AccountSettings"
        component={AccountSettings}
        options={() => ({
          ...defaultOptions,
          title: "My Settings",
        })}
      />
      <Stack.Screen
        name="Analytics"
        component={Analytics}
        options={() => ({
          ...defaultOptions,
          title: "Analytics",
        })}
      />
      <Stack.Screen
        name="DeactivateAccount"
        component={DeactivateAccount}
        options={() => ({
          title: "Deactivate Account",
          ...defaultOptions,
        })}
      />
      <Stack.Screen
        name="About"
        component={AboutLanding}
        options={{
          title: "Privacy statement",
          ...defaultOptions,
        }}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          title: "About us",
          ...defaultOptions,
        }}
      />
      <Stack.Screen
        name="ConsentList"
        component={ConsentList}
        options={{
          title: "Consent & data collection",
          ...defaultOptions,
        }}
      />
      <Stack.Screen
        name="ConsentStored"
        component={ConsentStored}
        options={{
          title: "Personal data storage",
          ...defaultOptions,
        }}
      />
      <Stack.Screen
        name="ConsentStoredLong"
        component={ConsentStoredLong}
        options={{
          title: "Personal data storage",
          ...defaultOptions,
        }}
      />
      <Stack.Screen
        name="ConsentRights"
        component={ConsentRights}
        options={{
          title: "Your data rights",
          ...defaultOptions,
        }}
      />
      <Stack.Screen
        name="ConsentRightsLong"
        component={ConsentRightsLong}
        options={{
          title: "Your data rights",
          ...defaultOptions,
        }}
      />
      <Stack.Screen
        name="ConsentApproach"
        component={ConsentApproach}
        options={{
          title: "Our approach",
          ...defaultOptions,
        }}
      />

      <Stack.Screen
        name="SecurityCloud"
        component={SecurityCloud}
        options={{
          title: "Cloud services",
          ...defaultOptions,
        }}
      />
      <Stack.Screen
        name="AmplitudeService"
        component={AmplitudeService}
        options={{
          title: "Amplitude",
          ...defaultOptions,
        }}
      />
      <Stack.Screen
        name="FirebaseService"
        component={FirebaseService}
        options={{
          title: "Firebase",
          ...defaultOptions,
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
    </Stack.Navigator>
  );
};
