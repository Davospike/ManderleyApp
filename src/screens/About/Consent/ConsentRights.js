import * as React from "react";
import { View, Text, ScrollView } from "react-native";
import { styles } from "../../../styles/About";
import { Button } from "react-native-paper";

import TextWrapper from "../../../components/UI/Text/TextWrapper";
import Colours from "../../../../config/colours.json";
import { events, logEvent } from "../../../helpers/amplitude";

export default ConsentRights = (props) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <TextWrapper reg style={styles.bodyText}>
          At any point you can update whether you consent or not to us collecting
          your usage data. You can do this by going to the ‘My Settings’ screen of
          the App. {"\n\n"}A full account of your data rights can be found here:
        </TextWrapper>
        <Button
          style={{ marginTop: 12 }}
          color={Colours.primary}
          mode={"contained"}
          color={Colours.primary}
          labelStyle={{ fontFamily: "avenir-demi-bold" }}
          onPress={() => {
            logEvent(events.privacy.privacy_nav_consent_data_rights_lm);
            props.navigation.navigate("ConsentRightsLong");
          }}
        >
          Learn more
        </Button>
      </View>
    </ScrollView>
  );
};
