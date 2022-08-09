/**
 * Function which filters an array of trackers for a specific Id
 *
 * @param  {string} id
 * @param  {object[]} trackerData
 *
 * @returns {object[]} - The filtered array
 */
export const trackerToDataMap = (id, trackerData) => {
  return trackerData.filter((data) => data.id === id);
};
