import React from "react";
import { View, ScrollView, Text, StyleSheet, Dimensions } from "react-native";
import { Slide } from "./Slide";
import GetStarted from "./GetStarted";
import Colours from "../../../../config/colours.json";

export const Carousel = (props) => {
  const { items, style } = props;
  const itemsPerInterval =
    props.itemsPerInterval === undefined ? 1 : props.itemsPerInterval;

  const [interval, setInterval] = React.useState(1);
  const [intervals, setIntervals] = React.useState(1);
  const [width, setWidth] = React.useState(0);

  const init = (width) => {
    // initialise width
    setWidth(width);
    // initialise total intervals
    const totalItems = items.length;
    setIntervals(Math.ceil(totalItems / itemsPerInterval));
  };

  const getInterval = (offset) => {
    for (let i = 1; i <= intervals; i++) {
      if (offset < (width / intervals) * i) {
        return i;
      }
      if (i == intervals) {
        return i;
      }
    }
  };

  let bullets = [];
  for (let i = 1; i <= intervals; i++) {
    bullets.push(
      <Text
        key={i}
        style={{
          ...styles.bullet,
          opacity: interval === i ? 0.5 : 0.1,
        }}
      >
        &bull;
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        nestedScrollEnabled={true}
        contentContainerStyle={{
          ...styles.scrollView,
          width: `${100 * intervals}%`,
        }}
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={(w, h) => init(w)}
        onScroll={(data) => {
          setWidth(data.nativeEvent.contentSize.width);
          setInterval(getInterval(data.nativeEvent.contentOffset.x));
        }}
        directionalLockEnabled={false}
        scrollEventThrottle={200}
        pagingEnabled
        decelerationRate="fast"
      >
        {items.map((item, index) => {
          switch (item.style) {
            case "get_started":
              return (
                <GetStarted
                  key={index}
                  submitHandler={props.submitHandler}
                  navigation={props.navigation}
                />
              );

            default:
              return (
                <Slide
                  image={item.image}
                  key={index}
                  topText={item.topText}
                  warningText={item.warningText}
                  lightbulbText={item.lightbulbText}
                  index={index}
                  onUpdateConsent={props.onUpdateConsent}
                  consentOptions={props.consentOptions}
                />
              );
          }
        })}
      </ScrollView>
      <View style={styles.bullets}>{bullets}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsHead: {
    paddingTop: 10,
    paddingHorizontal: 12,
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: Colours["background-grey"],
  },
  scrollView: {
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
    backgroundColor: Colours["background-grey"],
  },
  bullets: {
    position: "absolute",
    top: 0,
    left: 0,
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 0,
  },
  bullet: {
    color: Colours["blue-dark"],
    paddingHorizontal: 5,
    fontSize: Dimensions.get("window").height * 0.06,
  },
});

export default Carousel;
