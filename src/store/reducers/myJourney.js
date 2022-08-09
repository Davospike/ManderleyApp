import { AnnotationData, MarkedDates } from "../../schema/TrackerObjects";

//initial state
const initialState = {
  annotations: [],
  markedDates: {},
};

export default (state = initialState, action) => {
  const addNextIndex = (tList, period) => {
    let indexToAdd = "None";
    for (let count = 0; count < tList.length; count++) {
      const tColour = tList[count].color;

      if (tColour === "transparent") {
        indexToAdd = count;
        break;
      }
    }
    if (indexToAdd === "None") {
      tList.push(period);
    } else {
      tList[indexToAdd] = period;
    }
    return tList;
  };

  const sortDays1 = (dayList) => {
    //colList is periods array
    const dayListKeys = Object.keys(dayList);
    const firstKey = dayListKeys[0];
    if (!dayListKeys.length) return {};
    let prevDayList = dayList[firstKey].periods;
    let endDayList = { [firstKey]: dayList[firstKey] };

    Object.entries(dayList)
      .slice(1)
      .map((day, index) => {
        let currentDayList = day[1].periods;
        let tList = [];
        prevDayList.map((period) => {
          let id = period.id;
          if (currentDayList.some((period) => period.id === id)) {
            tList.push(currentDayList.find((period) => period.id === id));
            currentDayList = currentDayList.filter((period) => {
              return period.id !== id;
            });
          } else {
            tList.push({ color: "transparent" });
          }
        });
        currentDayList.map((period) => {
          tList = addNextIndex(tList, period);
        });
        let newDay = [...tList];
        endDayList[day[0]] = { periods: newDay };
        prevDayList = [...tList];
      });
    return endDayList;
  };

  switch (action.type) {
    case "New_Annotation": {
      const newAnnotations = [...state.annotations];
      newAnnotations.push(
        new AnnotationData(
          action.id,
          action.title,
          action.startDate,
          action.endDate,
          action.trackers,
          action.colour,
          action.description,
          action.trend
        )
      );
      const newState = {
        ...state,
        annotations: newAnnotations,
      };
      return newState;
    }
    case "Update_Annotation": {
      const newAnnotations = [...state.annotations];
      const yeeOldIndex = newAnnotations.findIndex(
        (anno) => anno.id === action.id
      );
      newAnnotations.splice(yeeOldIndex, 1);
      newAnnotations.push(
        new AnnotationData(
          action.id,
          action.title,
          action.startDate,
          action.endDate,
          action.trackers,
          action.colour,
          action.description,
          action.trend
        )
      );
      const newState = {
        ...state,
        annotations: newAnnotations,
      };
      return newState;
    }
    case "New_MarkedDate": {
      const newMarkedDates = state.markedDates[action.date]
        ? {
            periods: [...state.markedDates[action.date].periods, action.period],
            annoId: action.annoId,
          }
        : { periods: [action.period], annoId: action.annoId };
      const unsortedMarkedDates = {
        ...state.markedDates,
        [action.date]: newMarkedDates,
      };
      const sortedMarkedDates = sortDays1(unsortedMarkedDates);
      const newState = {
        ...state,
        markedDates: sortedMarkedDates,
      };
      return newState;
    }
    case "New_MarkedDates": {
      const newDates = {};
      newDates[action.startDate] = state.markedDates[action.startDate]
        ? {
            periods: [
              ...state.markedDates[action.startDate].periods,
              action.firstPeriod,
            ],
            annoId: action.annoId,
          }
        : { periods: [action.firstPeriod], annoId: action.annoId };
      newDates[action.endDate] = state.markedDates[action.endDate]
        ? {
            periods: [
              ...state.markedDates[action.endDate].periods,
              action.lastPeriod,
            ],
            annoId: action.annoId,
          }
        : { periods: [action.lastPeriod], annoId: action.annoId };
      action.betweenDates.map((date) => {
        const newMarkedDate = state.markedDates[date]
          ? {
              periods: [
                ...state.markedDates[date].periods,
                action.betweenPeriod,
              ],
              annoId: action.annoId,
            }
          : { periods: [action.betweenPeriod], annoId: action.annoId };
        newDates[date] = newMarkedDate;
      });
      const unsortedMarkedDates = {
        ...state.markedDates,
        ...newDates,
      };
      const sortedMarkedDates = sortDays1(unsortedMarkedDates);

      const newState = {
        ...state,
        markedDates: sortedMarkedDates,
      };
      return newState;
    }
    case "Update_MarkedDate": {
      //not used
      const id = action.annoId;
      const targetPeriods = [...state.markedDates[action.date].periods];
      const targetIndex = targetPeriods.findIndex(
        (markedDate) => markedDate.id === id
      );
      targetPeriods[targetIndex] = action.period;

      const newState = {
        ...state,
        markedDates: {
          ...state.markedDates,
          [action.date]: {
            ...state.markedDates[action.date],
            periods: targetPeriods,
          },
        },
      };

      return newState;
    }
    case "Reset_Trackers_And_TrackerData": {
      return initialState;
    }
    case "Set_MarkedDates": {
      let newDates = { ...state.markedDates };
      action.markedDates.map((markedDate) => {
        const period = JSON.parse(markedDate.period);
        if (
          newDates[markedDate.date] &&
          newDates[markedDate.date].periods.indexOf(period) === -1
        ) {
          //IF THE MARKED DATE ALREADY EXISTS DONT ADD IT
          let add = true;
          newDates[markedDate.date].periods.map((item) => {
            if (item.id === period.id) {
              add = false;
            }
          });
          if (add) {
            newDates[markedDate.date].periods.push(period);
            newDates[markedDate.date].annoId = markedDate.annotationId;
          }
        } else {
          newDates[markedDate.date] = new MarkedDates([period]);
          newDates[markedDate.date].annoId = markedDate.annotationId;
        }
      });

      newDates = sortDays1(newDates);
      const newState = {
        ...state,
        markedDates: newDates,
      };
      return newState;
    }
    case "Set_Annotations": {
      const newAnnotations = [...state.annotations];
      action.annotations.map((anno) => {
        const trackers = JSON.parse(anno.trackers);
        if (!newAnnotations.find((annot) => annot.id === anno.id)) {
          newAnnotations.push(
            new AnnotationData(
              anno.id,
              anno.title,
              anno.startDate,
              anno.endDate,
              trackers,
              anno.colour,
              anno.description,
              anno.trend
            )
          );
        }
      });
      const newState = {
        ...state,
        annotations: newAnnotations,
      };
      return newState;
    }
    case "Delete_Annotation": {
      let newAnnotations = state.annotations;
      newAnnotations = newAnnotations.filter((item) => {
        if (item.id === action.data.id) {
          return false;
        } else {
          return true;
        }
      });
      const newState = {
        ...state,
        annotations: newAnnotations,
      };
      return newState;
    }
    case "Delete_MarkedDates": {
      const { id, startDate, endDate, betweenDatesArray } = action;
      const allDates = [startDate, endDate, ...betweenDatesArray];
      let newMarkedDates = { ...state.markedDates };
      allDates.map((date) => {
        const targetPeriods = [...state.markedDates[date].periods];
        const targetIndex = targetPeriods.findIndex(
          (markedDate) => markedDate.id === id
        );
        targetPeriods.splice(targetIndex, 1);
        newMarkedDates = {
          ...newMarkedDates,
          [date]: { ...newMarkedDates[date], periods: targetPeriods },
        };
      });
      const newState = {
        ...state,
        markedDates: {
          ...state.markedDates,
          ...newMarkedDates,
        },
      };
      return newState;
    }
    case "Reset": {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
