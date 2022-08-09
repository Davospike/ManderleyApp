const noFeeling = {
  text: "No feeling",
  icon: "track_look-at-example",
};
const proud = {
  text: "Proud",
  icon: "Emoticons-for-trends-11",
};
const worried = {
  text: "Worried",
  icon: "Emoticons-for-trends-1",
};
const unsure = {
  text: "Unsure",
  icon: "Emoticons-for-trends-12",
};

export const optionsArray = [
  { id: "0", ...noFeeling },
  { id: "1", ...proud },
  { id: "2", ...worried },
  { id: "3", ...unsure },
];

export const optionsObject = {
  0: { ...noFeeling },
  1: { ...proud },
  2: { ...worried },
  3: { ...unsure },
};
