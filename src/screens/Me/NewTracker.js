import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, ScrollView, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as meActions from "../../store/actions/me";
import TrackerTypeCard from "../../components/Me/NewTracker/TrackerTypeCard";
import NumberOptionsCard from "../../components/Me/NewTracker/NumberOptionsCard";
import TickboxOptionsCard from "../../components/Me/NewTracker/TickboxOptionsCard";
import ScaleOptionsCard from "../../components/Me/NewTracker/ScaleOptionsCard";
import RecordScreenButton from "../../components/Me/RecordScreenButton/RecordScreenButton";
import TrackerTitleCard from "../../components/Me/NewTracker/TrackerTitleCard";
import TrackerFrequencyCard from "../../components/Me/NewTracker/TrackerFrequencyCard";
import Colours from "../../../config/colours.json";
import ColourPickerCard from "../../components/MyJourney/CreateAnnotation/ColourPickerCard";
import { logEvent, events } from "../../helpers/amplitude";

//object containing the option data for creating a new tracker
const optionData = {
  units: "",
  paramsArray: [
    { emoji: null, statement: null },
    { emoji: null, statement: null },
    { emoji: null, statement: null },
    { emoji: null, statement: null },
    { emoji: null, statement: null },
  ],

  frequency: null,
  prompts: ["1", "2", "3"],
  tickboxFreq: 1,
  colour: "",
};

const NewTracker = (props) => {
  //The id for the new tracker
  const id = useSelector(({ me }) => me.trackersCount);

  //current tracker names
  const trackerNames = useSelector(({ me }) =>
    me.trackers.map((item) => {
      return item.name.toLowerCase();
    })
  );

  const dispatch = useDispatch();

  //tracker title
  const [trackerTitle, setTrackerTitle] = useState("");

  //tracker type
  const [trackerType, setTrackerType] = useState("");

  //tracker frequency
  const [frequency, setFrequency] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  //tracker colour
  const [colour, setColour] = useState("");

  //options complete (for editing purposes)
  const [tickboxOptionsComplete, setTickboxOptionsComplete] = useState(
    props.route.params.edit ? true : false
  );
  const [scaleOptionsComplete, setScaleOptionsComplete] = useState(
    props.route.params.edit ? true : false
  );
  const [numberOptionsComplete, setNumberOptionsComplete] = useState(
    props.route.params.edit ? true : false
  );

  //validation
  const [tickButtonValid, setTickButtonValid] = useState(false);

  //intitialise state if editing
  useEffect(() => {
    optionData.prompts = ["1", "2", "3"];
    if (props.route.params && props.route.params.data) {
      if (props.route.params.data.units)
        optionData.units = props.route.params.data.units;
      if (props.route.params.data.prompts)
        optionData.prompts = props.route.params.data.prompts;
      if (props.route.params.data.tickboxFreq)
        optionData.tickboxFreq = props.route.params.data.tickboxFreq;
      if (props.route.params.data.paramsArray)
        optionData.paramsArray = [...props.route.params.data.paramsArray];
      if (props.route.params.data.frequency)
        setFrequency([...props.route.params.data.frequency]);
      if (props.route.params.data.name)
        setTrackerTitle(props.route.params.data.name);
      if (props.route.params.data.type)
        setTrackerType(props.route.params.data.type);
      if (props.route.params.data.colour)
        setColour(props.route.params.data.colour);
      optionData.colour = props.route.params.data.colour;
    }
  }, []);

  //validate tracker whenever the tracker configuration changes
  useEffect(() => {
    const valid = validateTracker(false);
    if (valid) {
      if (tickButtonValid === false) {
        setTickButtonValid(true);
      }
    } else {
      if (tickButtonValid === true) {
        setTickButtonValid(false);
      }
    }
  }, [
    frequency,
    trackerType,
    trackerTitle,
    numberOptionsComplete,
    tickboxOptionsComplete,
    scaleOptionsComplete,
    colour,
  ]);

  /**
   * This function will validate a tracker based on its configuration in local state, alerting the user if specified
   * @param  {boolean} alerts
   *
   * @returns {boolean} - Whether the tracker is valid
   */
  const validateTracker = (alerts) => {
    //validate title
    const valTitle = () => {
      if (trackerTitle.trim() === "") {
        if (alerts) {
          Alert.alert("Oops", "Tracker title cannot be left blank");
        }
      } else if (
        props.route.params.edit !== true &&
        trackerNames.includes(trackerTitle.toLocaleLowerCase())
      ) {
        if (alerts) {
          Alert.alert(
            "Oops",
            `A tracker named '${trackerTitle}' already exists`
          );
        }
      } else {
        return true;
      }
    };

    //validate type
    const valType = () => {
      return trackerType !== ""
        ? true
        : alerts
        ? Alert.alert("Oops", "Traker type must be selected")
        : false;
    };

    //validate units for a numeric tracker
    const valUnits = () => {
      return numberOptionsComplete;
    };

    //validate categories for a scale tracker
    const valParamsArray = () => {
      let reduced = optionData.paramsArray;
      reduced = reduced.filter((object) => {
        return object.emoji && object.statement;
      });
      return reduced.length >= 2
        ? true
        : alerts
        ? Alert.alert("Oops", "Two or more Scale Options must be completed")
        : false;
    };

    //validate frequency
    const valFrequency = () => {
      let reduced = frequency;
      reduced = reduced.filter((item) => {
        return item;
      });
      return reduced.length >= 1
        ? true
        : alerts
        ? Alert.alert("Oops", "The frequency for this tracker must be selected")
        : false;
    };

    //validate the categories are full for a scale tracker
    const valFullCategories = () => {
      let tempParams = optionData.paramsArray.filter((obj) => {
        if (obj.statement && obj.emoji) {
          return false;
        }
        if (!obj.statement && !obj.emoji) {
          return false;
        }
        return true;
      });
      return !tempParams.length
        ? true
        : alerts
        ? Alert.alert(
            "Oops",
            "There are incomplete categories. Make sure all categories have an icon and a statement."
          )
        : false;
    };

    //validate colour of tracker
    const valColor = () => {
      return colour
        ? true
        : alerts
        ? Alert.alert("Oops", "The colour for this tracker must be selected")
        : false;
    };

    if (valTitle() && valType() && valFrequency() && valColor()) {
      switch (trackerType) {
        case "Tickbox":
          return true;
        case "Numeric":
          return valUnits() ? true : false;
        case "Scale":
          if (valParamsArray() && valFullCategories()) {
            return true;
          }
          return false;
      }
    } else {
      return false;
    }
  };

  //function which is executed when the tick is pressed
  const submitHandler = () => {
    //calculate index of day (for comparing to frequency)
    const dateIndex = props.route.params.edit
      ? (new Date(Date.parse(props.route.params.data.date)).getDay() - 1) % 7
      : null;

    optionData.frequency = [...frequency];

    if (trackerType !== "Tickbox") {
      optionData.prompts = [];
      optionData.tickboxFreq = null;
    } else {
      optionData.prompts = optionData.prompts.slice(0, optionData.tickboxFreq);
    }

    //check tracker is valid
    if (validateTracker(true)) {
      //condition for creating tracker
      if (!props.route.params.data) {
        dispatch(
          meActions.createTracker(
            trackerTitle.trim(),
            trackerType,
            {
              ...optionData,
              units: optionData.units ? optionData.units.trim() : "",
              colour: colour,
            },
            (id + 1).toString()
          )
        );
        Alert.alert(
          "Success",
          `"${trackerTitle.trim()}" tracker has been created.`
        );
        logEvent(events.me.me_act_create_tracker, {
          type: trackerType,
          edit: props.route.params.edit ? true : false,
        });
        navigate(dateIndex);
        //condition for updating tracker
      } else {
        let newOptionData = {
          ...optionData,
          units: optionData.units ? optionData.units.trim() : "",
          colour: colour,
        };

        dispatch(
          meActions.updateTracker(
            trackerTitle,
            trackerType,
            newOptionData,
            props.route.params.data.id
          )
        );
        Alert.alert(
          "Success",
          `"${trackerTitle.trim()}" tracker has been updated.`
        );
        logEvent(events.me.me_act_create_tracker, { type: trackerType });
        navigate(dateIndex);
      }
    }
  };

  //navigation function, which depends on the dateIndex (if frequency is switched off for the current day, it should return to the Me landing screen)
  const navigate = (dateIndex) => {
    //case for going back to the previous screen
    if (!props.route.params.returnPath) {
      props.navigation.goBack();
      //case for current day frequency being set to false
    } else if (
      props.route.params.edit &&
      optionData.frequency[dateIndex] === false
    ) {
      props.navigation.navigate(props.route.params.frequencyOverwriteRetPath);
      //case for numeric
    } else if (
      props.route.params.returnPath === "Numeric" ||
      props.route.params.returnPath === "ViewNumeric"
    ) {
      props.navigation.navigate(props.route.params.returnPath, {
        title: trackerTitle,
        number: props.route.params.data.number,
        units: optionData.units.trim(),
        colour: colour,
        comment: props.route.params.data.comment,
        frequency: optionData.frequency,
        date: props.route.params.data.date,
        type: "Numeric",
        id: props.route.params.data.id,
        navTo: props.route.params.data.navTo,
      });
      //case for tickbox
    } else if (
      props.route.params.returnPath === "Tickbox" ||
      props.route.params.returnPath === "ViewTickbox"
    ) {
      props.navigation.navigate(props.route.params.returnPath, {
        title: trackerTitle,
        colour: colour,
        comment: props.route.params.data.comment,
        frequency: optionData.frequency,
        date: props.route.params.data.date,
        type: "Tickbox",
        id: props.route.params.data.id,
        navTo: props.route.params.data.navTo,
        data: props.route.params.data.data,
        prompts: optionData.prompts,
        tickboxFreq: optionData.tickboxFreq,
      });
      //case for scale
    } else if (
      props.route.params.returnPath === "Scale" ||
      props.route.params.returnPath === "ViewScale"
    ) {
      props.navigation.navigate(props.route.params.returnPath, {
        title: trackerTitle,
        colour: colour,
        comment: props.route.params.data.comment,
        frequency: optionData.frequency,
        date: props.route.params.data.date,
        type: "Scale",
        id: props.route.params.data.id,
        navTo: props.route.params.data.navTo,
        selected: props.route.params.data.selected,
        paramsArray: optionData.paramsArray,
      });
    }
  };

  //scrollview reference (for scrolling to emoji keyboard when selecting emoji)
  const scrollRef = useRef();

  //target reference (for emoji keyboard)
  const target = useRef();

  //function to scroll from top of scrollview to emoji keyboard
  const scrollTime = () => {
    target.current.measure((dont, need, value) => {
      scrollRef.current.scrollTo({ x: 0, y: value });
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        style={{ height: 2000, flex: 1 }}
        contentContainerStyle={{ alignItems: "center" }}
        nestedScrollEnabled={true}
      >
        {/* tracker title */}
        <TrackerTitleCard
          onInputChange={setTrackerTitle}
          value={trackerTitle}
          edit={props.route.params.edit}
        />

        {/* tracker type */}
        <TrackerTypeCard
          updateTrackerType={setTrackerType}
          optionData={optionData}
          disabled={props.route.params.edit ? true : false}
          value={props.route.params.edit ? props.route.params.data.type : ""}
          edit={props.route.params.edit}
        />
        {/* case for numeric tracker type */}
        {trackerType === "Numeric" ? (
          <NumberOptionsCard
            optionData={optionData}
            onComplete={(value) => {
              setNumberOptionsComplete(value);
            }}
            edit={props.route.params.edit}
          />
        ) : //case for tickbox tracker type
        trackerType === "Tickbox" ? (
          <TickboxOptionsCard
            optionData={optionData}
            onComplete={(value) => {
              setTickboxOptionsComplete(value);
            }}
            edit={props.route.params.edit}
          />
        ) : //case for scale tracker type
        trackerType === "Scale" ? (
          <View style={{ width: "100%", alignItems: "center" }}>
            <ScaleOptionsCard
              ref={target}
              scrollTime={scrollTime}
              optionData={optionData}
              edit={props.route.params.edit}
              onComplete={(value) => {
                setScaleOptionsComplete(value);
              }}
              edit={props.route.params.edit}
            />
          </View>
        ) : trackerType === "" ? (
          <View
            style={{
              paddingTop: "1%",
              width: "89%",
            }}
          ></View>
        ) : null}
        {/* frequency card */}
        {trackerType ? (
          <TrackerFrequencyCard
            frequency={frequency}
            setFrequency={setFrequency}
            edit={props.route.params.edit}
          />
        ) : null}
        {/* colour picker  */}
        {trackerType ? (
          <ColourPickerCard
            title="Colour"
            colour={colour}
            setColour={(col) => {
              setColour(col);
            }}
            subtitle={"How it will appear in the Me section"}
            titleStyle={{
              color: Colours["grey-dark"],
              paddingBottom: 2,
              fontSize: 18,
            }}
            edit={props.route.params.edit}
          />
        ) : null}
      </ScrollView>
      {/* create tracker button */}
      <RecordScreenButton
        onPress={() => submitHandler()}
        valid={tickButtonValid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: Colours["background-grey"],
    flex: 1,
  },
});

export default NewTracker;
