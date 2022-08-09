import * as React from "react";
import { View } from "react-native";

//Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createStackNavigator } from "@react-navigation/stack";

//Material UI
import Intuicon from "../components/Icon/Intuicon.js";
import * as firebase from "firebase";
import Colours from "../../config/colours.json";

//Track, MyJourney, Community and Me navigators
import MeNav from "./MeNav.js";
import MyJourneyNav from "./MyJourneyNav";
import MySettingsNav from "./MySettingsNav";
import AuthNav from "./AuthNav";

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

import * as authActions from "../store/actions/auth";

import { useSelector, useDispatch } from "react-redux";
import { defaultOptions } from "../helpers/nav.js";

const Tab = createBottomTabNavigator();

const MainNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="Me"
      labeled={false}
      tabBarOptions={{
        showLabel: false,
        keyboardHidesTabBar: true,
        activeTintColor: Colours.primary,
        inactiveTintColor: Colours["grey-dark"],
        inactiveBackgroundColor: Colours["tab-grey"],
        activeBackgroundColor: Colours["tab-grey"],
      }}
      lazy={true}
    >
      <Tab.Screen
        name="Me"
        component={MeNav}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Intuicon name={"tab_me"} size={50} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="My Journey"
        component={MyJourneyNav}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Intuicon name={"tab_journey"} size={50} color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={MySettingsNav}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Intuicon name={"tab_profile"} size={50} color={color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

export default Nav = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn);

  const firebaseInit = () => {
    const firebaseConfig = {
      apiKey: "AIzaSyBKSXqd6RZjndkxHgELds8fxY_rkFw9hmc",
      authDomain: "intuit-consent.firebaseapp.com",
      projectId: "intuit-consent",
      appId: "1:472370611573:web:5638c66aa32e0675c5bf3c",
      databaseURL: "https://intuit-consent.firebaseio.com/",
    };
    //function which is triggered when the auth state changes
    const authStateChanged = (user) => {
      if (!user) {
        if (isLoggedIn) {
          dispatch(authActions.changeLoggedInState(false));
        }
        //if the user isn't logged in (either intially or through signing out), navigate to the auth naviagator i.e login screen
      }
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    //when the auth state changes (log in/log out) do ...
    firebase.auth().onAuthStateChanged(authStateChanged);
  };

  firebaseInit();

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <MainNav />
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Auth"
            component={AuthNav}
            options={{ headerShown: false, ...defaultOptions }}
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
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
