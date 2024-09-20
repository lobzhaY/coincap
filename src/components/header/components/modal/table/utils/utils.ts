import { CoinType } from "../../../../../../redux/slices/shopping-cart";
import { addDollarSign, formatNums } from "../../../../../../utils/format-nums";
import { DataTable } from "../cart-table";

export const transformDataTable = (cart: CoinType[]): DataTable[] => {
    return cart.map((coin) => {
      return {
        ...coin,
        price: addDollarSign(formatNums(coin.price)),
        totalPrice: addDollarSign(formatNums(`${coin.totalPrice}`)),
      };
    });
  };