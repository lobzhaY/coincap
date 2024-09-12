import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type CoinType = {
  id: string;
  quantity: number;
  price: string;
};

type InitialCoinState = {
  cart: CoinType[];
};

const initialState: InitialCoinState = {
  cart: [],
};

export const addCoinWithSelection = createAsyncThunk<
  CoinType,
  { id: string; quantity: number },
  {}
>('shoppingCart/addCoinWithSelection', async ({ id, quantity }, { getState }) => {
  const state = getState() as RootState;
  const allCoins = state.coins.coins;
  const activeCoin = state.coins.activeCoin;

  const selectedCoin = allCoins.find((coin) => coin.id === id) || activeCoin;

  if (selectedCoin) {
    return { id: id, quantity: quantity, price: selectedCoin.priceUsd };
  }

  throw new Error('Coin not found');
});

const shoppingSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addCoinToCart: (state, action: PayloadAction<CoinType>) => {
      console.log();
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCoinWithSelection.fulfilled, (state, action: PayloadAction<CoinType>) => {
      state.cart.push(action.payload);
    });
  },
});

export const { addCoinToCart } = shoppingSlice.actions;

export default shoppingSlice.reducer;
