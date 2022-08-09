import React from "react";
import { Text } from "react-native";

const TextWrapper = (props) => {
  return (
    <Text
      style={{
        fontFamily: props.bold
          ? "avenir-demi-bold"
          : props.reg
          ? "avenir-reg"
          : props.med
          ? "avenir-med"
          : null,
        lineHeight: 24,

        ...props.style,
      }}
      onPress={props.onPress ? props.onPress : null}
    >
      {props.children}
    </Text>
  );
};

export default TextWrapper;
