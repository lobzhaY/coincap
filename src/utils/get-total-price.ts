import { CoinType } from "../redux/slices/shopping-cart";

export const getTotalPriceCoin = (quantity: number, price: string): number => {
    return quantity * parseFloat(price);
};

export const getTotalPrice = (coins: CoinType[]): number => {
   return coins.reduce((acc, curr) => {
        return acc + curr.totalPrice
    }, 0);
};

export const getPresentTotalDiff = (newPrice: number, oldPrice: number): number => {
    return oldPrice === 0 ? 0 : ((newPrice - oldPrice) / oldPrice ) * 100;
};

export const getPriceDiff = (newPrice: number, oldPrice: number): number => {
    return newPrice - oldPrice;
};