import { AsyncStorage } from "react-native";
import UUID from "uuid-js";
import * as firebase from "firebase";
import "firebase/functions";

export const setAmpUserId = async () => {
  const id = UUID.create().toString();
  await AsyncStorage.setItem("ampId", id);
};

export const getAmpUserId = async () => {
  const id = await AsyncStorage.getItem("ampId");
  return id;
};

export const deleteAmpUserId = async () => {
  try {
    await AsyncStorage.removeItem("ampId");
    return true;
  } catch (exception) {
    return false;
  }
};

export const startSession = async () => {
  await AsyncStorage.setItem("sessionId", String(new Date().getTime()));
};

export const logEvent = async (
  event_type,
  event_properties = null,
  user_properties = null
) => {
  let options = await AsyncStorage.getItem("consentOptions");
  const sessionId = await AsyncStorage.getItem("sessionId");
  options = JSON.parse(options);
  const id = await getAmpUserId();
  return new Promise((resolve, reject) => {
    if (options[0]) {
      firebase
        .functions()
        .httpsCallable("logEvent")({
          event_type,
          user_id: id,
          event_properties,
          user_properties,
          session_id: sessionId,
        })
        .then(({ data }) => {
          if (data.message) {
            // console.log("logged:", data.message);
            resolve(data.message);
          } else {
            console.log("eeror here");
            reject(data.message);
          }
        })
        .catch((err) => {
          console.log("error here: event_type", event_type, err);
          reject(err);
        });
    } else {
      reject("error");
    }
  });
};

export const events = {
  log_in: "log_in",
  signed_up: "signed_up",
  nav_tutorial: "nav_tutorial",
  me: {
    me_act_record: "me_act_record",
    me_act_create_tracker: "me_act_create_tracker",
    me_act_delete_tracker: "me_act_delete_tracker",
    me_nav_create_tracker: "me_nav_create_tracker",
    me_nav_manage_trackers: "me_nav_manage_trackers",
    me_act_previous_day: "me_act_previous_day",
    me_act_next_day: "me_act_next_day",
    me_act_current_day: "me_act_current_day",
  },
  myJourney: {
    myJourney_nav_create_annotation: "myJourney_nav_create_annotation",
    myJourney_act_create_annotation: "myJourney_act_create_annotation",
    myJourney_nav_view_annotation: "myJourney_nav_view_annotation",
    myJourney_nav_view_day: "myJourney_nav_view_day",
    myJourney_delete_annotation: "myJourney_delete_annotation",
  },
  mySettings: {
    mySettings_nav_priv_statement: "mySettings_nav_priv_statement",
    mySettings_nav_getting_started: "mySettings_nav_getting_started",
    mySettings_nav_analytics: "mySettings_nav_analytics",
    mySettings_nav_change_password: "mySettings_nav_change_password",
    mySettings_nav_deactivate_account: "mySettings_nav_deactivate_account",
    mySettings_act_change_password_succ: "mySettings_act_change_password_succ",
    mySettings_act_log_out: "mySettings_act_log_out",
  },
  privacy: {
    privacy_nav_landing: "privacy_nav_landing",
    privacy_nav_about_us: "privacy_nav_about_us",
    privacy_nav_consent_data_collection_landing:
      "privacy_nav_consent_data_collection_landing",
    privacy_nav_consent_data_approach: "privacy_nav_consent_data_approach",
    privacy_nav_consent_data_rights: "privacy_nav_consent_data_rights",
    privacy_nav_consent_data_rights_lm: "privacy_nav_consent_data_rights_lm",
    privacy_nav_consent_data_storage: "privacy_nav_consent_data_storage",
    privacy_nav_consent_data_storage_lm: "privacy_nav_consent_data_storage_lm",
    privacy_nav_consent_data_storage_cs: "privacy_nav_consent_data_storage_cs",
    privacy_nav_cloud_services: "privacy_nav_cloud_services",
    privacy_nav_cloud_services_firebase: "privacy_nav_cloud_services_firebase",
    privacy_nav_cloud_services_amplitude:
      "privacy_nav_cloud_services_amplitude",
  },
};
