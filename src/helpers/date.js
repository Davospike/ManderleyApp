import React from "react";

export const calculateDayIndex = (date) => {
  if (date.includes("Mon")) return 0;
  if (date.includes("Tue")) return 1;
  if (date.includes("Wed")) return 2;
  if (date.includes("Thu")) return 3;
  if (date.includes("Fri")) return 4;
  if (date.includes("Sat")) return 5;
  if (date.includes("Sun")) return 6;
};

export const convertDateTypeCalendar = (date) => {
  let converted = date.toISOString().split("T")[0];
  return converted;
};

export const convertDateDDMMYYYY = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const converted = `${day}/${month}/${year}`;
  return converted;
};

//given two date strings, create an array which contains date strings for all the days in betweeen
export const datesBetweenArray = (startString, endString) => {
  let dates = [];
  const startDate = new Date(startString);
  startDate.setDate(startDate.getDate() + 1);
  const stopDate = new Date(endString);
  while (startDate < stopDate) {
    dates.push(convertDateTypeCalendar(new Date(startDate.getTime())));
    startDate.setDate(startDate.getDate() + 1);
  }
  return dates;
};

export const getCurrentTimestamp = () => {
  let dateSplit = new Date().toLocaleString().split(" ");

  return dateSplit[dateSplit.length - 2].substr(0, 5);
};
