import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  fetchActiveCoinData,
  fetchData,
} from '../actions/get-coins-asynk-thunk';


type InitialAppState = {
    isError: boolean;
    errorMessage: string;
    isLoading: boolean;
    isOpenModal: boolean;
};

const initialState: InitialAppState = {
    isError: false,
    errorMessage: '',
    isLoading: false,
    isOpenModal: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpenModal = true;
    },
    closeModal: (state) => {
      state.isOpenModal = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveCoinData.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(fetchActiveCoinData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchActiveCoinData.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchData.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })

  },
});

export const { openModal, closeModal } = appSlice.actions;

export default appSlice.reducer;
