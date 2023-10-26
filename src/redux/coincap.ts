import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_KEY from "../constants/constants";

export const coincapApi = createApi({
    reducerPath: "coincap",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.coincap.io/v2/",
        prepareHeaders: headers => {
            headers.set("Authorization", `Bearer ${API_KEY}`);
        },
    }),
    endpoints: build => ({
        getCoincap: build.query({
            query: () => `assets`,
        }),
        getOneCoincap: build.query({
            query: id => `assets/${id}`,
        }),
        getHistoryCoincap: build.query({
            query: ({ id, interval }) =>
                `assets/${id}/history?interval=${interval}`,
        }),
    }),
});

export const {
    useGetCoincapQuery,
    useGetOneCoincapQuery,
    useGetHistoryCoincapQuery,
} = coincapApi;
