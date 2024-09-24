import { FORMAT_NUMS } from "../../../../../../constants/modal";
import { CoinType } from "../../../../../../redux/slices/shopping-cart";
import { formatBySign, formatNums } from "../../../../../../utils";
import { DataTable } from "../cart-table";

export const transformDataTable = (cart: CoinType[]): DataTable[] => {
    return cart.map((coin) => {
      return {
        ...coin,
        price: formatBySign(formatNums(coin.price), FORMAT_NUMS.DOLLAR),
        totalPrice: formatBySign(formatNums(`${coin.totalPrice}`), FORMAT_NUMS.DOLLAR),
      };
    });
  };