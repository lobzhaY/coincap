import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  fetchActiveCoinData,
  fetchData,
  fetchHistoryData,
  fetchTopCoinsData,
} from '../actions/get-coins-asynk-thunk';

import { HistoryCoinType, OneCoinType } from '../../types';

type InitialCoinState = {
  allCoins: OneCoinType[];
  coins: OneCoinType[];
  historyCoin: HistoryCoinType[];
  activeCoin: OneCoinType | null;
  headerCoin: OneCoinType[];
  currentPage: number;
  offset: number;
  limit: number;
};

const initialState: InitialCoinState = {
  allCoins: [],
  coins: [],
  historyCoin: [],
  activeCoin: null,
  headerCoin: [],
  currentPage: 1,
  offset: 0,
  limit: 10,
};

const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    changePaginationCurrentPage: (state, action: PayloadAction<{ page: number }>) => {
      if (action.payload.page == 1) {
        state.coins = state.allCoins.slice(state.offset, action.payload.page * state.limit);
      } else {
        state.coins = state.allCoins.slice(
          (action.payload.page - 1) * state.limit,
          action.payload.page * state.limit,
        );
      }
      state.currentPage = action.payload.page;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<OneCoinType[]>) => {
        state.allCoins = action.payload;
        state.coins = action.payload.slice(state.offset, state.currentPage * state.limit);
      })
      .addCase(fetchHistoryData.fulfilled, (state, action: PayloadAction<HistoryCoinType[]>) => {
        state.historyCoin = action.payload;
      })
      .addCase(fetchActiveCoinData.fulfilled, (state, action: PayloadAction<OneCoinType>) => {
        state.activeCoin = action.payload;
      })
      .addCase(fetchActiveCoinData.rejected, (state, action) => {
        
      })
      .addCase(fetchTopCoinsData.fulfilled, (state, action: PayloadAction<OneCoinType[]>) => {
        state.headerCoin = action.payload;
      });
  },
});

export const { changePaginationCurrentPage } = coinsSlice.actions;

export default coinsSlice.reducer;
