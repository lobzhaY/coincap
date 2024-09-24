import { FORMAT_NUMS, formatNumsSignData, formatNumsWordData } from "../constants/modal";

export const formatNums = (str: string): string => {
  return parseFloat(str).toFixed(2);
};

export const formatByWords = (str: string, key: FORMAT_NUMS): string => {
  return `${(parseFloat(str) / formatNumsWordData[key].wordNums).toFixed(2)} ${formatNumsWordData[key].wordString}`;
};

export const formatBySign = (str: string, key: FORMAT_NUMS): string => {
  return `${str} ${formatNumsSignData[key]}`;
}

export const addProcentSign = (str: string): string => {
  return `${str} %`;
};
