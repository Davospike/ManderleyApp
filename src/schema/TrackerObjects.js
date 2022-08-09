//HELPER FUNCTIONS
typeOf = (obj) => {
  return {}.toString
    .call(obj)
    .match(/\s(\w+)/)[1]
    .toLowerCase();
};
//Helper functions
checkTypes = (argType) => {
  for (let i = 0; i < argType.length; i++) {
    if (typeOf(argType[i].arg) != argType[i].type) {
      throw new TypeError(
        "param " + argType[i].arg + " must be of type " + argType[i].type
      );
    }
  }
};

export const TrackerParam = (emoji, statement) => {
  checkTypes([
    { arg: emoji, type: "string" },
    { arg: statement, type: "string" },
  ]);
  return { emoji, statement };
};

export const TrackerScale = (
  id,
  name,
  paramsArray,
  size,
  frequency,
  active,
  colour
) => {
  checkTypes([
    { arg: id, type: "string" },
    { arg: name, type: "string" },
    { arg: paramsArray, type: "array" },
    { arg: size, type: "number" },
    { arg: frequency, type: "array" },
    { arg: active, type: "boolean" },
    { arg: colour, type: "string" },
  ]);
  return {
    type: "Scale",
    active,
    name,
    paramsArray,
    size,
    frequency,
    id,
    colour,
  };
};

export const TrackerDataScale = (
  id,
  trackerName,
  data,
  datestamp,
  timestamp
) => {
  checkTypes([
    { arg: id, type: "string" },
    { arg: trackerName, type: "string" },
    { arg: data, type: "object" },
    { arg: data.value, type: "number" },
    { arg: data.comment, type: "string" },
    { arg: datestamp, type: "string" },
    { arg: timestamp, type: "string" },
  ]);
  return {
    id,
    trackerName,
    type: "Scale",
    data,
    datestamp,
    timestamp,
  };
};

export const TrackerNumeric = (id, name, units, frequency, active, colour) => {
  checkTypes([
    { arg: id, type: "string" },
    { arg: name, type: "string" },
    { arg: units, type: "string" },
    { arg: frequency, type: "array" },
    { arg: active, type: "boolean" },
    { arg: colour, type: "string" },
  ]);
  return {
    type: "Numeric",
    active,
    name,
    units,
    frequency,
    id,
    colour,
  };
};

export const TrackerDataNumeric = (
  id,
  trackerName,
  data,
  datestamp,
  timestamp
) => {
  checkTypes([
    { arg: id, type: "string" },
    { arg: trackerName, type: "string" },
    { arg: data, type: "object" },
    { arg: data.value, type: "string" },
    { arg: data.comment, type: "string" },
    { arg: datestamp, type: "string" },
    { arg: timestamp, type: "string" },
  ]);
  return { id, trackerName, type: "Numeric", data, datestamp, timestamp };
};

export const TrackerTickBox = (
  id,
  name,
  prompts,
  frequency,
  active,
  colour,
  tickboxFreq
) => {
  checkTypes([
    { arg: id, type: "string" },
    { arg: name, type: "string" },
    { arg: prompts, type: "array" },
    { arg: frequency, type: "array" },
    { arg: active, type: "boolean" },
    { arg: colour, type: "string" },
    { arg: tickboxFreq, type: "number" },
  ]);
  return {
    type: "Tickbox",
    active,
    name,
    frequency,
    id,
    prompts,
    colour,
    tickboxFreq,
  };
};

export const TrackerDataTickbox = (
  id,
  trackerName,
  data,
  datestamp,
  timestamp
) => {
  checkTypes([
    { arg: id, type: "string" },
    { arg: trackerName, type: "string" },
    { arg: data, type: "object" },
    // { arg: data.value, type: "boolean" },
    { arg: data.comment, type: "string" },
    { arg: datestamp, type: "string" },
    { arg: timestamp, type: "string" },
  ]);
  return { id, trackerName, type: "Tickbox", data, datestamp, timestamp };
};

export const TrackerDiary = (active = true) => {
  return {
    type: "Diary",
    active,
    name: "Diary",
    id: "1",
    frequency: [true, true, true, true, true, true, true],
  };
};

export const TrackerDataDiary = (
  id,
  trackerName,
  data,
  datestamp,
  timestamp
) => {
  checkTypes([
    { arg: id, type: "string" },
    { arg: trackerName, type: "string" },
    { arg: data, type: "object" },
    { arg: data.value, type: "string" },
    { arg: data.image, type: "string" },
    { arg: datestamp, type: "string" },
    { arg: timestamp, type: "string" },
  ]);
  return { id, trackerName, type: "Diary", data, datestamp, timestamp };
};

export const AnnotationData = (
  id,
  title,
  startDate,
  endDate,
  trackers,
  colour,
  description,
  trend
) => {
  checkTypes([
    { arg: id, type: "number" },
    { arg: title, type: "string" },
    { arg: startDate, type: "string" },
    { arg: endDate, type: "string" },
    { arg: trackers, type: "array" },
    { arg: colour, type: "string" },
    { arg: description, type: "string" },
    { arg: trend, type: "string" },
  ]);
  return {
    id,
    title,
    startDate,
    endDate,
    trackers,
    colour,
    description,
    trend,
  };
};

export const MarkedDates = (periods) => {
  checkTypes([{ arg: periods, type: "array" }]);
  return { periods };
};

export const MarkedDate = (annoId, date, period) => {
  checkTypes([
    { arg: annoId, type: "number" },
    { arg: date, type: "string" },
    { arg: period, type: "object" },
  ]);
  return { annoId, date, period };
};
