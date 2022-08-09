import React, { memo, useState } from "react";
import TextInputWrapper from "../../UI/Text/TextInputWrapper";
import Colours from "../../../../config/colours.json";

const Prompt = (props) => {
  const [value, setValue] = useState(props.edit ? props.value : "");

  return (
    <TextInputWrapper
      style={{
        width: "90%",
        marginBottom: 10,
      }}
      theme={{
        colors: {
          primary: Colours.secondary,
          underlineColor: "transparent",
        },
      }}
      label={`Prompt ${props.index} (optional)`}
      placeholder={`Prompt ${props.index} (optional)`}
      value={value}
      onChangeText={(newText) => {
        setValue(newText);
        props.setValue(newText);
      }}
    />
  );
};

export default memo(Prompt);
