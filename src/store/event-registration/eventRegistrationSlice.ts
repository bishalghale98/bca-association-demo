import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { api } from "@/lib/api";
import { Status } from "../types";
import { IEvent } from "../event/eventSlice";
import { IUser } from "../auth/authSlice";

/* ================= TYPES ================= */

export interface IEventRegistration {
    id: string;
    fullName: string;
    phone: string;
    message?: string | null;
    attended: boolean;
    eventId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    event?: IEvent;
    user?: IUser;
}

export interface EventRegistrationFormValues {
    fullName: string;
    phoneNo: string;
    message?: string;
    eventId: string;
    userId: string;
}



/* ================= STATE ================= */

interface EventRegistrationState {
    registrations: IEventRegistration[];

    registerStatus: Status;
    fetchMyStatus: Status;
    updateAttendanceStatus: Status;
    fetchRegistrationsStatus: Status;

    error: string | null;
}

/* ================= INITIAL STATE ================= */

const initialState: EventRegistrationState = {
    registrations: [],

    registerStatus: Status.IDLE,
    fetchMyStatus: Status.IDLE,
    updateAttendanceStatus: Status.IDLE,
    fetchRegistrationsStatus: Status.IDLE,

    error: null,
};

/* ================= ASYNC THUNKS ================= */

/* REGISTER EVENT */
export const registerEvent = createAsyncThunk<
    IEventRegistration,
    EventRegistrationFormValues,
    { rejectValue: string }
>("eventRegistration/register", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post("/event-registration", data);
        if (!res.data.success) return rejectWithValue(res.data.message);
        return res.data.data;
    } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        return rejectWithValue(
            error.response?.data?.message || "Something went wrong"
        );
    }
});

/* GET MY REGISTERED EVENTS */
export const getMyRegisteredEvents = createAsyncThunk<
    IEventRegistration[],
    void,
    { rejectValue: string }
>("eventRegistration/getMy", async (_, { rejectWithValue }) => {
    try {
        const res = await api.get("/event-registration");
        if (!res.data.success) return rejectWithValue(res.data.message);
        return res.data.data;
    } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        return rejectWithValue(
            error.response?.data?.message || "Something went wrong"
        );
    }
});

/* UPDATE ATTENDANCE (ADMIN) */
export const updateEventAttendance = createAsyncThunk<
    IEventRegistration,
    { id: string; attended: boolean },
    { rejectValue: string }
>("eventRegistration/updateAttendance", async ({ id, attended }, { rejectWithValue }) => {
    try {
        const res = await api.patch("/event-registration", { id, attended });
        if (!res.data.success) return rejectWithValue(res.data.message);
        return res.data.data;
    } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        return rejectWithValue(
            error.response?.data?.message || "Something went wrong"
        );
    }
});

/* GET ALL REGISTRATIONS BY EVENT ID */
export const getRegistrationsByEventId = createAsyncThunk<
    IEventRegistration[],
    string,
    { rejectValue: string }
>("eventRegistration/getRegistrationsByEventId", async (eventId, { rejectWithValue }) => {
    try {
        const res = await api.get(`/event-registration?eventId=${eventId}`);
        if (!res.data.success) return rejectWithValue(res.data.message);
        return res.data.data;
    } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        return rejectWithValue(
            error.response?.data?.message || "Something went wrong"
        );
    }
});

/* ================= SLICE ================= */

const eventRegistrationSlice = createSlice({
    name: "eventRegistration",
    initialState,
    reducers: {
        resetEventRegistrationState: (state) => {
            state.registerStatus = Status.IDLE;
            state.fetchMyStatus = Status.IDLE;
            state.updateAttendanceStatus = Status.IDLE;
            state.error = null;
        },

        resetRegisterStatus: (state) => {
            state.registerStatus = Status.IDLE;
        },

        resetFetchMyStatus: (state) => {
            state.fetchMyStatus = Status.IDLE;
        },

        resetUpdateAttendanceStatus: (state) => {
            state.updateAttendanceStatus = Status.IDLE;
        },

        resetFetchRegistrationsStatus: (state) => {
            state.fetchRegistrationsStatus = Status.IDLE;
        },
    },

    extraReducers: (builder) => {
        builder

            /* ===== REGISTER EVENT ===== */
            .addCase(registerEvent.pending, (state) => {
                state.registerStatus = Status.LOADING;
            })
            .addCase(registerEvent.fulfilled, (state, action: PayloadAction<IEventRegistration>) => {
                state.registerStatus = Status.SUCCESS;
                state.registrations.unshift(action.payload);
            })
            .addCase(registerEvent.rejected, (state, action) => {
                state.registerStatus = Status.ERROR;
                state.error = action.payload as string;
            })

            /* ===== GET MY EVENTS ===== */
            .addCase(getMyRegisteredEvents.pending, (state) => {
                state.fetchMyStatus = Status.LOADING;
            })
            .addCase(getMyRegisteredEvents.fulfilled, (state, action: PayloadAction<IEventRegistration[]>) => {
                state.fetchMyStatus = Status.SUCCESS;
                state.registrations = action.payload;
            })
            .addCase(getMyRegisteredEvents.rejected, (state, action) => {
                state.fetchMyStatus = Status.ERROR;
                state.error = action.payload as string;
            })

            /* ===== UPDATE ATTENDANCE ===== */
            .addCase(updateEventAttendance.pending, (state) => {
                state.updateAttendanceStatus = Status.LOADING;
            })
            .addCase(updateEventAttendance.fulfilled, (state, action: PayloadAction<IEventRegistration>) => {
                state.updateAttendanceStatus = Status.SUCCESS;
                state.registrations = state.registrations.map((reg) =>
                    reg.id === action.payload.id ? action.payload : reg
                );
            })
            .addCase(updateEventAttendance.rejected, (state, action) => {
                state.updateAttendanceStatus = Status.ERROR;
                state.error = action.payload as string;
            })


            /* ===== GET REGISTRATIONS BY EVENT ID ===== */
            .addCase(getRegistrationsByEventId.pending, (state) => {
                state.fetchRegistrationsStatus = Status.LOADING;
            })
            .addCase(getRegistrationsByEventId.fulfilled, (state, action: PayloadAction<IEventRegistration[]>) => {
                state.fetchRegistrationsStatus = Status.SUCCESS;
                state.registrations = action.payload;
            })
            .addCase(getRegistrationsByEventId.rejected, (state, action) => {
                state.fetchRegistrationsStatus = Status.ERROR;
                state.error = action.payload as string;
            })
    },
});

export const {
    resetEventRegistrationState,
    resetRegisterStatus,
    resetFetchMyStatus,
    resetUpdateAttendanceStatus,
    resetFetchRegistrationsStatus,
} = eventRegistrationSlice.actions;

export default eventRegistrationSlice.reducer;
