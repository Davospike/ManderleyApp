import React, { useCallback, useState } from "react";
import Carousel from "../Onboarding/Carousel";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, View, Text, Linking } from "react-native";
import { useDispatch } from "react-redux";
import * as authActions from "../../../store/actions/auth";
import * as permissionActions from "../../../store/actions/globalPermissions";
import * as mySettingsActions from "../../../store/actions/mySettings";
import { events, logEvent, startSession } from "../../../helpers/amplitude";

import Colours from "../../../../config/colours.json";
import { useEffect } from "react";
import TextWrapper from "../../../components/UI/Text/TextWrapper";
import OnboardingCommonItems from "./OnboardingCommonItems";

export default Onboarding = (props) => {
  const dispatch = useDispatch();
  const [consentOptions, setConsentOptions] = useState([true, false, false]);

  useFocusEffect(
    useCallback(() => {
      dispatch(permissionActions.changePermissionsLoaded(true));

      return () => {
        dispatch(permissionActions.changePermissionsLoaded(false));
      };
    }, [])
  );

  useEffect(() => {
    dispatch(mySettingsActions.updateItemConsentOptions([true, false, false]));
  }, []);

  const submitHandler = async () => {
    await startSession();
    logEvent(events.signed_up);
    dispatch(authActions.changeLoggedInState(true));
  };

  const updateConsent = (index, c) => {
    const newConsentOptions = [...consentOptions];
    newConsentOptions[index] = c;
    setConsentOptions(newConsentOptions);
    dispatch(mySettingsActions.updateItemConsentOptions(newConsentOptions));
  };
  return (
    <View style={styles.container}>
      <Carousel
        style="slide"
        navigation={props.navigation}
        items={[
          ...OnboardingCommonItems,
          {
            style: "permission",
            topText:
              "I give permission for CHIME to collect data about how I use the App in order to improve the user experience.",
            warningText: (
              <Text>
                <Text
                  style={{ color: Colours.primary, fontWeight: "bold" }}
                  onPress={() => {
                    props.navigation.navigate("ConsentApproach");
                  }}
                >
                  Press here
                </Text>{" "}
                to read more about how we collect and process data about how you
                use the App.
              </Text>
            ),
            image: require("../../../images/Authentication_Illustrations-01.png"),
          },
          {
            style: "get_started",
          },
        ]}
        onUpdateConsent={updateConsent}
        consentOptions={consentOptions}
        submitHandler={submitHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Colours["background-grey"],
  },
});