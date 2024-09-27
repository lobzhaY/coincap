import { FORMAT_NUMS_SIGN, FORMAT_NUMS_WORD } from '../../../../../constants/modal';
import { OneCoinType } from '../../../../../types';
import { formatBySign, formatByWords, formatNums, getChangePercentColor } from '../../../../../utils';
import { OneCoinTableType } from '../types/types';

export const transformDataTable = (coins: OneCoinType[]): OneCoinTableType[] => {
  return coins.map(coin => ({
    changePercent24Hr: formatBySign(formatNums(coin.changePercent24Hr), FORMAT_NUMS_SIGN.DOLLAR),
    id: coin.id,
    marketCapUsd: formatBySign(formatByWords(coin.marketCapUsd, FORMAT_NUMS_WORD.BILLION), FORMAT_NUMS_SIGN.DOLLAR),
    name: coin.name,
    priceUsd: formatBySign(formatNums(coin.priceUsd), FORMAT_NUMS_SIGN.DOLLAR),
    rank: coin.rank,
    symbol: coin.symbol,
    vwap24Hr: formatBySign(formatNums(coin.vwap24Hr), FORMAT_NUMS_SIGN.DOLLAR),
  }));
};

export const getFieldStyle = (record: OneCoinTableType) => ({
  style: {
    color: getChangePercentColor(record.changePercent24Hr),
  },
});
