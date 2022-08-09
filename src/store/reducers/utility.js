export const updateObject = (oldObject, newData) => {
  return {
    ...oldObject,
    ...newData,
  };
};
