import { configureStore } from '@reduxjs/toolkit';

import coinReducer from './slices/coin-slice';
import shoppingCart from './slices/shopping-cart';
import appReducer from './slices/app-slice';

const store = configureStore({
  reducer: {
    coins: coinReducer,
    shoppingCart: shoppingCart,
    app: appReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
