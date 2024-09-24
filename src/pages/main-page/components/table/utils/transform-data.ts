import { FORMAT_NUMS } from "../../../../../constants/modal";
import { OneCoinType } from "../../../../../types";
import { formatBySign, formatByWords, formatNums } from "../../../../../utils";
import { OneCoinTableType } from "../types/types";

export const transformDataTable = (coins: OneCoinType[]): OneCoinTableType[] => {
    return coins.map((coin) => ({
      changePercent24Hr: formatBySign(formatNums(coin.changePercent24Hr), FORMAT_NUMS.DOLLAR),
      id: coin.id,
      marketCapUsd: formatBySign(formatByWords(coin.marketCapUsd, FORMAT_NUMS.BILLION), FORMAT_NUMS.DOLLAR),
      name: coin.name,
      priceUsd: formatBySign(formatNums(coin.priceUsd), FORMAT_NUMS.DOLLAR),
      rank: coin.rank,
      symbol: coin.symbol,
      vwap24Hr: formatBySign(formatNums(coin.vwap24Hr), FORMAT_NUMS.DOLLAR),
    }));
  };