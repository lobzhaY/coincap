import { FORMAT_NUMS_SIGN, FORMAT_NUMS_WORD } from '../../../constants/modal';
import { TABLE_COIN_TEXT } from '../../../constants/text';
import { HistoryCoinType, OneCoinType } from '../../../types';
import { formatBySign, formatByWords, formatNums } from '../../../utils';

export const formatYear = (date: string) => {
  const objDate = new Date(date);
  return `${objDate.getDate()}.${objDate.getMonth() + 1}.${objDate.getFullYear()}`;
};

export const createRechartsObj = (rechartsObj: HistoryCoinType[]) => {
  const arrTenDays = rechartsObj.slice(-30);
  const arr = arrTenDays.map(elem => {
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
  return '';
};

export const switchTableKey = (key: keyof typeof TABLE_COIN_TEXT) => {
  return TABLE_COIN_TEXT[key];
};

export const switchSing = (key: keyof typeof TABLE_COIN_TEXT, dataObj: OneCoinType) => {
  const valuesText = {
    supply: formatBySign(formatByWords(dataObj[key], FORMAT_NUMS_WORD.MILLION), FORMAT_NUMS_SIGN.DOLLAR),
    maxSupply: formatBySign(formatByWords(dataObj[key], FORMAT_NUMS_WORD.MILLION), FORMAT_NUMS_SIGN.DOLLAR),
    volumeUsd24Hr: formatBySign(formatByWords(dataObj[key], FORMAT_NUMS_WORD.BILLION), FORMAT_NUMS_SIGN.DOLLAR),
    changePercent24Hr: formatBySign(formatNums(dataObj[key]), FORMAT_NUMS_SIGN.PERCENT),
    vwap24Hr: formatBySign(formatNums(dataObj[key]), FORMAT_NUMS_SIGN.DOLLAR),
    explorer: dataObj[key],
  };

  return valuesText[key];
};

export const createTableObj = (dataObj: OneCoinType) => {
  const objKeys = Object.keys(dataObj).filter(elem => elem !== 'id' && elem !== 'rank' && elem !== 'symbol' && elem !== 'name' && elem !== 'marketCapUsd' && elem !== 'priceUsd');

  const dataVal = (objKeys as Array<keyof typeof TABLE_COIN_TEXT>).map(elem => {
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
      value: formatBySign(formatNums(dataObj.priceUsd), FORMAT_NUMS_SIGN.DOLLAR),
    },
    ...dataVal,
  ];

  return dataTableVal;
};
