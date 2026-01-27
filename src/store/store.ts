import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import eventSlice from './event/eventSlice';
import eventRegistrationSlice from "./event-registration/eventRegistrationSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      event: eventSlice,
      eventRegistration: eventRegistrationSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
