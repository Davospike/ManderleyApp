import * as React from "react";
import { View, Text, ScrollView, Linking } from "react-native";
import { styles } from "../../styles/About";
import TextWrapper from "../../components/UI/Text/TextWrapper";
import Colours from "../../../config/colours.json";
import EmailLink from "../../components/UI/EmailLink";

export default AboutUs = () => {
  return (
    <ScrollView style={{ backgroundColor: Colours["background-grey"] }}>
      <View style={styles.container}>
        <TextWrapper reg style={styles.bodyText}>
          The CHIME App has been co-designed by the HIV community and UK
          university researchers as part of the INTUIT research programme:{" "}
          <Text
            style={{ color: Colours.primary, fontWeight: "bold" }}
            onPress={() => {
              Linking.openURL("https://intuitproject.org/");
            }}
          >
            {" "}
            https://intuitproject.org/
          </Text>
          {"\n"}
          {"\n"}We aim to:{"\n"}⦁ Develop and evaluate new tools that empower
          people to collect and reflect on their personal data so that they can
          self-manage HIV and live and age well.
          {"\n"}
          {"\n"}⦁ Understand what it means to share this personal data with
          others, including people living with HIV and health care
          professionals.   {"\n"}
          {"\n"}⦁ Identify ethical issues related to sharing personal data. This
          will help us to develop responsible approaches for conducting
          technology research that explores the development of future
          applications and services for supporting the self-management of health
          and wellbeing.
          {"\n"}
          {"\n"}
          While our work focuses on people living with HIV, insights from this
          research can be of value for understanding barriers to sharing
          personal data when living with other long-term health conditions.
          {"\n"}
          {"\n"}For more information about the INTUIT project or to get in touch
          with the team, please contact the INTUIT project manager by email:
          <EmailLink />.{"\n"}
          {"\n"}
        </TextWrapper>
      </View>
    </ScrollView>
  );
};
