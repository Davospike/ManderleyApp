import * as React from "react";
import { View, Text, ScrollView, Linking } from "react-native";
import { styles } from "../../../styles/About";
import TextWrapper from "../../../components/UI/Text/TextWrapper";
import Colours from "../../../../config/colours.json";
import EmailLink from "../../../components/UI/EmailLink";

export default ConsentRightsLong = (props) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <TextWrapper reg style={styles.bodyText}>
          <TextWrapper bold style={styles.tableItemHeader}>
            1. Right of Access {"\n\n"}
          </TextWrapper>
          You have the right to access the anonymous usage data which we only
          collect with your consent. You can contact us via email
          <EmailLink /> or verbally via telephone 0191 208 7972 and ask for all
          the personal data that we have collected.
          {"\n\n"}We will email all of the collected information within one
          month of receiving the request, but aim to do it without undue delay.
          We will not charge a fee for providing this information.
          {"\n\n"}
          <TextWrapper bold style={styles.tableItemHeader}>
            2. Right of Rectification {"\n\n"}
          </TextWrapper>
          You have the right to ask for any inaccurate usage data to be
          rectified. Data is inaccurate if it is incorrect or misleading as to
          any matter of fact. You can contact us via email
          <EmailLink /> or verbally via telephone 0191 208 7972.
          {"\n\n"}
          <TextWrapper bold style={styles.tableItemHeader}>
            3. Right of Erasure {"\n\n"}
          </TextWrapper>
          You can ask us to delete any usage data that has been collected by
          the App. You can contact us via email <EmailLink /> or verbally
          via telephone 0191 208 7972 and ask for the usage data
          to be erased. Once erased these data cannot be restored.
          {"\n\n"}
          <TextWrapper bold style={styles.tableItemHeader}>
            4. Right of Portability {"\n\n"}
          </TextWrapper>
          You have the right to request a copy of all the usage data we have
          collected with your consent. You can contact us via email
          <EmailLink /> or verbally via telephone 0191 208 7972.
          {"\n\n"}
          More information from the Information Commissioners Office (ICO) about
          your data rights can be found at this link:
          <Text
            style={{ color: Colours.primary, fontWeight: "bold" }}
            onPress={() => {
              Linking.openURL(
                "https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/individual-rights/right-to-be-informed/"
              );
            }}
          >
            {" "}
            https://ico.org.uk/for-organisations/guide-to-data-protection/guide-to-the-general-data-protection-regulation-gdpr/individual-rights/right-to-be-informed/
          </Text>{" "}
          {"\n\n\n\n"}
        </TextWrapper>
      </View>
    </ScrollView>
  );
};
