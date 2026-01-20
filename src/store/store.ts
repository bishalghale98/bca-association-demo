import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import eventSlice from './event/eventSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      event: eventSlice
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
