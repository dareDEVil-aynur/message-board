import { configureStore } from "@reduxjs/toolkit";
import { channelsAPI } from "./services/channelsAPI";
import messageBoardReducer from "./states/stateSlices";

export const store = configureStore({
  reducer: {
    messageBoard: messageBoardReducer,
    [channelsAPI.reducerPath]: channelsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(channelsAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
