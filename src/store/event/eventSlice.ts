import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { api } from "@/lib/api";
import { EventFormValues } from "@/schema/event/createEvent";

/* ================= TYPES ================= */

export interface IEvent {
  id: string;
  title: string;
  description?: string | null;
  location?: string | null;
  type?: string | null;
  eventDate?: string;
  startDate?: string;
  endDate?: string;
  createdById: string;
  createdAt: string;
  updatedAt: string;
}

export enum Status {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

/* ================= STATE ================= */

interface EventState {
  events: IEvent[];
  event: IEvent | null;

  // Separate status for each async operation
  fetchAllStatus: Status;
  fetchOneStatus: Status;
  createStatus: Status;
  updateStatus: Status;
  deleteStatus: Status;

  error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: EventState = {
  events: [],
  event: null,

  // All statuses start as IDLE
  fetchAllStatus: Status.IDLE,
  fetchOneStatus: Status.IDLE,
  createStatus: Status.IDLE,
  updateStatus: Status.IDLE,
  deleteStatus: Status.IDLE,

  error: null,
};

/* ================= ASYNC THUNKS ================= */

export const createEvent = createAsyncThunk<
  IEvent,
  EventFormValues,
  { rejectValue: string }
>("event/create", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post("/event", data);
    if (!res.data.success) return rejectWithValue(res.data.message);
    return res.data.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data?.message || "Something went wrong"
    );
  }
});

export const getAllEvents = createAsyncThunk<
  IEvent[],
  void,
  { rejectValue: string }
>("event/getAll", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/event");
    if (!res.data.success) return rejectWithValue(res.data.message);
    return res.data.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data?.message || "Something went wrong"
    );
  }
});

export const getEventById = createAsyncThunk<
  IEvent,
  string,
  { rejectValue: string }
>("event/getById", async (id, { rejectWithValue }) => {
  try {
    const res = await api.get(`/event/${id}`);
    if (!res.data.success) return rejectWithValue(res.data.message);
    return res.data.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data?.message || "Something went wrong"
    );
  }
});

export const updateEvent = createAsyncThunk<
  IEvent,
  { id: string; data: EventFormValues },
  { rejectValue: string }
>("event/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await api.patch(`/event/${id}`, data);
    if (!res.data.success) return rejectWithValue(res.data.message);
    return res.data.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data?.message || "Something went wrong"
    );
  }
});

export const deleteEvent = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("event/delete", async (id, { rejectWithValue }) => {
  try {
    const res = await api.delete(`/event/${id}`);
    if (!res.data.success) return rejectWithValue(res.data.message);
    return id;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return rejectWithValue(
      error.response?.data?.message || "Something went wrong"
    );
  }
});

/* ================= SLICE ================= */

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    resetEventState: (state) => {
      // Reset all statuses to IDLE
      state.fetchAllStatus = Status.IDLE;
      state.fetchOneStatus = Status.IDLE;
      state.createStatus = Status.IDLE;
      state.updateStatus = Status.IDLE;
      state.deleteStatus = Status.IDLE;
      state.error = null;
      state.event = null;
    },
    // Optional: Reset individual statuses
    resetFetchAllStatus: (state) => {
      state.fetchAllStatus = Status.IDLE;
    },
    resetFetchOneStatus: (state) => {
      state.fetchOneStatus = Status.IDLE;
    },
    resetCreateStatus: (state) => {
      state.createStatus = Status.IDLE;
    },
    resetUpdateStatus: (state) => {
      state.updateStatus = Status.IDLE;
    },
    resetDeleteStatus: (state) => {
      state.deleteStatus = Status.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder

      /* ===== FETCH ALL EVENTS ===== */
      .addCase(getAllEvents.pending, (state) => {
        state.fetchAllStatus = Status.LOADING;
      })
      .addCase(getAllEvents.fulfilled, (state, action: PayloadAction<IEvent[]>) => {
        state.fetchAllStatus = Status.SUCCESS;
        state.events = action.payload;
      })
      .addCase(getAllEvents.rejected, (state, action) => {
        state.fetchAllStatus = Status.ERROR;
        state.error = action.payload as string;
      })

      /* ===== CREATE EVENT ===== */
      .addCase(createEvent.pending, (state) => {
        state.createStatus = Status.LOADING;
      })
      .addCase(createEvent.fulfilled, (state, action: PayloadAction<IEvent>) => {
        state.createStatus = Status.SUCCESS;
        state.events.unshift(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.createStatus = Status.ERROR;
        state.error = action.payload as string;
      })

      /* ===== GET EVENT BY ID ===== */
      .addCase(getEventById.pending, (state) => {
        state.fetchOneStatus = Status.LOADING;
      })
      .addCase(getEventById.fulfilled, (state, action: PayloadAction<IEvent>) => {
        state.fetchOneStatus = Status.SUCCESS;
        state.event = action.payload;
      })
      .addCase(getEventById.rejected, (state, action) => {
        state.fetchOneStatus = Status.ERROR;
        state.error = action.payload as string;
      })

      /* ===== UPDATE EVENT ===== */
      .addCase(updateEvent.pending, (state) => {
        state.updateStatus = Status.LOADING;
      })
      .addCase(updateEvent.fulfilled, (state, action: PayloadAction<IEvent>) => {
        state.updateStatus = Status.SUCCESS;
        state.event = action.payload;
        state.events = state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        );
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.updateStatus = Status.ERROR;
        state.error = action.payload as string;
      })

      /* ===== DELETE EVENT ===== */
      .addCase(deleteEvent.pending, (state) => {
        state.deleteStatus = Status.LOADING;
      })
      .addCase(deleteEvent.fulfilled, (state, action: PayloadAction<string>) => {
        state.deleteStatus = Status.SUCCESS;
        state.events = state.events.filter(
          (event) => event.id !== action.payload
        );
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.deleteStatus = Status.ERROR;
        state.error = action.payload as string;
      });
  },
});

export const {
  resetEventState,
  resetFetchAllStatus,
  resetFetchOneStatus,
  resetCreateStatus,
  resetUpdateStatus,
  resetDeleteStatus
} = eventSlice.actions;
export default eventSlice.reducer;