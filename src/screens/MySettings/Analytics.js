import React, { useState, useEffect } from "react";
import { Text, Switch, View, StyleSheet, AsyncStorage } from "react-native";
import TextWrapper from "../../components/UI/Text/TextWrapper";
import Colours from "../../../config/colours.json";
import { useDispatch } from "react-redux";
import * as mySettingsActions from "../../store/actions/mySettings";
import { Button } from "react-native-paper";

const Analytics = (props) => {
  const dispatch = useDispatch();

  const [consentOptions, setConsentOptions] = useState(false);
  const [showAnalyticsId, setShowAnalyticsId] = useState(false);
  const [ampId, setAmpId] = useState("");

  //when component mounts, get consent options
  useEffect(() => {
    /**
     * This function will check the user's consent options
     *
     * @returns {boolean[]} - Array containing the user's consent options
     */
    const getConsentOptions = async () => {
      let options = await AsyncStorage.getItem("consentOptions");
      if (options) {
        options = JSON.parse(options);
        setConsentOptions(options);
      }
    };

    const getAmpID = async () => {
      let id = await AsyncStorage.getItem("ampId");
      if (id) {
        setAmpId(id);
      }
    };

    getConsentOptions();
    getAmpID();
  }, []);

  const AmpIdShow = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <TextWrapper
          med
          style={{
            fontSize: 26,
            lineHeight: 32,
            letterSpacing: 10,
            backgroundColor: Colours["grey-light"],
            padding: 20,
            borderRadius: 20,
          }}
        >
          {ampId.substring(0, 5)}
        </TextWrapper>
        <Button
          theme={{
            colors: {
              primary: Colours.primary,
              underlineColor: "transparent",
            },
          }}
          labelStyle={{ fontFamily: "avenir-demi-bold" }}
          onPress={() => {
            setShowAnalyticsId(false);
          }}
        >
          Hide
        </Button>
      </View>
    );
  };

  /**
   * This function will, given the target option and new value, update the user's consent options.
   *
   * @param {number} index
   * @param {boolean} c
   *
   * @returns {void}
   */
  const updateConsent = (index, c) => {
    //update consent option
    const newConsentOptions = [...consentOptions];
    newConsentOptions[index] = c;

    //update consent options locally and in storage
    setConsentOptions(newConsentOptions);
    dispatch(mySettingsActions.updateItemConsentOptions(newConsentOptions));
  };

  return (
    <View style={styles.container}>
      <TextWrapper reg>
        CHIME would like to collect data about how you use the App in order to improve the
        user experience.
      </TextWrapper>
      <View style={styles.consentContainer}>
        <TextWrapper reg style={styles.text}>
          I give permission for CHIME to collect data about how I use the App.
        </TextWrapper>
        <Switch
          style={styles.switch}
          value={consentOptions[0]}
          onValueChange={(c) => updateConsent(0, c)}
          trackColor={{ true: Colours.secondary }}
          thumbColor={"white"}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        {showAnalyticsId ? (
          <AmpIdShow />
        ) : (
          <Button
            theme={{
              colors: {
                primary: Colours.primary,
                underlineColor: "transparent",
              },
            }}
            labelStyle={{ fontFamily: "avenir-demi-bold" }}
            mode="contained"
            onPress={() => {
              setShowAnalyticsId(true);
            }}
          >
            Reveal analytics ID
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: Colours["background-grey"],
    paddingHorizontal: "8%",
  },
  text: {
    flex: 8,
  },
  switch: {
    flex: 1,
    paddingHorizontal: 10,
  },
  consentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default Analytics;
