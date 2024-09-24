import { OneCoinType } from "../../../../../types";
import { addDollarSign, formatNums, formatToBillion } from "../../../../../utils/format-nums";
import { OneCoinTableType } from "../types/types";

export const transformDataTable = (coins: OneCoinType[]): OneCoinTableType[] => {
    return coins.map((coin) => ({
      changePercent24Hr: addDollarSign(formatNums(coin.changePercent24Hr)),
      id: coin.id,
      marketCapUsd: addDollarSign(formatToBillion(coin.marketCapUsd)),
      name: coin.name,
      priceUsd: addDollarSign(formatNums(coin.priceUsd)),
      rank: coin.rank,
      symbol: coin.symbol,
      vwap24Hr: addDollarSign(formatNums(coin.vwap24Hr)),
    }));
  };