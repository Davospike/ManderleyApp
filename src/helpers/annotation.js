import { getLatestAnnotationId } from "./db.js";

export const newAnnoId = async () => {
  const dbResult = await getLatestAnnotationId();
  const topId = dbResult.rows._array[0]["IFNULL(MAX(id), 0)"];
  return topId + 1;
};
