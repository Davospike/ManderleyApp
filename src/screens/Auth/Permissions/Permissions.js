import React, { useCallback, useState } from "react";
import Carousel from "./Carousel";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, View, Text } from "react-native";
import { useDispatch } from "react-redux";
import * as authActions from "../../../store/actions/auth";
import * as permissionActions from "../../../store/actions/globalPermissions";
import * as mySettingsActions from "../../../store/actions/mySettings";

import Colours from "../../../../config/colours.json";
import { events, logEvent } from "../../../helpers/amplitude";

export default Permissions = (props) => {
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
  const submitHandler = () => {
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
        navigation={props.navigation}
        style="slide"
        items={[
          {
            style: "permission",
            topText:
              "I give permission for CHIME to collect data about how I use the App in order to improve the user experience.",
            warningText: (
              <Text>
                Press{" "}
                <Text
                  style={{ color: Colours.primary }}
                  onPress={() => {
                    props.navigation.navigate("ConsentList");
                  }}
                >
                  here
                </Text>{" "}
                to read more about how we collect and process data about how you
                use the App
              </Text>
            ),
            image: require("../../../images/Authentication_Illustrations-01.png"),
          },
          {
            style: "permission",
            topText:
              "In order to communicate with other peers in the Community section of the App, I give permission for data that I share with peers to be stored securely in the cloud. ",
            warningText: (
              <Text>
                Press{" "}
                <Text
                  style={{ color: Colours.primary }}
                  onPress={() => {
                    logEvent(
                      events.privacy.privacy_nav_consent_data_collection_landing
                    );
                    props.navigation.navigate("ConsentList");
                  }}
                >
                  here
                </Text>{" "}
                to read more about how we collect and process data about how you
                use the App
              </Text>
            ),
            lightbulbText: "",
            image: require("../../../images/Authentication_Illustrations-02.png"),
          },
          {
            style: "permission",
            topText:
              "I give permission for messaging functionality to be enabled within the App, so that I may communicate directly with peers in the Community section. ",
            warningText: (
              <Text>
                Press{" "}
                <Text
                  style={{ color: Colours.primary }}
                  onPress={() => {
                    logEvent(
                      events.privacy.privacy_nav_consent_data_collection_landing
                    );
                    props.navigation.navigate("ConsentList");
                  }}
                >
                  here
                </Text>{" "}
                to read more about how we collect and process data about how you
                use the App
              </Text>
            ),
            image: require("../../../images/Authentication_Illustrations-03.png"),
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
