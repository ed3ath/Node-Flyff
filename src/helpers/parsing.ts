import _ from "lodash";

export const tryParseInt = (value: string) => {
  try {
    return !_.isNaN(parseInt(value)) ? parseInt(value) : 0;
  } catch {
    return 0;
  }
};

export const tryParseFloat = (value: string) => {
  try {
    return !_.isNaN(parseFloat(value)) ? parseFloat(value) : 0;
  } catch {
    return 0;
  }
};

export const cleanString = (value: string) => {
  return value === "=" ? "" : value;
};

export const tryJsonParse = (value: string) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};
