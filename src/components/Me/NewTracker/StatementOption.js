import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";

const StatementOption = (props) => {
  const [value, setValue] = useState("");
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.inputBoxStyle}
        placeholder="Write statement here"
        value={value}
        onChangeText={(newText) => setValue(newText)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 25,
    width: "100%",
  },
  inputBoxStyle: {
    // flex: 1,
    width: "100%",
    color: "#000",
    alignSelf: "stretch",
    paddingTop: 8,
    paddingBottom: 8,
    borderColor: "#D9D5DC",
    borderBottomWidth: 1,
    fontSize: 16,
    lineHeight: 16,
  },
});

export default React.memo(StatementOption);
