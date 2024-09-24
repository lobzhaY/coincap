import { createAsyncThunk } from "@reduxjs/toolkit";

import { getCoins, getHistoryCoin, getActiveCoin } from "../../api";
import { HistoryCoinType, OneCoinType } from "../../types";

export const fetchData = createAsyncThunk<
  OneCoinType[],
  undefined,
  { rejectValue: string }
>("coins/fetchGetCoins", async (_, { rejectWithValue }) => {
  try {
    const response = await getCoins();
    if (response.error) {
      return rejectWithValue(response.error);
    }
    return response.data;
  } catch (error) {
    return rejectWithValue(`An error occurred ${error}`);
  }
});

export const fetchHistoryData = createAsyncThunk<
  HistoryCoinType[],
  { id: string; interval: string },
  { rejectValue: string }
>("coins/fetchHistoryData", async ({ id, interval }, { rejectWithValue }) => {
  try {
    const response = await await getHistoryCoin(id, interval);
    if (response.error) {
      return rejectWithValue(response.error);
    }
    return response.data;
  } catch (error) {
    return rejectWithValue(`An error occurred ${error}`);
  }
});

export const fetchActiveCoinData = createAsyncThunk<
  OneCoinType,
  string,
  { rejectValue: string }
>("coins/fetchActiveCoinData", async (id, { rejectWithValue }) => {
  try {
    const response = await getActiveCoin(id);
    if (response.error) {
      return rejectWithValue(response.error);
    }
    return response.data;
  } catch (error) {
    return rejectWithValue(`An error occurred ${error}`);
  }
});
