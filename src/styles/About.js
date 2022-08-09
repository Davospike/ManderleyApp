import { StyleSheet, Dimensions } from "react-native";
import Colours from "../../config/colours.json";

export const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    paddingHorizontal: "8%",
    backgroundColor: Colours["background-grey"],
  },
  tableItemHeader: {
    fontSize: 20,
    marginBottom: 15,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
  },
  backgroundColor: {
    backgroundColor: Colours["background-grey"],
  },
  mainLogo: {
    marginTop: 10,
    marginBottom: 10,
  },
});
