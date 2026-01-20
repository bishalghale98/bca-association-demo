import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { api } from "@/lib/api";
import { RegisterFormValues } from "@/schema/auth.schema";
import { AxiosError } from "axios";
import { EventFormValues } from "@/schema/event/createEvent";
export interface IUser {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  avatarUrl?: string | null;

  role: "ADMIN" | "MEMBER" | "SUPER_ADMIN";

  // Academic
  studentId: string;
  course?: string | null;
  specialization?: string | null;
  semester: string;
  year?: number | null;

  // Profile
  dateOfBirth?: string | null; // ISO string
  gender?: "MALE" | "FEMALE" | "OTHER" | null;
  address?: string | null;
  bio?: string | null;
  bloodGroup?: string | null;
  emergencyContact?: string | null;

  // Membership
  membershipStatus: "PENDING" | "ACTIVE" | "EXPIRED";

  // Gamification
  points: number;
  level: number;
  nextLevelPoints: number;
}

export interface IEvent {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  type: string | null;
  eventDate?: string; // ISO string from API
  endDate?: string;
  startDate?: string;
  createdById: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export enum Status {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface IAuthState {
  status: Status;
  error: string | null;
  event: IEvent | null;
  events: IEvent[] | null;
  loading: boolean;
}

const initialState: IAuthState = {
  status: Status.IDLE,
  error: null,
  loading: false,
  event: null,
  events: null,
};

const eventSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState(state) {
      state.status = Status.IDLE;
      state.error = null;
      state.event = null;
      state.loading = false;
    },

    startCreateEvent(state) {
      state.status = Status.LOADING;
    },

    successCreateEvent(state, action) {
      state.status = Status.SUCCESS;
      state.error = null;
      state.events?.push(action.payload);
    },

    createFailure(state, action) {
      state.status = Status.ERROR;
      state.error = action.payload;
    },

    startFetchEvent(state) {
      state.status = Status.LOADING;
      state.loading = true;
    },

    successFetchEvent(state, action) {
      state.status = Status.SUCCESS;
      state.error = null;
      state.events = action.payload;
      state.loading = false;
    },

    failureFetchEvent(state, action) {
      state.status = Status.ERROR;
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  resetState,
  startCreateEvent,
  successCreateEvent,
  createFailure,
  failureFetchEvent,
  successFetchEvent,
  startFetchEvent,
} = eventSlice.actions;
export default eventSlice.reducer;

export const createEvent = (data: EventFormValues) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await api.post("/event", data);
      console.log(res.data.data);

      if (!res.data.success) {
        dispatch(createFailure(res.data.message));
      } else {
        dispatch(successCreateEvent(res.data.data));
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(createFailure(error.response?.data?.message));
      } else {
        dispatch(createFailure("Something went wrong"));
      }
    }
  };
};

export const getAllEvents = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(startFetchEvent())
    try {
      const res = await api.get("/event");

      if (!res.data.success) {
        dispatch(failureFetchEvent(res.data.message));

      } else {
        dispatch(successFetchEvent(res.data.data));
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(failureFetchEvent(error.response?.data?.message));
      } else {
        dispatch(failureFetchEvent("Something went wrong"));
      }
    }
  };
};
