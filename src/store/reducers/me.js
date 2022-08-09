// data models
import {
  TrackerScale,
  TrackerTickBox,
  TrackerNumeric,
  TrackerDiary,
  TrackerDataNumeric,
  TrackerDataScale,
  TrackerDataTickbox,
  TrackerDataDiary,
} from "../../schema/TrackerObjects";

import { combineReducers } from 'redux'

// database function
import { insertItemTrackers } from "../../helpers/db";

//initial state
const initialState = {
  trackers: [],
  trackersCount: 0,
  trackerData: {},
};

//function to retrieve a tracker and its index
const getTracker = (trackers, action) => {
  let foundIndex = 0;
  let array = trackers
    .filter((item, index) => {
      if (item.name === action.data.trackerTitle) {
        foundIndex = index;
        return true;
      } else {
        return false;
      }
    })
    .map((item) => {
      return { item, index: foundIndex };
    });
  return array[0];
};

export default (state = initialState, action) => {
  switch (action.type) {
    //case for deleting a tracker and associated data
    case "Delete_Tracker_And_Data": {
      //delete the trackers
      const newTrackers = [...state.trackers];
      const index = state.trackers.findIndex(
        (tracker) => tracker.id === action.data.id
      );
      newTrackers.splice(index, 1);

      //delete the associated data
      const newTrackerData = { ...state.trackerData };
      Object.keys(newTrackerData).map((day) => {
        Object.keys(newTrackerData[day]).map((key) => {
          if (newTrackerData[day][key].id === action.data.id) {
            delete newTrackerData[day][key];
          }
        });
      });

      const newState = {
        ...state,
        trackers: newTrackers,
        trackerData: newTrackerData,
      };
      return newState;
    }

    //case for hiding or showing a tracker
    case "Hide_Show_Tracker": {
      const newTrackers = [...state.trackers];
      const itemAndIndex = getTracker(newTrackers, action);
      newTrackers.splice(itemAndIndex.index, 1);
      newTrackers.push({ ...itemAndIndex.item, active: action.data.active });
      const newState = {
        ...state,
        trackers: newTrackers,
      };
      return newState;
    }
    case "New_Tracker_Numeric": {
      const newTrackers = [...state.trackers];
      newTrackers.push(
        new TrackerNumeric(
          action.id,
          action.data.trackerTitle,
          action.data.optionData.units,
          [...action.data.optionData.frequency],
          true,
          action.data.optionData.colour
        )
      );
      const newState = {
        ...state,
        trackers: newTrackers,
        trackersCount: Number(action.id),
      };
      return newState;
    }
    case "New_Tracker_Scale": {
      const newTrackers = [...state.trackers];
      newTrackers.push(
        new TrackerScale(
          action.id,
          action.data.trackerTitle,
          [...action.data.optionData.paramsArray],
          [...action.data.optionData.paramsArray].length,
          [...action.data.optionData.frequency],
          true,
          action.data.optionData.colour
        )
      );
      const newState = {
        ...state,
        trackers: newTrackers,
        trackersCount: Number(action.id),
      };
      return newState;
    }
    case "New_Tracker_Tickbox": {
      const newTrackers = [...state.trackers];
      newTrackers.push(
        new TrackerTickBox(
          action.id,
          action.data.trackerTitle,
          action.data.optionData.prompts,
          [...action.data.optionData.frequency],
          true,
          action.data.optionData.colour,
          action.data.optionData.tickboxFreq
        )
      );
      const newState = {
        ...state,
        trackers: newTrackers,
        trackersCount: Number(action.id),
      };
      return newState;
    }

    case "Update_Tracker_Numeric": {
      const index = state.trackers.findIndex(
        (tracker) => tracker.id === action.data.id
      );
      const newTrackers = [...state.trackers];
      const updatedTracker = new TrackerNumeric(
        action.data.id,
        action.data.trackerTitle,
        action.data.optionData.units,
        [...action.data.optionData.frequency],
        true,
        action.data.optionData.colour
      );
      newTrackers[index] = updatedTracker;
      const newState = {
        ...state,
        trackers: newTrackers,
      };
      return newState;
    }

    case "Update_Tracker_Scale": {
      const index = state.trackers.findIndex(
        (tracker) => tracker.id === action.data.id
      );
      const newTrackers = [...state.trackers];
      const updatedTracker = new TrackerScale(
        action.data.id,
        action.data.trackerTitle,
        [...action.data.optionData.paramsArray],
        action.data.optionData.paramsArray.length,
        [...action.data.optionData.frequency],
        true,
        action.data.optionData.colour
      );
      newTrackers[index] = updatedTracker;
      const newState = {
        ...state,
        trackers: newTrackers,
      };
      return newState;
    }

    case "Update_Tracker_Tickbox": {
      const index = state.trackers.findIndex(
        (tracker) => tracker.id === action.data.id
      );
      const newTrackers = [...state.trackers];

      const updatedTracker = new TrackerTickBox(
        action.data.id,
        action.data.trackerTitle,
        action.data.optionData.prompts,
        [...action.data.optionData.frequency],
        true,
        action.data.optionData.colour,
        action.data.optionData.tickboxFreq
      );
      newTrackers[index] = updatedTracker;
      const newState = {
        ...state,
        trackers: newTrackers,
      };
      return newState;
    }

    case "New_TrackerData_Numeric": {
      const newData = new TrackerDataNumeric(
        action.id,
        action.trackerTitle,
        action.data,
        action.datestamp,
        action.timestamp
      );
      const newState = {
        ...state,
        trackerData: {
          ...state.trackerData,
          [action.datestamp]: {
            ...state.trackerData[action.datestamp],
            [action.id]: newData,
          },
        },
      };
      return newState;
    }

    case "New_TrackerData_Scale": {
      const newData = new TrackerDataScale(
        action.id,
        action.trackerTitle,
        action.data,
        action.datestamp,
        action.timestamp
      );
      const newState = {
        ...state,
        trackerData: {
          ...state.trackerData,
          [action.datestamp]: {
            ...state.trackerData[action.datestamp],
            [action.id]: newData,
          },
        },
      };
      return newState;
    }

    case "New_TrackerData_Tickbox": {
      const newData = new TrackerDataTickbox(
        action.id,
        action.trackerTitle,
        action.data,
        action.datestamp,
        action.timestamp
      );
      const newState = {
        ...state,
        trackerData: {
          ...state.trackerData,
          [action.datestamp]: {
            ...state.trackerData[action.datestamp],
            [action.id]: newData,
          },
        },
      };
      return newState;
    }

    case "New_TrackerData_Diary": {
      const newData = new TrackerDataDiary(
        action.id,
        action.trackerTitle,
        action.data,
        action.datestamp,
        action.timestamp
      );
      const newState = {
        ...state,
        trackerData: {
          ...state.trackerData,
          [action.datestamp]: {
            ...state.trackerData[action.datestamp],
            [action.id]: newData,
          },
        },
      };
      return newState;
    }

    case "Insert_Day": {
      const newState = {
        ...state,
        trackerData: {
          ...state.trackerData,
          [action.datestamp]: {},
        },
      };
      return newState;
    }

    case "Set_Trackers": {
      let newTrackers = [];
      newTrackers = action.trackers.map((tracker) => {
        let data = {};
        {
          tracker.data ? (data = JSON.parse(tracker.data)) : null;
        }

        switch (tracker.trackerType) {
          case "Numeric":
            return new TrackerNumeric(
              tracker.trackerId,
              tracker.name,
              data.units,
              data.frequency,
              tracker.active === 1,
              data.colour
            );
          case "Scale":
            return new TrackerScale(
              tracker.trackerId,
              tracker.name,
              data.paramsArray,
              data.paramsArray.length,
              data.frequency,
              tracker.active === 1,
              data.colour
            );
          case "Tickbox":
            return new TrackerTickBox(
              tracker.trackerId,
              tracker.name,
              data.prompts,
              data.frequency,
              tracker.active === 1,
              data.colour,
              data.tickboxFreq
            );
          default: {
            return new TrackerDiary(tracker.active === 1);
          }
        }
      });

      const newState = {
        ...state,
        trackers: newTrackers,
        trackersCount: newTrackers.length,
      };
      return newState;
    }
    case "Set_TrackerData": {
      const finalTrackerData = {
        ...state.trackerData,
        [action.date]: {},
      };
      action.trackerData.map((trackerData) => {
        const data = JSON.parse(trackerData.data);
        switch (trackerData.trackerType) {
          case "Numeric": {
            finalTrackerData[action.date][
              trackerData.trackerId
            ] = new TrackerDataNumeric(
              trackerData.trackerId,
              "doesn't matter",
              data,
              trackerData.date,
              trackerData.timestamp
            );
            break;
          }
          case "Scale": {
            finalTrackerData[action.date][
              trackerData.trackerId
            ] = new TrackerDataScale(
              trackerData.trackerId,
              "doesn't matter",
              data,
              trackerData.date,
              trackerData.timestamp
            );
            break;
          }
          case "Tickbox": {
            finalTrackerData[action.date][
              trackerData.trackerId
            ] = new TrackerDataTickbox(
              trackerData.trackerId,
              "doesn't matter",
              data,
              trackerData.date,
              trackerData.timestamp
            );
            break;
          }
          default: {
            finalTrackerData[action.date][
              trackerData.trackerId
            ] = new TrackerDataDiary(
              trackerData.trackerId,
              "doesn't matter",
              data,
              trackerData.date,
              trackerData.timestamp
            );
            break;
          }
        }
      });
      const newState = {
        ...state,
        trackerData: {
          ...state.trackerData,
          [action.date]: finalTrackerData[action.date],
        },
      };
      return newState;
    }

    case "Set_TrackerData_Month": {
      const finalTrackerData = { ...state.trackerData };
      action.trackerData.map((trackerData) => {
        finalTrackerData[trackerData.date] = {};
      });
      action.trackerData.map((trackerData) => {
        const data = JSON.parse(trackerData.data);
        switch (trackerData.trackerType) {
          case "Numeric": {
            finalTrackerData[trackerData.date][
              trackerData.trackerId
            ] = new TrackerDataNumeric(
              trackerData.trackerId,
              "doesn't matter",
              data,
              trackerData.date,
              trackerData.timestamp
            );
            break;
          }
          case "Scale": {
            finalTrackerData[trackerData.date][
              trackerData.trackerId
            ] = new TrackerDataScale(
              trackerData.trackerId,
              "doesn't matter",
              data,
              trackerData.date,
              trackerData.timestamp
            );
            break;
          }
          case "Tickbox": {
            finalTrackerData[trackerData.date][
              trackerData.trackerId
            ] = new TrackerDataTickbox(
              trackerData.trackerId,
              "doesn't matter",
              data,
              trackerData.date,
              trackerData.timestamp
            );
            break;
          }
          default: {
            finalTrackerData[trackerData.date][
              trackerData.trackerId
            ] = new TrackerDataDiary(
              trackerData.trackerId,
              "doesn't matter",
              data,
              trackerData.date,
              trackerData.timestamp
            );
            break;
          }
        }
      });
      const newState = {
        ...state,
        trackerData: {
          ...state.trackerData,
          ...finalTrackerData,
        },
      };
      return newState;
    }

    case "Reset_Trackers_And_TrackerData": {
      const newTrackers = [];
      newTrackers.push(new TrackerDiary(true));
      newTrackers.push(
        new TrackerNumeric(
          "2",
          "Sleep",
          "Hours",
          [true, true, true, true, true, true, true],
          true,
          "#49DCB1"
        ),
        new TrackerTickBox(
          "3",
          "Exercise",
          ["Have you exercised today?", "2", "3"],
          [true, true, true, true, true, true, true],
          true,
          "#7A89FB",
          1
        ),
        new TrackerScale(
          "4",
          "Mood",
          [
            { emoji: "😃", statement: "Happy" },
            { emoji: "😌", statement: "Okay" },
            { emoji: "😢", statement: "Sad" },
          ],
          3,
          [true, true, true, true, true, true, true],
          true,
          "#F49D6E"
        )
      );

      insertItemTrackers("1", "Diary", true, "", "Diary");
      insertItemTrackers(
        "2",
        "Numeric",
        true,
        JSON.stringify({
          units: "Hours",
          frequency: [true, true, true, true, true, true, true],
          colour: "#868686",
        }),
        "Sleep"
      );
      insertItemTrackers(
        "3",
        "Tickbox",
        true,
        JSON.stringify({
          prompts: ["Have you exercised today?", "2", "3"],
          frequency: [true, true, true, true, true, true, true],
          colour: "#7A89FB",
          tickboxFreq: 1,
        }),
        "Exercise"
      );
      insertItemTrackers(
        "4",
        "Scale",
        true,
        JSON.stringify({
          paramsArray: [
            { emoji: "😃", statement: "Happy" },
            { emoji: "😌", statement: "Okay" },
            { emoji: "😢", statement: "Sad" },
          ],
          frequency: [true, true, true, true, true, true, true],
          colour: "#F49D6E",
        }),
        "Mood"
      );

      const newState = { ...initialState, trackers: newTrackers };

      return newState;
    }
    case "Reset": {
      return initialState;
    }
    default:
      return state;
  }
};
