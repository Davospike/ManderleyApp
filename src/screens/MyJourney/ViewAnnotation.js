import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { convertDateDDMMYYYY } from "../../helpers/date.js";
import LineChart from "../../components/MyJourney/Charts/LineChart";
import { optionsObject } from "../../../config/trends";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import Colours from "../../../config/colours.json";
import { useSelector } from "react-redux";
import { fetchTrackerDataDatesData } from "../../helpers/db.js";
import TextWrapper from "../../components/UI/Text/TextWrapper.js";
import Intuicon from "../../components/Icon/Intuicon";

/**
 * @component
 * @param  {object} props
 */
const ViewAnnotation = (props) => {
  //extract start date, end date and target trackers from annotation
  const anno = props.route.params.annotation;
  const { startDate, endDate, trackers } = anno;

  //tracker titles
  const trackerTitles = props.route.params.trackerTitles;

  //tracker data
  const [trackerData, setTrackerData] = useState(
    props.route.params.trackerData ? props.route.params.trackerData : []
  );

  //all trackers
  const allTrackers = useSelector(({ me }) => me.trackers);

  //annotation trackers
  const [myTrackers, setMyTrackers] = useState(
    props.route.params.myTrackers ? props.route.params.myTrackers : []
  );

  const showStartDate = convertDateDDMMYYYY(new Date(anno.startDate));
  const showEndDate = convertDateDDMMYYYY(new Date(anno.endDate));

  //fetching and assigning annotation data
  useEffect(() => {
    //fetch tracker data for annotation period
    const fetchData = async () => {
      const result = await fetchTrackerDataDatesData(startDate, endDate);
      const relevantData = result.rows._array
        .filter(
          ({ trackerId }) =>
            trackers.includes(trackerId) &&
            allTrackers.find((item) => item.id === trackerId)
        )
        .map((item) => {
          return { ...item, data: JSON.parse(item.data) };
        });
      props.navigation.setParams({ trackerData: relevantData });
      setTrackerData(relevantData);
    };

    //assign data to user trackers
    const assignTrackerTypesAndIds = () => {
      let newMyTrackers = [];

      trackerTitles.map((title) => {
        let myTracker = allTrackers.find((tracker) => tracker.name === title);
        newMyTrackers.push(myTracker);
      });
      props.navigation.setParams({ myTrackers: newMyTrackers });
      setMyTrackers(newMyTrackers);
    };

    if (!props.route.params.trackerData || !props.route.params.myTrackers) {
      fetchData();
      assignTrackerTypesAndIds();
    }
  }, []);

  /**
   * Function which renders a line chart for tracker data linked to the annotation
   *
   * @returns {component}
   */
  const RenderCharts = () => {
    return Object.keys(anno.trackers).map((trackerId, index) => {
      if (myTrackers[index]) {
        return (
          <LineChart
            defaultShow={false}
            key={index}
            units={myTrackers[index].units}
            trackerType={myTrackers[index].type}
            chartData={trackerData.filter(
              (data) => data.trackerId === myTrackers[index].id
            )}
            paramsArray={myTrackers[index].paramsArray}
            trackerTitle={trackerTitles[trackerId]}
            startDate={anno.startDate}
            endDate={anno.endDate}
          />
        );
      }
    });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
      contentContainerStyle={{
        width: "100%",
        paddingVertical: "2%",
        paddingHorizontal: "2%",
      }}
    >
      {myTrackers.length && trackerData.length ? <RenderCharts /> : null}
      <View
        style={[styles.container, props.style, { borderTopColor: anno.colour }]}
      >
        <View style={styles.majorCard}>
          <Text numberOfLines={1} style={styles.titleStyle}>
            {anno.title}
          </Text>

          <Text numberOfLines={1} style={styles.subtitleStyle}>
            {`${showStartDate}-${showEndDate}`}
          </Text>
          <Text style={styles.subtitleStyle}>{anno.description}</Text>
        </View>
        <View style={styles.minorCard}>
          <Intuicon
            name={optionsObject[anno.trend].icon}
            size={70}
            color={anno.colour}
          />
          <TextWrapper reg>{optionsObject[anno.trend].text}</TextWrapper>
        </View>
      </View>
      {anno.trackers.length === 0 ? (
        <View style={styles.noDataWarn}>
          <TextWrapper reg>There is no data within this annotation</TextWrapper>
        </View>
      ) : (
        <View style={styles.lightbulbContainer}>
          <View style={styles.lightbulbIcon}>
            <FontAwesome5 name="lightbulb" size={38} color={Colours.primary} />
          </View>
          <Text style={styles.lightbulbText}>
            You can click on the graphs to interact with them.
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexWrap: "nowrap",
    elevation: 1,
    borderTopWidth: 10,
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
  },
  majorCard: {
    flex: 1.75,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
  },
  minorCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  noDataWarn: {
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  titleStyle: {
    color: "#000",
    paddingBottom: 12,
    fontSize: 24,
    fontFamily: "avenir-med",
  },
  subtitleStyle: {
    fontFamily: "avenir-reg",
    color: "#000",
    opacity: 0.5,
    fontSize: 14,
  },
  lightbulbContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 20,
  },
  lightbulbText: {
    width: "60%",
    color: Colours["grey-dark"],
    fontFamily: "avenir-reg",
  },
  lightbulbIcon: {
    marginRight: "5%",
  },
});

export default ViewAnnotation;
