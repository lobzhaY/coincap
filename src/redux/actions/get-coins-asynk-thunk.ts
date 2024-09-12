import { createAsyncThunk } from '@reduxjs/toolkit';

import { getCoins, getHistoryCoin, getActiveCoin, getTopCoins } from '../../api';
import { HistoryCoinType, OneCoinType } from '../../types';

export const fetchData = createAsyncThunk<OneCoinType[], undefined, { rejectValue: string }>(
  'coins/fetchGetCoins',
  async () => {
    const { data } = await getCoins();
    return data;
  },
);

export const fetchHistoryData = createAsyncThunk<
  HistoryCoinType[],
  { id: string; interval: string },
  { rejectValue: string }
>('coins/fetchHistoryData', async ({ id, interval }) => {
  const { data } = await getHistoryCoin(id, interval);
  return data;
});

export const fetchActiveCoinData = createAsyncThunk<OneCoinType, string, { rejectValue: string }>(
  'coins/fetchActiveCoinData',
  async (id) => {
    const { data } = await getActiveCoin(id);
    return data;
  },
);

export const fetchTopCoinsData = createAsyncThunk<OneCoinType[], number, { rejectValue: string }>(
  'coins/fetchTopCoinsData',
  async (limit) => {
    const { data } = await getTopCoins(limit);
    return data;
  },
);
