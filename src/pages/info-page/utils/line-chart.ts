import { FORMAT_NUMS } from "../../../constants/modal";
import { TABLE_COIN_TEXT } from "../../../constants/text";
import { HistoryCoinType, OneCoinType } from "../../../types";
import { formatBySign, formatByWords, formatNums } from "../../../utils";

export const formatYear = (date: string) => {
  const objDate = new Date(date);
  return `${objDate.getDate()}.${
    objDate.getMonth() + 1
  }.${objDate.getFullYear()}`;
};

export const createRechartsObj = (rechartsObj: HistoryCoinType[]) => {
  const arrTenDays = rechartsObj.slice(-30);
  const arr = arrTenDays.map((elem) => {
    return {
      name: formatYear(elem.date),
      price: formatNums(elem.priceUsd),
    };
  });
  return arr;
};

export const tickFormatCoords = (tick: string, index: number) => {
  const tickStep = 5;
  if (index % tickStep === 0) {
    return tick;
  }
  return "";
};

export const switchTableKey = (key: string) => {
  return TABLE_COIN_TEXT[key];
};

export const switchSing = (key: string, dataObj: OneCoinType) => {
  const valuesText = {
    supply: formatBySign(
      formatByWords(dataObj[key], FORMAT_NUMS.MILLION),
      FORMAT_NUMS.DOLLAR
    ),
    maxSupply: formatBySign(
      formatByWords(dataObj[key], FORMAT_NUMS.MILLION),
      FORMAT_NUMS.DOLLAR
    ),
    volumeUsd24Hr: formatBySign(
      formatByWords(dataObj[key], FORMAT_NUMS.BILLION),
      FORMAT_NUMS.DOLLAR
    ),
    changePercent24Hr: formatBySign(
      formatNums(dataObj[key]),
      FORMAT_NUMS.PERCENT
    ),
    vwap24Hr: formatBySign(formatNums(dataObj[key]), FORMAT_NUMS.DOLLAR),
    explorer: dataObj[key],
  };

  return valuesText[key];
};

export const createTableObj = (dataObj: OneCoinType) => {
  const objKeys = Object.keys(dataObj).filter(
    (elem) =>
      elem !== "id" &&
      elem !== "rank" &&
      elem !== "symbol" &&
      elem !== "name" &&
      elem !== "marketCapUsd" &&
      elem !== "priceUsd"
  );

  const dataVal = objKeys.map((elem) => {
    return {
      id: elem,
      key: switchTableKey(elem),
      value: switchSing(elem, dataObj),
    };
  });

  const dataTableVal = [
    {
      id: "priceUsd",
      key: "Price",
      value: formatBySign(formatNums(dataObj.priceUsd), FORMAT_NUMS.DOLLAR),
    },
    ...dataVal,
  ];

  return dataTableVal;
};
