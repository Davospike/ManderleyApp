import * as firebase from "firebase";
import "firebase/firestore";

import React, { useCallback, useEffect, useReducer, useState } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import {
  fetchTrackers,
  initAnnotations,
  initMarkedDates,
  initTrackerData,
  initTrackers,
  insertItemTrackers,
} from "../../helpers/db.js";
import {
  forgotPassword,
  manageFPErrors,
  manageFPErrorCode,
  manageFPErrorMessage,
  manageFPError,
  validEmail,
  onboard,
} from "../../helpers/firebase";
import * as authActions from "../../store/actions/auth";
import * as mySettingsActions from "../../store/actions/mySettings";
import Colours from "../../../config/colours.json";
import { ScrollView } from "react-native-gesture-handler";
import { Button, configureFonts } from "react-native-paper";
import TextWrapper from "../../components/UI/Text/TextWrapper.js";
import { setUserHash, getUserHash, genHash } from "../../helpers/userHash";
import {
  setAmpUserId,
  logEvent,
  events,
  startSession,
} from "../../helpers/amplitude";
import TextInputWrapper from "../../components/UI/Text/TextInputWrapper.js";
import { fontConfig } from "../../../config/paperConfig";

let signUpSchema = yup.object().shape({
  email: yup
    .string()
    .required("No email address provided")
    .email("Email address must be in correct format"),
  password: yup
    .string()
    .required("No password provided")
    .min(6, "passwords must be 6 characters or more"),
  passwordConf: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const existingUser = async () => {
  let userHash = await getUserHash();
 // if (userHash !== null) {
 //   throw "A user account already exists on this device. The account must be deactivated before a new account can be created.";
 // }
};

const isCurrentUser = async (email) => {
  const userHash = await getUserHash();
  const emailHash = await genHash(email);
  if (userHash !== null) {
    if (userHash === emailHash) {
      return true;
 //   } else {
 //     throw "A user account already exists on this device. The account must be deactivated before a new account can be used.";
    }
  } else {
    return true;
  }
};

//local reducer for managing login/signup form
const localReducer = (state, action) => {
  switch (action.type) {
    //case for updating form
    case "UPDATE": {
      const inputValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };
      return {
        ...state,
        inputValues,
      };
    }
    //case for clearing passwords if there's a mismatch
    case "CLEAR PASSWORDS": {
      const inputValues = {
        ...state.inputValues,
        password: "",
        passwordConf: "",
      };
      return {
        ...state,
        inputValues,
      };
    }
    case "CLEAR": {
      const inputValues = {
        ...state.inputValues,
        password: "",
        passwordConf: "",
        email: "",
      };
      return {
        ...state,
        inputValues,
      };
    }

    default:
      return state;
  }
};

export default Auth = (props) => {
  const [emailSelected, setEmailSelected] = useState(false);
  const [pwSelected, setPwSelected] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const getConsentOptions = async () => {
      let options = await AsyncStorage.getItem("consentOptions");
      if (options) {
        options = JSON.parse(options);
        dispatch(mySettingsActions.updateItemConsentOptions(options));
      }
    };

    getConsentOptions();
  }, []);

  const permissionsLoaded = useSelector(
    ({ permissions }) => permissions.isPermissionsLoaded
  );

  const initDb = () => {
    initTrackers()
      .then(() => {
        fetchTrackers().then((res) => {
          if (res.rows._array.length === 0) {
            //insert diary
            insertItemTrackers("1", "Diary", true, "", "Diary").then(() => {
              insertItemTrackers(
                "2",
                "Numeric",
                true,
                JSON.stringify({
                  units: "Hours",
                  frequency: [true, true, true, true, true, true, true],
                  colour: "#868686",
                }),
                "Sleep"
              );
              insertItemTrackers(
                "3",
                "Tickbox",
                true,
                JSON.stringify({
                  prompts: ["Have you exercised today?"],
                  frequency: [true, true, true, true, true, true, true],
                  colour: "#7A89FB",
                  tickboxFreq: 1,
                }),
                "Exercise"
              );
              insertItemTrackers(
                "4",
                "Scale",
                true,
                JSON.stringify({
                  paramsArray: [
                    { emoji: "😃", statement: "Happy" },
                    { emoji: "😌", statement: "Okay" },
                    { emoji: "😢", statement: "Sad" },
                  ],
                  frequency: [true, true, true, true, true, true, true],
                  colour: "#F49D6E",
                }),
                "Mood"
              );
              console.log("completed");
            });
          }
        });
      })
      .catch((err) => {
        console.log("Failed to initialise for trackers...");
        console.log(err);
      });

    initTrackerData()
      .then(() => {
        console.log("Initialised database for trackerData...");
      })
      .catch((err) => {
        console.log("Failed to initialise for trackerData...");
        console.log(err);
      });

    initMarkedDates()
      .then(() => {
        console.log("Initialised database for Marked Dates...");
      })
      .catch((err) => {
        console.log("Failed to initialise for Marked Dates...");
        console.log(err);
      });

    initAnnotations()
      .then(() => {
        console.log("Initialised database for Annotations...");
      })
      .catch((err) => {
        console.log("Failed to initialise for Annotations...");
        console.log(err);
      });
  };

  useEffect(() => {
    if (permissionsLoaded) {
      setIsSigningUp(false);
      localDispatch({
        type: "CLEAR",
      });
    }
  }, [permissionsLoaded]);

  //state for managing which mode the user is in
  const [isSignUp, setIsSignUp] = useState(false);

  //sate for managing whether the sign up/login button has been pressed
  const [isSigningUp, setIsSigningUp] = useState(false);

  //defining state which is manipulated by the local reducer
  const [localState, localDispatch] = useReducer(localReducer, {
    inputValues: {
      email: "",
      password: "",
      passwordConf: "",
    },
  });

  //handler for changing mode i.e. signUp <=> signIn
  const changeModeHandler = () => {
    setIsSignUp((current) => !current);
  };

  //handler for input changes => email, password of confirm password inputs
  const inputChangeHandler = useCallback(
    (input, value) => {
      localDispatch({
        type: "UPDATE",
        input,
        value,
      });
    },
    [localDispatch]
  );

  //handler for either signing in or signing up
  const authHandler = async () => {
    setIsSigningUp(true);
    //case for signing up
    const email = localState.inputValues.email.trim().toLowerCase();
    if (isSignUp) {
      try {
        await signUpSchema.validate({
          ...localState.inputValues,
          email: email,
        });
        // await existingUser(); Turned off so multiple accounts can be used on the same phone
        //check validity of address
        // await validEmail(email); Turned off so that there's no need for an email to exist in a database before someone
        // can sign up

        await onboard(email);
        //create firebase user
        await firebase
          .auth()
          .createUserWithEmailAndPassword(
            email,
            localState.inputValues.password
          );

        await setUserHash(email);
        await setAmpUserId();
        initDb();
        props.navigation.navigate("Onboarding");
      } catch (error) {
        setIsSigningUp(false);
        if (
          !(
            error.message ===
            "You must agree with the terms and conditions to use this app"
          )
        ) {
          localDispatch({
            type: "CLEAR PASSWORDS",
          });
        }
        if (error.code) {
          manageFPErrorCode(error);
        } else if (error.message) {
          manageFPErrorMessage(error);
        } else {
          manageFPError(error);
        }
      }
      //case for logging in
    } else {
      try {
        //sign into firebase
        await isCurrentUser(email);
        initDb();
        await firebase
          .auth()
          .signInWithEmailAndPassword(email, localState.inputValues.password);
        await startSession();
        logEvent(events.log_in);

        await dispatch(authActions.changeLoggedInState(true));
      } catch (error) {
        setIsSigningUp(false);
        if (error.code) {
          manageFPErrorCode(error);
        } else if (error.message) {
          manageFPErrorMessage(error);
        } else {
          manageFPError(error);
        }
      }
    }
  };

  if (isSigningUp && !permissionsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <View
          style={{
            alignItems: "center",
            paddingTop: Dimensions.get("window").height * 0.15,
            paddingBottom: Dimensions.get("window").height * 0.05,
          }}
        >
          <Image
            source={require("../../images/manderley-logo-and-name.png")}
            style={styles.mainLogo}
            // People vector created by freepik - www.freepik.com
          />
        </View>
        {/* email input */}
        <View
          style={{
            paddingVertical: "2%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="email-outline"
            size={28}
            color={emailSelected ? Colours["primary"] : Colours["grey-light"]}
          />
          <View style={{ paddingHorizontal: "8%" }}>
            <TextInputWrapper
              onFocus={() => {
                setEmailSelected(true);
              }}
              onBlur={() => {
                setEmailSelected(false);
              }}
              label="Email"
              onChangeText={(input) => inputChangeHandler("email", input)}
              placeholder="me@example.com"
              value={localState.inputValues.email}
            />
          </View>
        </View>
        {/* password input */}
        <View
          style={{
            paddingVertical: "2%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="lock-open-outline"
            size={28}
            color={pwSelected ? Colours["primary"] : Colours["grey-light"]}
          />

          <View style={{ paddingHorizontal: "8%" }}>
            <TextInputWrapper
              onFocus={() => {
                setPwSelected(true);
              }}
              onBlur={() => {
                setPwSelected(false);
              }}
              label="Password"
              onChangeText={(input) => inputChangeHandler("password", input)}
              placeholder="At least 6 characters required"
              secureTextEntry
              value={localState.inputValues.password}
            />
            {/* confirm password box, which is only presented if in sign up mode */}
            {isSignUp && (
              <View style={{ paddingTop: "4%" }}>
                <TextInputWrapper
                  onFocus={() => {
                    setPwSelected(true);
                  }}
                  onBlur={() => {
                    setPwSelected(false);
                  }}
                  label="Confirm password"
                  onChangeText={(input) =>
                    inputChangeHandler("passwordConf", input)
                  }
                  placeholder="Same as password"
                  secureTextEntry
                  value={localState.inputValues.passwordConf}
                />
              </View>
            )}
          </View>
        </View>

        <View
          style={{
            paddingTop: "10%",
            alignItems: "center",
          }}
        >
          {isSignUp ? (
            <Button
              onPress={authHandler}
              theme={{
                colors: {
                  primary: Colours.primary,
                  underlineColor: "transparent",
                },
                fonts: configureFonts(fontConfig),
              }}
              labelStyle={{ fontFamily: "avenir-demi-bold" }}
              style={[
                styles.bottomButton,
                {
                  width: Dimensions.get("window").width * 0.8,
                },
              ]}
              mode="contained"
            >
              Sign up
            </Button>
          ) : (
            <Button
              onPress={authHandler}
              theme={{
                colors: {
                  primary: Colours.primary,
                  underlineColor: "transparent",
                },
                fonts: configureFonts(fontConfig),
              }}
              style={[
                styles.bottomButton,
                { width: Dimensions.get("window").width * 0.8 },
              ]}
              mode="contained"
            >
              Log in
            </Button>
          )}
          {/* button to change to signing in or signing up */}
          {isSigningUp ? null : !isSignUp ? (
            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity onPress={changeModeHandler}>
                <TextWrapper med style={styles.forgotPasswordText}>
                  Don't have an account? Sign up!
                </TextWrapper>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity onPress={changeModeHandler}>
                <TextWrapper med style={styles.forgotPasswordText}>
                  Already have an account?
                </TextWrapper>
              </TouchableOpacity>
            </View>
          )}
          {isSignUp ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            ></View>
          ) : (
            /* when the sign in or sign up buttons are pressed, a loading indicator is returned while it signs in before screen changes */

            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("ForgotPassword");
                }}
              >
                <TextWrapper med style={styles.forgotPasswordText}>
                  Forgot password?
                </TextWrapper>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.devOptionsContainer}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("DevOptions");
              }}
            >
              <TextWrapper med style={styles.forgotPasswordText}>
                Developer options
              </TextWrapper>
            </TouchableOpacity>
          </View>

          <View style={{ height: 50 }} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: { backgroundColor: Colours["background-grey"] },
  container: {
    flex: 1,
    paddingHorizontal: "8%",
    backgroundColor: Colours["background-grey"],
  },
  indicator: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "#FFF",
    flexWrap: "nowrap",
    elevation: 3,
    borderRadius: 2,
    borderColor: "#888",
    borderWidth: 1,
    shadowOffset: {
      height: 2,
      width: -2,
    },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "center",
    padding: "3%",
  },
  mainLogo: {
    width: Dimensions.get("window").width * 0.89,
    height: Dimensions.get("window").width * 0.28,
    marginTop: 10,
    marginBottom: 20,
  },
  bottomButton: {
    borderRadius: 12,
    borderWidth: 0,
  },
  forgotPasswordContainer: {
    paddingTop: 18,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  devOptionsContainer: {
    paddingTop: 70,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  forgotPasswordText: {
    fontSize: 14,
    color: Colours.primary,
  },
});

//don't show header
Auth.navigationOptions = {
  headerShown: false,
};
