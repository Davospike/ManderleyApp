import * as React from "react";
import { View, Text, ScrollView } from "react-native";
import { styles } from "../../../styles/About";
import TextWrapper from "../../../components/UI/Text/TextWrapper";
import Colours from "../../../../config/colours.json";
import ImageWrapper from "../../../components/UI/ImageWrapper";

export default ConsentApproach = (props) => {
  return (
    <ScrollView style={{ backgroundColor: Colours["background-grey"] }}>
      <View style={styles.container}>
        <TextWrapper reg style={styles.bodyText}>
          The CHIME App enables you to collect and reflect on personal data to
          help you self-manage HIV and live and age well. All of the personal
          data that you collect using the App, e.g. your sleep patterns and how
          frequently you exercise, are only stored on your phone and are not
          visible to anybody else. The App does not analyse any of the personal
          data you collect.
        </TextWrapper>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ImageWrapper
            source={require("../../../images/personal_data.png")}
            style={styles.mainLogo}
            widthScalar={0.7}
            heightScalar={0.6}
          />
        </View>
        <TextWrapper reg style={styles.bodyText}>
          We do ask for your consent for the INTUIT team to collect data about
          how you use the App, known as ‘usage data’. We analyse this data in
          order to help us improve the App. The usage data we store is completely
          anonymous, which means that we do not know whose usage data we are
          analysing.
          {"\n\n"}
          You can use the CHIME App even if you do not give us consent to collect
          usage data.
          {"\n\n"}
          In order to collect and analyse your usage data, the App uses a
          company called Amplitude. This means that anonymous data about how you
          use the App is stored on a computer managed by Amplitude. All
          communications between the App and Amplitude are encrypted to be
          compliant with the General Data Protection Regulation (GDPR), ensuring
          that your anonymous data is protected while in transit. All your
          anonymous data is also encrypted when it is stored on the Amplitude
          computer.
        </TextWrapper>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ImageWrapper
            source={require("../../../images/encrypted.png")}
            style={styles.mainLogo}
            widthScalar={0.7}
            heightScalar={0.6}
          />
        </View>
      </View>
    </ScrollView>
  );
};
