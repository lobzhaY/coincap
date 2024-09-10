import { createAsyncThunk } from '@reduxjs/toolkit';

const COIN_API = 'https://api.coincap.io/v2/assets';

const getCoins = async () => {
  const response = await fetch(COIN_API);
  return await response.json();
}

const getHistoryCoin = async (id: string, interval: string) => {
  const response = await fetch(`${COIN_API}/${id}/history?interval=${interval}`);
  return await response.json();
}

const getActiveCoin = async (id: string) => {
  const response = await fetch(`${COIN_API}/${id}`);
  return await response.json();
}

const getTopCoins = async (limit: number) => {
  const response = await fetch(`${COIN_API}?limit=${limit}`);
  return await response.json();
}

export const fetchData = createAsyncThunk('coins/fetchGetCoins', async () => {
  const { data } = await getCoins();
  return data
});

export const fetchHistoryData = createAsyncThunk('coins/fetchHistoryData', async ({id, interval}) => {
  const { data } = await getHistoryCoin(id, interval);
  return data
});

export const fetchActiveCoinData = createAsyncThunk('coins/fetchActiveCoinData', async (id: string) => {
  const { data } = await getActiveCoin(id);
  return data
});

export const fetchTopCoinsData = createAsyncThunk('coins/fetchTopCoinsData', async (limit: number) => {
  const { data } = await getTopCoins(limit);
  return data
})