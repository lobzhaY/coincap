import { configureStore } from "@reduxjs/toolkit";
import { coincapApi } from "./coincap";

const store = configureStore({
    reducer: {
        [coincapApi.reducerPath]: coincapApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(coincapApi.middleware),
});

export default store;
