import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { TextInput, Button } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Colours from "../../../config/colours.json";
import TextWrapper from "../../components/UI/Text/TextWrapper";
import { forgotPassword } from "../../helpers/firebase";
import TextInputWrapper from "../../components/UI/Text/TextInputWrapper";

const ForgotPassword = (props) => {
  const [emailSelected, setEmailSelected] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <TextWrapper style={{ fontSize: 20 }} med>
          Find your account
        </TextWrapper>
      </View>
      <View style={{ paddingHorizontal: 20, marginTop: 5 }}>
        <TextWrapper reg style={{ fontSize: 14 }}>
          Enter the email address you use to sign into your account into the
          field below. If we are able to find your account, we will email you
          with password reset instructions.
        </TextWrapper>
      </View>
      <View
        style={{
          paddingVertical: "2%",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 15,
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
            onChangeText={(newVal) => setEmail(newVal)}
            placeholder="me@example.com"
            value={email}
          />
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <Button
          onPress={() => {
            forgotPassword(email.trim().toLocaleLowerCase());
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
          NEXT
        </Button>
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

export default ForgotPassword;
