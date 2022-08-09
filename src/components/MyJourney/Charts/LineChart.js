import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import PureChart from "../../../libraries/react-native-pure-chart";

import {
  convertDateDDMMYYYY,
  datesBetweenArray,
} from "../../../helpers/date.js";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Colours from "../../../../config/colours.json";

export default LineChart = (props) => {
  const [chartGap, setChartGap] = useState(15);
  const [chartData, setChartData] = useState([]);
  const [hidden, setHidden] = useState(props.defaultShow);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setUpdating(false);
  }, [chartGap]);

  let dateRange = [
    props.startDate,
    ...datesBetweenArray(props.startDate, props.endDate),
    props.endDate,
  ];

  const convertChartData = () => {
    let data = [];

    const dataDates = props.chartData.reduce((res, item) => {
      return Object.assign(res, {
        [item.date]: true,
      });
    }, {});

    const blankDates = dateRange.filter((date) => {
      if (dataDates[date] === undefined) {
        return 1;
      }
    });

    if (props.trackerType === "Tickbox") {
      for (let i = 0; i < props.chartData.length; i++) {
        if (
          props.chartData[i].data.value.some(
            (elem) => elem === true || elem === false
          )
        ) {
          let y =
            Number(
              props.chartData[i].data.value.every((elem) => elem === true)
            ) + 1;
          data.push({
            x: props.chartData[i].date,
            y,
            data: props.chartData[i].data.value,
          });
        }
      }
    } else if (props.trackerType === "Scale") {
      for (let i = 0; i < props.chartData.length; i++) {
        let y = props.chartData[i].data.value + 1;
        data.push({
          x: props.chartData[i].date,
          y,
        });
      }
    } else if (props.trackerType === "Numeric") {
      for (let i = 0; i < props.chartData.length; i++) {
        let y = Number(props.chartData[i].data.value);
        data.push({
          x: props.chartData[i].date,
          y,
        });
      }
    }
    blankDates.map((date) => {
      data.push({
        x: date,
        y: 0,
        empty: true,
      });
    });

    data.sort((x, y) => {
      if (x.x < y.x) {
        return -1;
      }
    });

    return data.map((item) => {
      return {
        x: convertDateDDMMYYYY(new Date(item.x)),
        y: item.y,
        data: item.data,
        empty: item.empty,
      };
    });
  };

  const paramsArrayToMap = (paramsArray) => {
    if (paramsArray !== undefined) {
      const scaleMap = { 0: { emoji: "", statement: "" } };
      paramsArray.map((item, index) => {
        scaleMap[index + 1] = { emoji: item.emoji, statement: item.statement };
      });
      return scaleMap;
    }
  };

  useEffect(() => {
    setChartData(convertChartData());
  }, []);

  const Chart = () => (
    <PureChart
      data={chartData}
      type="line"
      height={150}
      gap={chartGap}
      units={props.units}
      scaleMap={paramsArrayToMap(props.paramsArray)}
      trackerType={props.trackerType}
      reduceXaxisLabels={true}
    />
  );

  return (
    <View>
      <View style={{ paddingVertical: "2%" }}>
        <View style={[styles.container, props.style]}>
          <View
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                paddingHorizontal: "5%",
                paddingVertical: "5%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text numberOfLines={1} style={styles.titleStyle}>
                {props.trackerTitle}
              </Text>
              <View
                style={{ justifyContent: "flex-start", alignItems: "flex-end" }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setHidden(!hidden);
                  }}
                >
                  {hidden ? (
                    <MaterialCommunityIcons
                      name="eye"
                      size={24}
                      color={Colours["grey-dark"]}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="eye-off"
                      size={24}
                      color={Colours["grey-dark"]}
                    />
                  )}
                </TouchableOpacity>
                {hidden !== true ? (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        if (chartGap === 60) {
                          setChartGap(30);
                          setUpdating(true);
                        } else if (chartGap === 30) {
                          setChartGap(15);
                          setUpdating(true);
                        }
                        if (hidden) {
                          setHidden(false);
                        }
                        setChartData([...chartData]);
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          opacity: chartGap !== 15 ? 1.0 : 0.2,
                        }}
                      >
                        <MaterialCommunityIcons
                          name="magnify-minus"
                          size={30}
                          color={Colours["grey-dark"]}
                        />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        if (chartGap === 15) {
                          setChartGap(30);
                          setUpdating(true);
                        } else if (chartGap === 30) {
                          setChartGap(60);
                          setUpdating(true);
                        }
                        if (hidden) {
                          setHidden(false);
                        }
                        setChartData([...chartData]);
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          opacity: chartGap !== 60 ? 1.0 : 0.2,
                        }}
                      >
                        <MaterialCommunityIcons
                          name="magnify-plus"
                          size={30}
                          color={Colours["grey-dark"]}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </View>
            {hidden !== true ? (
              !updating ? (
                Chart()
              ) : (
                <View style={{ width: "100%", height: 200 }}>
                  <ActivityIndicator size="large" />
                </View>
              )
            ) : null}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexWrap: "nowrap",
    elevation: 1,
    borderRadius: 5,
    borderTopLeftRadius: 25,
    borderColor: Colours["grey-light"],
    borderWidth: 0.7,
    shadowOffset: {
      height: 2,
      width: -2,
    },
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 10,
  },
  titleStyle: {
    color: "#000",
    paddingBottom: 12,
    fontSize: 24,
    fontFamily: "avenir-med",
  },
  subtitleStyle: {
    color: "#000",
    opacity: 0.5,
    fontSize: 14,
  },
});
