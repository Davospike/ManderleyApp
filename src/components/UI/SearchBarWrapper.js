import React from "react";
import { Searchbar, configureFonts } from "react-native-paper";
import { fontConfig } from "../../../config/paperConfig";
import Colours from "../../../config/colours.json";

export default SearchBarWrapper = ({
  placeholder,
  onChangeText,
  onFocus,
  value,
  style,
  theme,
}) => {
  return (
    <Searchbar
      style={{
        ...style,
      }}
      theme={{
        colors: {
          primary: Colours.primary,
          underlineColor: "transparent",
        },
        fonts: configureFonts(fontConfig),
        ...theme,
      }}
      value={value}
      onChangeText={onChangeText}
      onFocus={onFocus}
      placeholder={placeholder}
    />
  );
};
