import * as React from "react";
import { View, Text, ScrollView } from "react-native";
import { styles } from "../../../styles/About";
import TextWrapper from "../../../components/UI/Text/TextWrapper";
import Colours from "../../../../config/colours.json";

const AmplitudeService = (props) => {
  return (
    <ScrollView style={{ backgroundColor: Colours["background-grey"] }}>
      <View style={styles.container}>
        <TextWrapper reg style={styles.bodyText}>
          <TextWrapper bold style={styles.tableItemHeader}>
            Who they are
            {"\n\n"}
          </TextWrapper>
          Usage data provides insights about how users are utilising the
          application in order to find trends and answer questions. This is
          important as it enables us to evaluate the extent to which different
          features are being used. We collect and analyse the usage data to
          improve the App.
          {"\n\n"}
          <TextWrapper bold style={styles.tableItemHeader}>
            Communication with Amplitude
            {"\n\n"}
          </TextWrapper>
          When you use any features of the App this action is sent via Google
          cloud functions to Amplitude.
          {"\n\n"}
        </TextWrapper>
      </View>
    </ScrollView>
  );
};

export default AmplitudeService;
