import * as _ from "lodash";

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

export const cleanString = (value: string | undefined | null) => {
  if (value === undefined || value === null || value === "=") {
    return "";
  }
  return typeof value === 'string' ? value.trim() : String(value).trim();
};

export const tryJsonParse = (value: string) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};
