import { createSlice } from '@reduxjs/toolkit';
import { fetchActiveCoinData, fetchData, fetchHistoryData, fetchTopCoinsData } from '../actions/get-coins';

const initialState = {
  allCoins: [],
  coins: [],
  historyCoin: [],
  activeCoin: [],
  headerCoin: [],
  currentPage: 1,
  offset: 0,
  limit: 10,
};

const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    changePaginationCurrentPage: (state, action) => {
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
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.allCoins = action.payload;
      state.coins = action.payload.slice(state.offset, state.currentPage * state.limit);
    }),

    builder.addCase(fetchHistoryData.fulfilled, (state, action) => {
      state.historyCoin = action.payload;
    }),
    builder.addCase(fetchActiveCoinData.fulfilled, (state, action) => {
      state.activeCoin = action.payload;
    }),
    builder.addCase(fetchTopCoinsData.fulfilled, (state, action) => {
      state.headerCoin = action.payload
    })
  },
});

export const { changePaginationCurrentPage } = coinsSlice.actions;

export default coinsSlice.reducer;
