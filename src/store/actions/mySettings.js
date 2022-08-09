import { AsyncStorage } from "react-native";

export const updateItemConsentOptions = (consentOptions) => {
  return async (dispatch) => {
    let consentOptionsOrig = await AsyncStorage.getItem("consentOptions");
    consentOptionsOrig = JSON.parse(consentOptionsOrig);

    await AsyncStorage.setItem(
      "consentOptions",
      JSON.stringify(consentOptions)
    );

    dispatch({ type: "Update_Consent_Options", consentOptions });
  };
};
