import {
  insertItemAnnotations,
  updateItemAnnotations,
  updateItemMarkedDates,
  insertItemMarkedDates,
  fetchMarkedDatesMonth,
  fetchMarkedDates,
  fetchAnnotationsMonth,
  fetchAnnotations,
  removeFromAnnotations,
  removeFromMarkedDates,
} from "../../helpers/db";

//function to create an annotation
export const createAnnotation = (
  id,
  title,
  startDate,
  endDate,
  trackers,
  colour,
  description,
  trend
) => {
  return async (dispatch) => {
    //convert optionData to correct format for storing in database
    const dbTrackers = await JSON.stringify(trackers);

    await insertItemAnnotations(
      id,
      title,
      startDate,
      endDate,
      dbTrackers,
      colour,
      description,
      trend
    );

    dispatch({
      type: "New_Annotation",
      id,
      title,
      startDate,
      endDate,
      trackers,
      colour,
      description,
      trend,
    });
  };
};

//function to update an annotation
export const updateAnnotation = (
  id,
  title,
  startDate,
  endDate,
  trackers,
  colour,
  description,
  trend
) => {
  return async (dispatch) => {
    //convert optionData to correct format for storing in database
    const dbTrackers = await JSON.stringify(trackers);

    await updateItemAnnotations(
      id,
      title,
      startDate,
      endDate,
      dbTrackers,
      colour,
      description,
      trend
    );

    dispatch({
      type: "Update_Annotation",
      id,
      title,
      startDate,
      endDate,
      trackers,
      colour,
      description,
      trend,
    });
  };
};

//function to create a marked date
export const createMarkedDate = (annoId, date, period) => {
  return async (dispatch) => {
    //convert optionData to correct format for storing in database
    const dbPeriod = await JSON.stringify(period);
    await insertItemMarkedDates(annoId, date, dbPeriod);

    dispatch({ type: "New_MarkedDate", annoId, date, period });
  };
};

export const createMarkedDates = (
  annoId,
  colour,
  startDate,
  endDate,
  betweenDates
) => {
  return async (dispatch) => {
    const firstPeriod = {
      startingDay: true,
      endingDay: false,
      color: colour,
      id: annoId,
    };
    const betweenPeriod = {
      startingDay: false,
      endingDay: false,
      color: colour,
      id: annoId,
    };
    const lastPeriod = {
      startingDay: false,
      endingDay: true,
      color: colour,
      id: annoId,
    };

    await insertItemMarkedDates(annoId, startDate, JSON.stringify(firstPeriod));
    await Promise.all(
      betweenDates.map(async (date) => {
        await insertItemMarkedDates(
          annoId,
          date,
          JSON.stringify(betweenPeriod)
        );
      })
    );
    await insertItemMarkedDates(annoId, endDate, JSON.stringify(lastPeriod));

    dispatch({
      type: "New_MarkedDates",
      annoId,
      startDate,
      firstPeriod,
      betweenDates,
      betweenPeriod,
      endDate,
      lastPeriod,
    });
  };
};

//function to update a marked date
//NOT USED
export const updateMarkedDate = (annoId, date, period) => {
  return async (dispatch) => {
    //convert optionData to correct format for storing in database

    const dbPeriod = await JSON.stringify(period);
    await updateItemMarkedDates(annoId, date, dbPeriod);

    dispatch({ type: "Update_MarkedDate", annoId, date, period });
  };
};

//function to update a marked date
export const updateMarkedDates = (
  annoId,
  startDate,
  firstPeriod,
  betweenDates,
  betweenPeriod,
  endDate,
  lastPeriod
) => {
  return async (dispatch) => {
    //convert optionData to correct format for storing in database

    const dbPeriod = await JSON.stringify(period);
    await updateItemMarkedDates(annoId, date, dbPeriod);

    dispatch({ type: "Update_MarkedDates", annoId, date, period });
  };
};

export const loadMarkedDatesMonth = (yearMonth) => {
  return async (dispatch) => {
    const dbResult = await fetchMarkedDatesMonth(yearMonth);

    dispatch({ type: "Set_MarkedDates", markedDates: dbResult.rows._array });
  };
};

export const loadMarkedDates = () => {
  return async (dispatch) => {
    const dbResult = await fetchMarkedDates();

    dispatch({ type: "Set_MarkedDates", markedDates: dbResult.rows._array });
  };
};

export const loadAnnotationsMonth = (yearMonth) => {
  return async (dispatch) => {
    const dbResult = await fetchAnnotationsMonth(yearMonth);

    dispatch({ type: "Set_Annotations", annotations: dbResult.rows._array });
  };
};

export const loadAnnotations = () => {
  return async (dispatch) => {
    const dbResult = await fetchAnnotations();

    dispatch({ type: "Set_Annotations", annotations: dbResult.rows._array });
  };
};

export const deleteAnnotation = (id, startDate, endDate, betweenDatesArray) => {
  return async (dispatch) => {
    await removeFromAnnotations(id);
    await removeFromMarkedDates(id);
    dispatch({
      type: "Delete_Annotation",
      data: { id },
    });
    dispatch({
      type: "Delete_MarkedDates",
      id,
      startDate,
      endDate,
      betweenDatesArray,
    });
  };
};

export const deleteMarkedDates = (
  id,
  startDate,
  endDate,
  betweenDatesArray
) => {
  return async (dispatch) => {
    await removeFromMarkedDates(id);
    dispatch({
      type: "Delete_MarkedDates",
      id,
      startDate,
      endDate,
      betweenDatesArray,
    });
  };
};
