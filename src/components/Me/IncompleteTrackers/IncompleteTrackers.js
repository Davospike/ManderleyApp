import React from "react";
import { trackerToDataMap } from "../../../helpers/me";
import IncompleteTrackCard from "../../Me/TrackCard/IncompleteTrackCard";
import { calculateDayIndex } from "../../../helpers/date.js";

export default IncompleteTrackers = ({
  trackers,
  showToDo,
  setShowToDo,
  today,
  navigation,
  navigatedFrom,
  trackerData,
}) => {
  //function which finds and returns the incomplete trackers
  //find incomplete trackers for this day, and return them in incomplete track card components
  let incomplete = trackers
    .sort((x, y) => {
      if (x.name < y.name) {
        return -1;
      }
    })
    .filter((x) => {
      if (x.type === "Diary") {
        return false;
      } else {
        return true;
      }
    })
    .map((item, index) => {
      //only active trackers, and trackers visible on this day, can be shown
      if (
        item.active &&
        item.frequency[
          calculateDayIndex(new Date(Date.parse(today.date)).toDateString())
        ]
      ) {
        let data = trackerToDataMap(
          item.id,
          Object.values(trackerData ? trackerData : {})
        );
        //find incomplete trackers
        if (data.length) {
          data = data[0].data;
          return null;
        } else {
          data = {};
          if (item.type === "Tickbox") {
            const val = item.prompts.map((item) => {
              return null;
            });
            data = { value: val, comment: "" };
          } else if (item.type === "Scale") {
            data = { value: -1, comment: "" };
          } else if (item.type === "Numeric") {
            data = { value: "", comment: "" };
          }
          return (
            <IncompleteTrackCard
              key={index}
              item={item}
              data={data}
              date={today.date}
              navTo={navigatedFrom}
              navigation={navigation}
            />
          );
        }
      }
    });

  //show the to do header if there are some incomplete trackers
  if (incomplete.filter((obj) => obj).length > 0 && !showToDo) {
    setShowToDo(true);
    //otherwise do not show it
  } else if (incomplete.filter((obj) => obj).length === 0 && showToDo) {
    setShowToDo(false);
  }
  return incomplete;
};
