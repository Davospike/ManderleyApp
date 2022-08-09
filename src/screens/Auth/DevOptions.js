import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  AsyncStorage,
  Alert,
} from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";

import Colours from "../../../config/colours.json";
import TextWrapper from "../../components/UI/Text/TextWrapper";
import { dropAllTables } from "../../helpers/db.js";

const DevOptions = (props) => {
  const [clearing, setClearing] = useState(false);

  const clearData = async () => {
    setClearing(true);
    await AsyncStorage.multiRemove([
      "ampId",
      "userHash",
      "consentOptions",
      "notifState",
    ]);
    const res = await dropAllTables();
    Alert.alert("Success", "All data deleted successfully.");
    setClearing(false);
  };
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <TextWrapper style={{ fontSize: 20 }} med>
          Are you sure you want to be here?
        </TextWrapper>
      </View>
      <View style={{ paddingHorizontal: 20, marginTop: 5 }}>
        <TextWrapper reg style={{ fontSize: 14 }}>
          This button will clear all the data related to this App (other than
          the App itself) from your phone.
        </TextWrapper>
      </View>
      <View style={{ marginTop: 20 }}>
        {clearing ? (
          <ActivityIndicator />
        ) : (
          <Button
            onPress={() => {
              clearData();
            }}
            theme={{
              colors: {
                primary: Colours.primary,
                underlineColor: "transparent",
              },
            }}
            labelStyle={{ fontFamily: "avenir-med" }}
            style={[
              styles.bottomButton,
              { width: Dimensions.get("window").width * 0.8 },
            ]}
            mode="contained"
          >
            Clear all data
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
    alignItems: "center",
  },
});

export default DevOptions;
