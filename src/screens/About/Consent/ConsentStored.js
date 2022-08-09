import * as React from "react";
import { View, Text, ScrollView, Image, Dimensions } from "react-native";
import { styles } from "../../../styles/About";
import { Button } from "react-native-paper";
import Colours from "../../../../config/colours.json";
import TextWrapper from "../../../components/UI/Text/TextWrapper";
import { events, logEvent } from "../../../helpers/amplitude";

export default ConsentStored = (props) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            source={require("../../../images/personal_data2.png")}
            style={[
              styles.mainLogo,
              {
                width: Dimensions.get("window").width * 0.7,
                height: Dimensions.get("window").width * 0.6,
              },
            ]}
          />
        </View>
        <TextWrapper reg style={styles.bodyText}>
          All of your tracked personal data, e.g. your personal reflections
          and how frequently you exercise, is only stored on your mobile device.
          Only you have access to your personal data. The App does not analyse any
          of the personal data that you track. We securely store only the minimum
          amount of other personal data required to ensure the App functions securely.
          These other data are stored on computers that are accessed via the internet
          (known as 'cloud servers').  {"\n\n"}A full list of the stored data
          items can be found here:
        </TextWrapper>
        <Button
          style={{ marginTop: 12 }}
          mode={"contained"}
          color={Colours.primary}
          labelStyle={{ fontFamily: "avenir-demi-bold" }}
          onPress={() => {
            logEvent(events.privacy.privacy_nav_consent_data_storage_lm);
            props.navigation.navigate("ConsentStoredLong");
          }}
        >
          Learn more
        </Button>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Image
            source={require("../../../images/service_phone2.png")}
            style={{
              marginTop: 30,
              width: Dimensions.get("window").width * 1,
              height: Dimensions.get("window").width * 1.4,
            }}
          />
        </View>
        <TextWrapper reg style={styles.bodyText}>
          {"\n\n"}A full list of the cloud servers that we use can be found
          here:
        </TextWrapper>
        <Button
          style={{ marginTop: 12, marginBottom: 50 }}
          mode={"contained"}
          color={Colours.primary}
          labelStyle={{ fontFamily: "avenir-demi-bold" }}
          onPress={() => {
            logEvent(events.privacy.privacy_nav_consent_data_storage_cs);
            props.navigation.navigate("SecurityCloud");
          }}
        >
          Cloud services
        </Button>
      </View>
    </ScrollView>
  );
};
