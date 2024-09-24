import { FORMAT_NUMS } from "../../../constants/modal";
import { HistoryCoinType, OneCoinType } from "../../../types";
import { formatBySign, formatByWords, formatNums } from "../../../utils";

export const formatYear = (date: string) => {
  const objDate = new Date(date);
  return `${objDate.getDate()}.${
    objDate.getMonth() + 1
  }.${objDate.getFullYear()}`;
};

export const createRechartsObj = (
  rechartsObj: HistoryCoinType[]) => {
  const arrTenDays = rechartsObj.slice(-30);
  const arr = arrTenDays.map((elem) => {
    return {
      name: formatYear(elem.date),
      price: formatNums(elem.priceUsd),
    };
  });
  return arr;
};

export const tickFormatX = (tick: string, index: number) => {
  const tickStep = 5;
  if (index % tickStep === 0) {
    return tick;
  }
  return "";
};

export const tickFormatY = (tick: string, index: number) => {
  const tickStep = 5;
  if (index % tickStep === 0) {
    return tick;
  }
  return "";
};

export const switchTableKey = (key: string) => {
    let stringKey = '';
    switch (key) {
      case 'supply':
        stringKey = 'Available supply for trading';
        break;
      case 'maxSupply':
        stringKey = 'Total quantity of asset issued';
        break;
      case 'volumeUsd24Hr':
        stringKey = 'Quantity of trading volume over the last 24h';
        break;
      case 'changePercent24Hr':
        stringKey = 'The direction and value change in the last 24h';
        break;
      case 'vwap24Hr':
        stringKey = 'Volume Weighted Average Price in the last 24h';
        break;
      case 'explorer':
        stringKey = 'Explorer';
        break;
      default:
        stringKey = key;
    }
    return stringKey;
  };

export const switchSing = (key: string, dataObj: OneCoinType) => {
    let stringValue = '';
    switch (key) {
      case 'supply':
        stringValue = formatBySign(formatByWords(dataObj[key], FORMAT_NUMS.MILLION), FORMAT_NUMS.DOLLAR);
        break;
      case 'maxSupply':
        stringValue = formatBySign(formatByWords(dataObj[key], FORMAT_NUMS.MILLION), FORMAT_NUMS.DOLLAR);
        break;
      case 'volumeUsd24Hr':
        stringValue = formatBySign(formatByWords(dataObj[key], FORMAT_NUMS.BILLION), FORMAT_NUMS.DOLLAR);
        break;
      case 'changePercent24Hr':
        stringValue = formatBySign(formatNums(dataObj[key]), FORMAT_NUMS.PERCENT);
        break;
      case 'vwap24Hr':
        stringValue =formatBySign(formatNums(dataObj[key]), FORMAT_NUMS.DOLLAR);
        break;
      case 'explorer':
        stringValue = dataObj[key];
        break;
      default:
        return stringValue;
    }
    return stringValue;
  }

  export  const createTableObj = (dataObj: OneCoinType) => {

    const objKeys = Object.keys(dataObj).filter(
      (elem) =>
        elem !== 'id' &&
        elem !== 'rank' &&
        elem !== 'symbol' &&
        elem !== 'name' &&
        elem !== 'marketCapUsd' &&
        elem !== 'priceUsd'
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
        id: 'priceUsd',
        key: 'Price',
        value: formatBySign(formatNums(dataObj.priceUsd), FORMAT_NUMS.DOLLAR),
      },
      ...dataVal,
    ];

    return dataTableVal;
  }