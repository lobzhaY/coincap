import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MODAL } from '../../constants/modal';

import { fetchActiveCoinData, fetchData, fetchHistoryData } from '../actions/get-coins-async-thunk';

type InitialAppState = {
  isError: boolean;
  isNotFoundCoin: boolean;
  errorMessage: string;
  isLoading: boolean;
  isOpenModal: boolean;
  typeModal: MODAL | null;
  modalPayload: string;
};

const initialState: InitialAppState = {
  isError: false,
  isNotFoundCoin: false,
  errorMessage: '',
  isLoading: false,
  isOpenModal: false,
  typeModal: null,
  modalPayload: '',
};

const appSlice = createSlice({
  name: 'app',
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
    saveModalBuyPayload: (state, action: PayloadAction<string>) => {
      state.modalPayload = action.payload;
    },
    removeModalBuyPayload: state => {
      state.modalPayload = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchActiveCoinData.rejected, (state, action) => {
        state.isNotFoundCoin = true;
        state.isLoading = false;
        if (action.payload) {
          state.errorMessage = action.payload;
        }
      })
      .addCase(fetchActiveCoinData.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchActiveCoinData.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(fetchHistoryData.rejected, (state, action) => {
        state.isError = true;
        if (action.payload) {
          state.errorMessage = action.payload;
        }
      })
      .addCase(fetchData.fulfilled, state => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if (action.payload) {
          state.errorMessage = action.payload;
        }
      })
      .addCase(fetchData.pending, state => {
        state.isLoading = true;
        state.isError = false;
      });
  },
});

export const { openModal, closeModal, saveModalBuyPayload, removeModalBuyPayload } = appSlice.actions;

export default appSlice.reducer;
