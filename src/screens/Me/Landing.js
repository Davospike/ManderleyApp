import React, { useEffect, useState } from "react";
import { StyleSheet, View, ActivityIndicator, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as meActions from "../../store/actions/me";
import Colours from "../../../config/colours.json";
import DateBox from "./../../components/Me/DateBox/DateBox.js";
import DiaryCard from "./../../components/Me/TrackCard/Diary/Diary.js";
import { convertDateTypeCalendar } from "../../helpers/date.js";
import TextWrapper from "../../components/UI/Text/TextWrapper";
import CompleteTrackers from "../../components/Me/CompleteTrackers/CompleteTrackers";
import IncompleteTrackers from "../../components/Me/IncompleteTrackers/IncompleteTrackers";
import CreateTrackerTip from "../../components/Me/CreateTrackerTip/CreateTrackerTip";
import { trackerToDataMap } from "../../helpers/me";

/**
 * @component
 * @param  {object} props
 */
const Landing = (props) => {
  const dispatch = useDispatch();

  //trackers
  const trackers = useSelector(({ me }) => me.trackers);
  /**
   * Function which returns either the date passed into the props, or the current date
   *
   * @returns {void}
   */
  const todayOrPropDate = () => {
    if (props.route.params) {
      if (props.route.params.dateString) {
        return props.route.params.dateString;
      }
    } else {
      return convertDateTypeCalendar(new Date());
    }
  };

  /**
   * Function which returns the screen the component was visited from
   *
   * @returns {string} - Screen name of previous component
   */
  const navigatedFrom = () => {
    if (props.route.params) {
      if (props.route.params.navFrom) {
        return props.route.params.navFrom;
      }
    } else {
      return "Landing";
    }
  };

  const getDiaryData = () => {
    let diaryTracker = trackers.filter((tracker) => {
      return tracker.type === "Diary";
    });
    diaryTracker = diaryTracker[0];
    let diaryData = [];
    try {
      diaryData = trackerToDataMap(
        diaryTracker.id,
        Object.values(trackerData ? trackerData : {})
      );
    } catch {}
    if (diaryData.length) {
      diaryData = diaryData[0].data;
      return diaryData.value || diaryData.image
        ? diaryData
        : { value: "", image: "" };
    } else {
      return { value: "", image: "" };
    }
  };

  const getDiaryID = () => {
    let diaryTracker = trackers.filter((tracker) => {
      return tracker.type === "Diary";
    });
    return diaryTracker[0].id;
  };

  //tracker data
  const trackerData = useSelector(
    ({ me }) => me.trackerData[todayOrPropDate()]
  );

  //whether trackes have loaded
  const [isTrackers, setIsTrackers] = useState(false);

  //whether to do's header should be shown
  const [showToDo, setShowToDo] = useState(true);

  //whether complete header should be shown
  const [showCompleted, setShowCompleted] = useState(true);

  //relevant date
  const today = {
    date: todayOrPropDate(),
  };

  //load relevant data
  useEffect(() => {
    const fetchData = async () => {
      if (!trackerData) {
        await dispatch(meActions.insertDay(today.date));
        await dispatch(meActions.loadTrackerData(today.date));
      }
    };
    fetchData();
  }, [trackerData]);

  //load trackers
  useEffect(() => {
    const initTrackers = async () => {
      if (!trackers.length) {
        setIsTrackers(false);
        await dispatch(meActions.loadTrackers());
      } else {
        setIsTrackers(true);
      }
    };
    initTrackers();
  }, [trackers]);

  //condition for trackers loaded
  if (isTrackers && trackers.length) {
    //extract diary data

    return (
      <View style={styles.container}>
        <DateBox
          // logic for navigating to previous day (backwards)
          date={today.date}
          navigation={props.navigation}
          route={props.route}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* diary */}
          <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
            <DiaryCard
              date={today.date}
              id={getDiaryID()}
              data={getDiaryData()}
              navTo={navigatedFrom()}
              backgroundColor={"white"}
              {...props}
            />
          </View>

          {showToDo && (
            <TextWrapper
              bold
              style={{ ...styles.toDoTodayText, opacity: showToDo ? 1 : 0 }}
            >
              To do today
            </TextWrapper>
          )}
          <IncompleteTrackers
            trackers={trackers}
            showToDo={showToDo}
            setShowToDo={setShowToDo}
            today={today}
            trackerData={trackerData}
            navigation={props.navigation}
            navigatedFrom={navigatedFrom()}
          />
          <TextWrapper
            bold
            style={{
              ...styles.completedTodayText,
              opacity: showCompleted ? 1 : 0,
            }}
          >
            Completed today
          </TextWrapper>
          <CompleteTrackers
            trackers={trackers}
            showCompleted={showCompleted}
            setShowCompleted={setShowCompleted}
            today={today}
            trackerData={trackerData}
            navigation={props.navigation}
            navigatedFrom={navigatedFrom()}
          />
          {!showCompleted &&
            trackers.findIndex((tracker) => parseInt(tracker.id) >= 5) ===
              -1 && <CreateTrackerTip />}
        </ScrollView>
      </View>
    );
    // condition for trackers not loaded
  } else {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours["background-grey"],
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  completedTodayText: {
    fontSize: 14,
    borderColor: Colours["grey-light"],
    paddingLeft: 10,
    borderWidth: 0.25,
    backgroundColor: "white",
    elevation: 3,
    paddingVertical: 10,
  },
  toDoTodayText: {
    fontSize: 14,
    borderColor: Colours["grey-light"],
    paddingLeft: 10,
    borderWidth: 0.25,
    backgroundColor: "white",
    elevation: 3,
    paddingVertical: 10,
  },
});

export default Landing;
