import React from "react";
import CompleteTrackCard from "../TrackCard/CompleteTrackCard";
import { trackerToDataMap } from "../../../helpers/me";

export default CompleteTrackers = ({
  trackers,
  showCompleted,
  setShowCompleted,
  today,
  trackerData,
  navigation,
  navigatedFrom,
}) => {
  //function which finds and returns the complete trackers

  //find complete trackers for this day, and return them in complete track card components
  let complete = trackers
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
    //only active trackers, and trackers visible on this day, can be shown
    .map((item, index) => {
      if (item.active) {
        let data = trackerToDataMap(
          item.id,
          Object.values(trackerData ? trackerData : {})
        );
        //find complete trackers
        if (data.length) {
          data = { ...data[0].data, timestamp: data[0].timestamp };
          if (item.type === "Tickbox") {
            const val = item.prompts.map((item) => {
              return null;
            });
            data =
              data.value.length > 0 || data.comment
                ? data
                : { value: val, comment: "" };
          } else if (item.type === "Scale") {
            data =
              data.value || data.value === 0 || data.comment
                ? data
                : { value: -1, comment: "" };
          } else if (item.type === "Numeric") {
            data =
              data.value || data.comment ? data : { value: "", comment: "" };
          }

          return (
            <CompleteTrackCard
              key={index}
              item={item}
              data={data}
              date={today.date}
              navTo={navigatedFrom}
              navigation={navigation}
            />
          );
        } else {
          data = {};
          return null;
        }
      }
    });

  //show the completed header if there are some complete trackers
  if (complete.filter((obj) => obj).length > 0 && !showCompleted) {
    setShowCompleted(true);

    //otherwise do not show it
  } else if (complete.filter((obj) => obj).length === 0 && showCompleted) {
    setShowCompleted(false);
  }
  return complete;
};
