import { configureStore } from '@reduxjs/toolkit';

import coinReducer from './slices/coin-slice';
import shoppingCart from './slices/shopping-cart';

const store = configureStore({
  reducer: {
    coins: coinReducer,
    shoppingCart: shoppingCart,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
