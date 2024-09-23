import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MODAL } from '../../constants/modal';

import {
  fetchActiveCoinData,
  fetchData,
} from "../actions/get-coins-asynk-thunk";

type InitialAppState = {
  isError: boolean;
  errorMessage: string;
  isLoading: boolean;
  isOpenModal: boolean;
  typeModal: MODAL | null;
  modalPayload: string;
};

const initialState: InitialAppState = {
  isError: false,
  errorMessage: "",
  isLoading: false,
  isOpenModal: false,
  typeModal: null,
  modalPayload: '',
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<MODAL | null>) => {
      state.isOpenModal = true;
      state.typeModal = action.payload;
    },
    closeModal: (state, action: PayloadAction<MODAL | null>) => {
      state.isOpenModal = false;
      state.typeModal = action.payload;
    },
    saveModalBuyPayload: (
      state,
      action: PayloadAction<string>
    ) => {
      state.modalPayload = action.payload;
    },
    removeModalBuyPayload: (state) => {
      state.modalPayload = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveCoinData.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(fetchActiveCoinData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchActiveCoinData.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchData.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      });
  },
});

export const { openModal, closeModal, saveModalBuyPayload, removeModalBuyPayload } = appSlice.actions;

export default appSlice.reducer;
