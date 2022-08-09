import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
  AsyncStorage,
} from "react-native";
import { TouchableOpacity as RNGHTouchableOpacity } from "react-native-gesture-handler";
import Colours from "../../../config/colours.json";
import { convertDateTypeCalendar } from "../../helpers/date.js";
import { CalendarList } from "react-native-calendars";
import { useSelector, useDispatch } from "react-redux";
import AnnotationCard from "../../components/MyJourney/AnnotationCard/AnnotationCard.js";
import * as myJourneyActions from "../../store/actions/myJourney";
import * as meActions from "../../store/actions/me";
import TextWrapper from "../../components/UI/Text/TextWrapper";
import BottomSheet from "reanimated-bottom-sheet";
import dateFormat from "dateformat";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FAB } from "react-native-paper";
import { logEvent, events } from "../../helpers/amplitude";

/**
 * @component
 * @param  {object} props
 */
const Landing = (props) => {
  const dispatch = useDispatch();

  const [showAlert, setShowAlert] = useState(false);

  //tracking visiting months and years
  const [monthYearTracker, setMonthYearTracker] = useState({});

  //selected dates object
  const [selectedDates, setSelectedDates] = useState({});

  //day
  const [day, setDay] = useState("");

  //home date
  const [homeDate, setHomeDate] = useState(new Date());

  //active month and year, initialised to the current month/year
  const [activeMonthYear, setActiveMonthYear] = useState(
    convertDateTypeCalendar(new Date()).substr(0, 7)
  );

  //trackers
  const trackers = useSelector(({ me }) => me.trackers);

  //annotations
  const annotations = useSelector(({ myJourney }) => myJourney.annotations);

  //marked dates
  const markedDates = useSelector(({ myJourney }) => myJourney.markedDates);

  //reference
  const bottomSheetRef = React.createRef();

  useEffect(() => {
    //function which fetches the data for the current month
    const fetchData = async () => {
      await dispatch(meActions.loadTrackerDataMonth(activeMonthYear));
      await dispatch(myJourneyActions.loadAnnotations());
      await dispatch(myJourneyActions.loadMarkedDates());
    };

    //fetch data if none cached
    if (!monthYearTracker[activeMonthYear]) {
      fetchData();
    }

    const newMonthTracker = { ...monthYearTracker };

    newMonthTracker[activeMonthYear] = true;
    setMonthYearTracker(newMonthTracker);
  }, [activeMonthYear]);

  useEffect(() => {
    //get from storage if an annotation has been made
    //if an anno hasn't been made, show the alert which shows how to make one
    helpAlert = async () => {
      const annoMade = await AsyncStorage.getItem("first_anno");
      if (annoMade !== "true") {
        setShowAlert(true);
      }
    };

    helpAlert();
  }, []);

  /**
   * Function which, given an array of tracker Ids, finds the corresponding tracker titles.
   * @param  {array} trackerTitles
   *
   * @returns {array} - Array of tracker titles.
   */
  const getTrackerTitles = (trackerTitles) => {
    const titles = [];
    trackers.map((tracker, index) => {
      if (trackerTitles.includes(tracker.id)) {
        titles.push(tracker.name);
      }
    });
    return titles;
  };

  /**
   * Function which selects a day when pressed on the calendar
   *
   * @param  {object} day
   *
   * @returns {void}
   */
  const onDayPress = (day) => {
    setDay(day);
    const selected = {
      [day.dateString]: { selected: true },
    };
    setSelectedDates({ ...selected, selectedDates });

    //move screen to bottom
    bottomSheetRef.current.snapTo(1);
  };

  /**
   * Function which updates the current month
   *
   * @param {array} month
   *
   * @returns {void}
   */
  const onMonthChange = (month) => {
    const firstMonth = month[month.length - 1];
    bottomSheetRef.current.snapTo(2);
    const newMonthYear = new Date(firstMonth.dateString)
      .toISOString()
      .substr(0, 7);
    setActiveMonthYear(newMonthYear);
  };

  /**
   * Function which generates the calendar dates
   *
   * @returns {object} - Object containing the calendar dates
   */
  const calendarDates = () => {
    const allDates = new Set([
      ...Object.keys(markedDates),
      ...Object.keys(selectedDates),
    ]);
    const allDatesArray = Array.from(allDates);
    const newCalendarDates = allDatesArray.reduce((res, markedDate) => {
      return Object.assign(res, {
        [markedDate]: {
          ...selectedDates[markedDate],
          ...markedDates[markedDate],
        },
      });
    }, {});

    return newCalendarDates;
  };

  // header UI
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  /**
   * Function which, when a date is pressed, navigates to the "Me" view for that day
   * @returns {void}
   */
  const dateOnPress = () => {
    logEvent(events.myJourney.myJourney_nav_view_day);
    props.navigation.navigate("ViewDay", {
      navFrom: "ViewDay",
      dateString: convertDateTypeCalendar(new Date(day.dateString)),
      dataBrowser:
        props.route.params && props.route.params.dataBrowser ? true : false,
      fromMessage:
        props.route.params && props.route.params.fromMessage ? true : false,
    });
  };

  // date UI
  const BSDate = () => (
    <View
      style={{
        padding: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <TextWrapper bold style={{ color: Colours.primary }}>
        {dateFormat(day.dateString, "dddd, dS mmmm")}
      </TextWrapper>
      <MaterialCommunityIcons
        name={"chevron-right"}
        size={30}
        color={Colours.primary}
      />
    </View>
  );

  // current month UK
  const CurrentMonthButton = () => (
    <FAB
      style={styles.fab}
      small
      icon="home"
      onPress={() => {
        setHomeDate(Date.now());
      }}
      color={"white"}
    />
  );

  const ShowAlert = () => {
    setShowAlert(false);
    return Alert.alert(
      "Help",
      "Click on the “information” icon in the header bar to learn about how to create an annotation. Click on the “plus” icon in the header bar to create your first annotation."
    );
  };

  return (
    <View style={styles.container}>
      {/* annotation card sheet */}
      {showAlert ? ShowAlert() : null}
      <BottomSheet
        initialSnap={2}
        ref={bottomSheetRef}
        snapPoints={["65%", "20%", 0]}
        renderHeader={renderHeader}
        renderContent={() => (
          <View
            style={{
              backgroundColor: Colours["background-grey"],
              minHeight: "100%",
            }}
          >
            {Platform.OS === "android" ? (
              <RNGHTouchableOpacity onPress={dateOnPress}>
                <BSDate />
              </RNGHTouchableOpacity>
            ) : (
              <TouchableOpacity onPress={dateOnPress}>
                <BSDate />
              </TouchableOpacity>
            )}
            <View style={styles.annotationCards}>
              {annotations
                .filter(
                  (anno) =>
                    anno.startDate.split("T")[0] <= day.dateString &&
                    anno.endDate.split("T")[0] >= day.dateString
                )
                .sort((x, y) => (x.startDate < y.startDate ? -1 : 1))
                .map((annotation, index) => {
                  const trackerTitles = getTrackerTitles(annotation.trackers);
                  return (
                    <AnnotationCard
                      key={index}
                      annotation={annotation}
                      trackerTitles={trackerTitles}
                      navigation={{
                        ...props.navigation,
                      }}
                      dataBrowser={
                        props.route.params && props.route.params.dataBrowser
                          ? true
                          : false
                      }
                      fromMessage={
                        props.route.params && props.route.params.fromMessage
                          ? true
                          : false
                      }
                    />
                  );
                })}
            </View>
          </View>
        )}
      />
      {/* calendar */}
      <CalendarList
        hideExtraDays
        current={homeDate}
        calendarHeight={500}
        scrollEnabled={true}
        onDayPress={onDayPress}
        pastScrollRange={24}
        futureScrollRange={24}
        onVisibleMonthsChange={onMonthChange}
        markedDates={calendarDates()}
        markingType="multi-period"
        theme={{
          textDayFontFamily: "avenir-reg",
          textMonthFontFamily: "avenir-demi-bold",
          textDayHeaderFontFamily: "avenir-reg",
          textDayFontWeight: "200",
          textDayHeaderFontWeight: "200",
          textDayFontSize: 14,
          textMonthFontSize: 14,
          textDayHeaderFontSize: 14,

          "stylesheet.day.basic": {
            text: {
              marginTop: 5,
            },
          },
        }}
      />
      <CurrentMonthButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colours["background-grey"],
    flex: 1,
  },
  fab: {
    position: "absolute",
    margin: 30,
    right: 0,
    top: Dimensions.get("window").height * 0.02,
    backgroundColor: Colours.primary,
  },
  annotationBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Dimensions.get("window").width * 0.02,
    paddingTop: 12,
    paddingBottom: 10,
    backgroundColor: "#fbfbfb",
    borderBottomColor: Colours["grey-light"],
    borderBottomWidth: 0.2,
    borderTopWidth: 0.1,
    borderTopColor: Colours["grey-light"],
    elevation: 2,
  },
  buttonCircle: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    backgroundColor: Colours.primary,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  annotationCards: {
    width: "100%",
    paddingVertical: "2%",
    paddingHorizontal: "2%",
  },
  buttonSpacing: {
    paddingHorizontal: 5,
  },
  header: {
    backgroundColor: "#f7f5eee8",
    shadowColor: "#000000",
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
});

export default Landing;
