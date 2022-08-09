import {
  fetchTrackerData,
  fetchTrackers,
  insertItemTrackers,
  updateItemTrackerData,
  insertItemTrackerData,
  removeFromTrackerData,
  removeFromTrackers,
  updateItemTrackersDetails,
  updateItemTrackersActive,
  deleteItemTrackers,
  deleteItemTrackerData,
  deleteItemAnnotations,
  deleteItemMarkedDates,
  fetchTrackerDataMonth,
  updateTimestampTrackerData,
} from "../../helpers/db";

export const test = () => {
  return {
    type: "TEST",
  };
};

//action creator for showing or hiding tracker
export const hideShowTracker = (id, trackerTitle, active) => {
  return async (dispatch) => {
    updateItemTrackersActive(id, trackerTitle, active);
    dispatch({ type: `Hide_Show_Tracker`, data: { trackerTitle, active } });
  };
};

//action creator for deleting a tracker and associated data
export const deleteTrackerAndData = (trackerTitle, id) => {
  return async (dispatch) => {
    try {
      await removeFromTrackers(id);
      await removeFromTrackerData(id);
      dispatch({
        type: `Delete_Tracker_And_Data`,
        data: { trackerTitle, id },
      });
    } catch (err) {
      throw err;
    }
  };
};

//action creator for creating a tracker
export const createTracker = (trackerTitle, trackerType, optionData, id) => {
  return async (dispatch) => {
    try {
      //remove empty objects from array
      optionData.paramsArray = [
        ...optionData.paramsArray.filter(
            (object) => object.emoji && object.statement
        ),
      ];

      //convert optionData to correct format for storing in database
      const data = await JSON.stringify(optionData);
      await insertItemTrackers(id, trackerType, true, data, trackerTitle);

      dispatch({
        type: `New_Tracker_${trackerType}`,
        data: { trackerTitle, optionData },
        id,
      });
    } catch (err) {
      throw err;
    }
  };
};

//clear reset trackers and data
export const deleteTrackersAndData = () => {
  return async (dispatch) => {
    await deleteItemTrackers();
    await deleteItemTrackerData();
    await deleteItemAnnotations();
    await deleteItemMarkedDates();

    dispatch({
      type: `Reset_Trackers_And_TrackerData`,
    });
  };
};

//action creator for updating a tracker
export const updateTracker = (trackerTitle, trackerType, optionData, id) => {
  return async (dispatch) => {
    try {
      //remove empty objects from array
      optionData.paramsArray = [
        ...optionData.paramsArray.filter(
            (object) => object.emoji && object.statement
        ),
      ];

      //convert optionData to correct format for storing in database
      const data = await JSON.stringify(optionData);
      await updateItemTrackersDetails(id, trackerTitle, data);

      dispatch({
        type: `Update_Tracker_${trackerType}`,
        data: { trackerTitle, optionData, id },
      });
    } catch (err) {
      throw err;
    }
  };
};

//actoin creator for creating new tracker data
export const createTrackerData = (
    type,
    id,
    trackerTitle,
    data,
    datestamp,
    timestamp
) => {
  return async (dispatch) => {
    try {
      //convert data to correct format for storing in database
      const newData = await JSON.stringify(data);

      await insertItemTrackerData(id, type, datestamp, newData, timestamp);

      dispatch({
        type: `New_TrackerData_${type}`,
        id,
        trackerTitle,
        data,
        datestamp,
        timestamp,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

//actoin creator for updating tracker data
export const updateTrackerData = (
    type,
    id,
    trackerTitle,
    data,
    datestamp,
    timestamp
) => {
  return async (dispatch) => {
    try {
      //convert data to correct format for storing in database
      const newData = await JSON.stringify(data);
      await updateItemTrackerData(id, datestamp, newData);
      await updateTimestampTrackerData(id, datestamp, timestamp);

      dispatch({
        type: `New_TrackerData_${type}`,
        id,
        trackerTitle,
        data,
        datestamp,
        timestamp,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

//action creator for inserting the current date into the state
export const insertDay = (datestamp) => {
  return {
    type: "Insert_Day",
    datestamp,
  };
};

//action creator for loading trackers from the database
export const loadTrackers = () => {
  return async (dispatch) => {
    try {
      //fetch places and dispatch to update local redux state
      let dbResult = await fetchTrackers();
      //THERE SHOULD ALWAYS BE A DIARY AS IT@S ADDED WHEN THE ACCOUNT IS MADE
      await dispatch({ type: "Set_Trackers", trackers: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};

//action creator for loading tracker data from the database
export const loadTrackerData = (today) => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchTrackerData(today);

      dispatch({
        type: "Set_TrackerData",
        trackerData: dbResult.rows._array,
        date: today,
      });
    } catch (err) {
      throw err;
    }
  };
};

//action creator for loading tracker data from the database
export const loadTrackerDataMonth = (yearMonth) => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchTrackerDataMonth(yearMonth);
      dispatch({
        type: "Set_TrackerData_Month",
        trackerData: dbResult.rows._array,
        date: yearMonth,
      });
    } catch (err) {
      throw err;
    }
  };
};
