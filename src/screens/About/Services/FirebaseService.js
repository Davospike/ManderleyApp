import * as React from "react";
import { View, Text, ScrollView } from "react-native";
import { styles } from "../../../styles/About";
import TextWrapper from "../../../components/UI/Text/TextWrapper";

const FirebaseService = (props) => {
  return (
    <ScrollView style={styles.backgroundColor}>
      <View style={styles.container}>
        <TextWrapper reg style={styles.bodyText}>
          <TextWrapper bold style={styles.tableItemHeader}>
            Who they are
            {"\n\n"}
          </TextWrapper>
          Firebase provides services to authenticate users and protect users'
          personal data, ensuring only the intended recipients can access it.
          {"\n\n"}
          <TextWrapper bold style={styles.tableItemHeader}>
            Communication with Firebase
            {"\n\n"}
          </TextWrapper>
          The user sends information from their mobile device to Firebase via
          Google cloud functions. The Firebase server uses HTTPS, ensuring that
          user data is encrypted in transit as well as being encrypted when stored.
          {"\n\n"}
        </TextWrapper>
      </View>
    </ScrollView>
  );
};

export default FirebaseService;
