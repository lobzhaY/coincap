import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTotalPrice, getTotalPriceCoin } from '../../utils/get-total-price';
import { OneCoinType } from '../../types';

export type CoinType = {
  id: string;
  name: string;
  quantity: number;
  price: string;
  totalPrice: number;
};

type ActionCoinType = {
  id: string;
  name: string;
  quantity: number;
  price: string;
}

type InitialCoinState = {
  cart: CoinType[];
  totalCartPrice: number;
  totalPriceDiff: number;
};

const initialState: InitialCoinState = {
  cart: [],
  totalCartPrice: 0,
  totalPriceDiff: 0,
};

const shoppingSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addCoinToCart: (state, action: PayloadAction<ActionCoinType>) => {
      const activeCoin = state.cart.find((coin) => coin.id === action.payload.id);
      if (activeCoin) {
        activeCoin.quantity += action.payload.quantity;
        activeCoin.totalPrice = getTotalPriceCoin(activeCoin.quantity, activeCoin.price);
      } else {
        state.cart.push({...action.payload, totalPrice: getTotalPriceCoin(action.payload.quantity, action.payload.price)});
      }
      state.totalCartPrice = getTotalPrice(state.cart);
    },
    deleteCoinFromCart: (state, action: PayloadAction<string>) => {
      const filterCart = state.cart.filter((coin) => coin.id !== action.payload);
      state.cart = filterCart;
      state.totalCartPrice = getTotalPrice(filterCart);
    },
    compareTotalPrice: (state, action) => {
      state.totalPriceDiff = action.payload;
    },
    synhronizeCoinsPrice: (state, action: PayloadAction<OneCoinType[]>) => {
      state.cart.forEach((coin) => {
        const activeCoin = action.payload.find((actionCoin) => actionCoin.id === coin.id)
        coin.price = activeCoin?.priceUsd as string
        coin.totalPrice = getTotalPriceCoin(coin.quantity, activeCoin?.priceUsd as string);
      })

      state.totalCartPrice = getTotalPrice(state.cart);
    }
  },
});

export const { addCoinToCart, deleteCoinFromCart, compareTotalPrice, synhronizeCoinsPrice } = shoppingSlice.actions;

export default shoppingSlice.reducer;
