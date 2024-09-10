import { configureStore } from '@reduxjs/toolkit';
import coinReducer from './slices/coin-slice';

const store = configureStore({
  reducer: {
    coins: coinReducer,
  },
  
});

export default store;
