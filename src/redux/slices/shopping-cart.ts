import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTotalPrice, getTotalPriceCoin } from '../../utils/get-total-price';

export type CoinType = {
  id: string;
  quantity: number;
  price: string;
  totalPrice: number;
};

type ActionCoinType = {
  id: string;
  quantity: number;
  price: string;
}

type InitialCoinState = {
  cart: CoinType[];
  totalCartPrice: number;
};

const initialState: InitialCoinState = {
  cart: [],
  totalCartPrice: 0,
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
  },
});

export const { addCoinToCart } = shoppingSlice.actions;

export default shoppingSlice.reducer;
