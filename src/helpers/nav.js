import Colours from "../../config/colours.json";
import { Dimensions } from "react-native";

export const defaultOptions = {
  headerStyle: {
    backgroundColor: Colours["tab-grey"],
  },
  headerTitleStyle: {
    fontFamily: "avenir-demi-bold",
    fontWeight: "200",
    width: Math.round(Dimensions.get("window").width) < 350 ? "100%" : "100%",
  },
  headerTitleContainerStyle: {
    flex: 1,
    alignItems: "center",
    paddingLeft:
      Platform.OS === "ios" ? Dimensions.get("window").width * 0.2 : 0,
  },
};
