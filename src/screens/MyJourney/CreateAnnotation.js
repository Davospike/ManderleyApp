import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CheckBoxEntryCard from "../../components/MyJourney/CreateAnnotation/CheckBoxEntry.js";
import ColourPickerCard from "../../components/MyJourney/CreateAnnotation/ColourPickerCard.js";
import RecordScreenButton from "../../components/Me/RecordScreenButton/RecordScreenButton";
import DateRangeCard from "../../components/MyJourney/CreateAnnotation/DateRangeCard";
import * as myJourneyActions from "../../store/actions/myJourney";
import { fetchTrackerDataDates } from "../../helpers/db.js";
import Colours from "../../../config/colours.json";
import { newAnnoId } from "../../helpers/annotation.js";
import AnnotationTrendCard from "../../components/MyJourney/CreateAnnotation/AnnotationTrendCard.js";
import { datesBetweenArray } from "../../helpers/date.js";
import AnnotationTitleCard from "../../components/MyJourney/CreateAnnotation/AnnotationTitleCard";
import AnnotationDescriptionCard from "../../components/MyJourney/CreateAnnotation/AnnotationDescriptionCard";
import { logEvent, events } from "../../helpers/amplitude.js";
import { AsyncStorage } from "react-native";

/**
 * @component
 * @param  {object} props
 */
const CreateAnnotation = (props) => {
  //trackers
  const trackers = useSelector(({ me }) => me.trackers);

  //tracker IDs over date period
  const [trackerIds, setTrackerIds] = useState([]);

  const dispatch = useDispatch();

  //get annotationID and all other data from params if available
  let { id } = props.route.params;
  const {
    annoTitle,
    startDate,
    endDate,
    annoBetweenDates,
    annoTrackers,
    annoColour,
    annoDescription,
    annoTrend,
  } = props.route.params;

  //title
  const [title, setTitle] = useState(annoTitle ? annoTitle : "");

  //description
  const [description, setDescription] = useState(
    annoDescription ? annoDescription : ""
  );

  //tracker data selected for annotation
  const [selected, setSelected] = useState(
    Array(trackers.length - 1).fill(false)
  );

  //colour
  const [colour, setColour] = useState(annoColour ? annoColour : "");

  //trend
  const [trend, setTrend] = useState(annoTrend !== undefined ? annoTrend : "0");

  //dates between start and end dates
  const [betweenDates, setBetweenDates] = useState(
    annoBetweenDates ? annoBetweenDates : props.route.params.betweenDates
  );

  //trackers
  const [myTrackers, setMyTrackers] = useState([]);

  //start date
  const [startingDate, setStartingDate] = useState(
    startDate
      ? startDate
      : new Date(new Date().setDate(new Date().getDate() - 7)).toISOString()
  );

  //end date
  const [endingDate, setEndingDate] = useState(
    endDate
      ? endDate
      : new Date(new Date().setDate(new Date().getDate() - 1)).toISOString()
  );

  //valid
  const [valid, setValid] = useState(false);

  /**
   * Function which validates an annotation, alerting the user if specified
   * @param  {boolean} alerts
   *
   * @returns {boolean} - Whether the annotation is valid.
   */
  const validateAnnotation = (alerts) => {
    //validate title
    const valTitle = () => {
      if (title.trim() === "") {
        if (alerts) {
          Alert.alert("Oops", "Annotation title cannot be left blank");
        }
      } else {
        return true;
      }
    };

    //validate colour
    const valColor = () => {
      return colour
        ? true
        : alerts
        ? Alert.alert("Oops", "The colour for this annotation must be selected")
        : false;
    };

    //validate tracker data for annotation has been selected
    const valSelected = () => {
      return selected.reduce((prev, curr) => prev | curr, 0)
        ? true
        : alerts
        ? Alert.alert(
            "Oops",
            "The tracker data must be selected. If you don't have any, return to Me and add some data."
          )
        : false;
    };

    if (valTitle()) {
      if (valColor()) {
        if (valSelected()) {
          return true;
        }
      }
    }

    return false;
  };

  //get the RELEVANT tracker IDs over those dates, i.e. trackers that can be included
  useEffect(() => {
    //fetch Ids that exist over the dates
    const fetchIds = async () => {
      const result = await fetchTrackerDataDates(startingDate, endingDate);
      setTrackerIds(
        result.rows._array
          .map((item) => {
            if (item.trackerId !== "1") {
              return item.trackerId;
            }
          })
          .filter((item) => item)
      );
    };
    fetchIds();
  }, [startingDate, endingDate]);

  //set between dates
  useEffect(() => {
    setBetweenDates(datesBetweenArray(startingDate, endingDate));
  }, [startingDate, endingDate]);

  //get relevant tracker names from relevant tracker Ids
  useEffect(() => {
    setMyTrackers(
      trackers.filter(
        (tracker) => trackerIds.includes(tracker.id) && tracker.name !== "Diary"
      )
    );
  }, [trackerIds]);

  //update selected trackerData array from relevant tracker names
  useEffect(() => {
    let annoTrackerNames = [];
    if (annoTrackers) {
      annoTrackers.map((id, index) => {
        let trackerName = trackers.find(
          (tracker) => tracker.id === id && tracker.name !== "Diary"
        );

        if (trackerName) {
          annoTrackerNames.push(trackerName.name);
        } else {
        }
      });
    }

    const newSelected = [];
    myTrackers.map((option, index) => {
      if (annoTrackerNames.includes(option.name)) {
        newSelected.push(true);
      } else {
        newSelected.push(false);
      }
    });
    setSelected(newSelected);
  }, [myTrackers]);

  //continuously validate annotation
  useEffect(() => {
    if (!valid && validateAnnotation(false)) {
      setValid(true);
    } else if (valid && !validateAnnotation(false)) {
      setValid(false);
    }
  }, [title, colour, selected]);

  /**
   * Function which creates marked dates for a new annotation
   *
   * @param  {string} annoId
   *
   * @returns {void}
   */
  const createMarkedDates = async (annoId) => {
    await dispatch(
      myJourneyActions.createMarkedDates(
        annoId,
        colour,
        startingDate.split("T")[0],
        endingDate.split("T")[0],
        betweenDates
      )
    );
  };
  /**
   * Function which updates marked dates for an existing annotation
   *
   * @param  {string} annoId
   *
   * @returns {void}
   */
  const updateMarkedDates = async (annoId) => {
    await dispatch(
      myJourneyActions.deleteMarkedDates(
        annoId,
        startDate.split("T")[0],
        endDate.split("T")[0],
        props.route.params.annoBetweenDates
      )
    );
    await dispatch(
      myJourneyActions.createMarkedDates(
        annoId,
        colour,
        startingDate.split("T")[0],
        endingDate.split("T")[0],
        betweenDates
      )
    );
  };

  const setFirstAnnoFlag = async () => {
    await AsyncStorage.setItem("first_anno", "true");
  };

  //function triggered when record button pressed
  const onRecordpress = async () => {
    //create annotation if there's no existing ID
    if (!id && validateAnnotation(true)) {
      logEvent(events.myJourney.myJourney_act_create_annotation);
      setFirstAnnoFlag();
      id = await newAnnoId();
      dispatch(
        myJourneyActions.createAnnotation(
          id,
          title,
          startingDate.split("T")[0],
          endingDate.split("T")[0],
          myTrackers
            .map((tracker, index) => (selected[index] ? tracker.id : null))
            .filter((elem) => typeof elem === "string"),
          colour,
          description,
          trend
        )
      );
      createMarkedDates(id);
      if (props.route.params.dataBrowser || props.route.params.selectAnno) {
        props.navigation.goBack();
      } else {
        props.navigation.navigate("Calendar", { clearSelected: true });
      }
      //otherwise update annotation
    } else if (validateAnnotation(true)) {
      logEvent(events.myJourney.myJourney_act_create_annotation, {
        edit: true,
      });

      dispatch(
        myJourneyActions.updateAnnotation(
          id,
          title,
          startingDate,
          endingDate,

          myTrackers
            .map((tracker, index) => (selected[index] ? tracker.id : null))
            .filter((elem) => typeof elem === "string"),
          colour,
          description,
          trend
        )
      );
      updateMarkedDates(id);
      if (props.route.params.dataBrowser || props.route.params.selectAnno) {
        props.navigation.goBack();
      } else {
        props.navigation.navigate("Calendar", { clearSelected: true });
      }
    }
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: Colours["background-grey"],
      }}
    >
      <ScrollView>
        <View style={styles.container}>
          <AnnotationTitleCard onInputChange={setTitle} value={title} />
          <AnnotationDescriptionCard
            value={description}
            onInputChange={setDescription}
          />

          <DateRangeCard
            startDateChange={(date) => {
              setStartingDate(date);
            }}
            endDateChange={(date) => {
              setEndingDate(date);
            }}
            edit={startDate ? true : false}
            startDate={startDate ? startingDate : null}
            endDate={endDate ? endingDate : null}
          />
          {myTrackers.length !== 0 ? (
            <CheckBoxEntryCard
              title="Include tracker data"
              optionArray={myTrackers.map((item) => item.name)}
              selectedArray={selected}
              onInputChange={setSelected}
            />
          ) : (
            <CheckBoxEntryCard
              title="No tracker data to include"
              optionArray={myTrackers.map((item) => item.name)}
              selectedArray={selected}
              onInputChange={setSelected}
            />
          )}
          <AnnotationTrendCard
            title="Annotation trend"
            selected={trend}
            setTrend={setTrend}
          />
          <ColourPickerCard
            title="Colour"
            subtitle="How it will appear on the calendar"
            colour={colour}
            setColour={setColour}
            fromAnnotation
          />
        </View>
      </ScrollView>
      <RecordScreenButton onPress={() => onRecordpress()} valid={valid} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: Colours["background-grey"],
    flex: 1,
    alignItems: "center",
  },
});

export default CreateAnnotation;
