import React from "react";
import { View } from "react-native";
import Icon from "./Icon";

const Intuicon = (props) => (
  <View style={props.style}>
    <Icon name={props.name} size={props.size} color={props.color} />
  </View>
);

export default Intuicon;
