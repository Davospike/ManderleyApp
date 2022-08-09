import TextWrapper from "../../../components/UI/Text/TextWrapper";
import {Linking, Text} from "react-native";
import Colours from "../../../../config/colours.json";
import React from "react";

export default [
  {
    style: "onboarding",
    header: "logo_main",
    topText:
      "The CHIME App is designed to support self-care and living well with HIV ",
    bodyText: (
      <TextWrapper>
        You can think of the App as a digital diary that lets you track
        and reflect on personal data.{"\n\n"}Research has shown that
        this can help people manage long term conditions more
        effectively.{"\n\n"}CHIME has been designed by a research team
        working on a UK-funded project called INTUIT:
        <Text
          style={{ color: Colours.primary, fontWeight: "bold" }}
          onPress={() => {
            Linking.openURL("https://intuitproject.org/");
          }}
        >
          {" "}
          https://intuitproject.org/
        </Text>
      </TextWrapper>
    ),
  },
  {
    style: "onboarding",
    header: "logo_track",
    topText: "Track personal data",
    bodyText:
      "You can track personal data using the App, for example, your step count and your mood. \n\nYou can also record daily reflections using text and images. \n\nThe App provides a number of Trackers to help you record personal data about sleep, exercise and mood. You can set up custom Trackers to record any personal data you like. \n\nThe personal data you collect are stored on your phone and only you have access to them.",
    bottomText:
      "Play the short video below to see how you can make your own Tracker.",
  },
  {
    style: "onboarding",
    header: "logo_journey",
    topText: "My health journey",
    bodyText:
      "The My Journey section of the App helps you to reflect on your personal data over time and spot patterns. \n\nYou can identify and annotate trends. For example, your step count might have gone down for a couple of weeks because you started driving to work. \n\nAll personal data annotations are stored on your phone and only you have access to them.",
    bottomText:
      "Play the short video below to see how you can annotate a trend in your personal data.",
  },
  {
    style: "final_screen",
  },
];