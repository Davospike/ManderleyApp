import React from "react";
import { Dimensions, Image } from "react-native";

export default ImageWrapper = ({
  source,
  style,
  widthScalar,
  heightScalar,
}) => {
  return (
    <Image
      source={source}
      style={[
        style,
        {
          width: Dimensions.get("window").width * widthScalar,
          height: Dimensions.get("window").width * heightScalar,
        },
      ]}
    />
  );
};
