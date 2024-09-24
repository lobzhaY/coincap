import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectAllCoins = (state: RootState) => state.coins.allCoins;

export const selectCoinById = (id: string) =>
  createDraftSafeSelector(
    [selectAllCoins],
    (coins) => coins.find((coin) => coin.id === id)
  );
