import React from "react";
import { TextInput, configureFonts } from "react-native-paper";
import { fontConfig } from "../../../../config/paperConfig";
import Colours from "../../../../config/colours.json";
import { Dimensions } from "react-native";

export default TextInputWrapper = ({
  onFocus,
  onBlur,
  style,
  label,
  onChangeText,
  placeholder,
  value,
  secureTextEntry,
  theme,
  multiline,
  maxLength,
}) => {
  return (
    <TextInput
      style={{
        width: Dimensions.get("window").width * 0.65,
        ...style,
      }}
      onFocus={onFocus}
      onBlur={onBlur}
      maxLength={maxLength ? maxLength : null}
      theme={{
        colors: {
          primary: Colours.primary,
          underlineColor: "transparent",
        },
        fonts: configureFonts(fontConfig),
        ...theme,
      }}
      mode={"outlined"}
      label={label}
      autoCorrect={false}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      multiline={multiline}
      numberOfLines={8}
      textAlignVertical={multiline ? "top" : "center"}
      placeholder={placeholder}
      value={value}
    />
  );
};
