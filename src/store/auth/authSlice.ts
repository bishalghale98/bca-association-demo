import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { api } from "@/lib/api";
import { RegisterFormValues } from "@/schema/auth.schema";
import { AxiosError } from "axios";
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

export enum AllStatus {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export enum Status {
  IDLE = "idle",
  LOADING = "loading",
  AUTHENTICATED = "authenticated",
  ERROR = "error",
}

interface IAuthState {
  status: Status;
  error: string | null;
  allStatus: AllStatus;
  updatedUser: IUser | null;
}

const initialState: IAuthState = {
  status: Status.IDLE,
  error: null,
  allStatus: AllStatus.IDLE,
  updatedUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState(state) {
      state.status = Status.IDLE;
      state.error = null;
      state.allStatus = AllStatus.IDLE;
      state.updatedUser = null;
    },

    authStart(state) {
      state.status = Status.LOADING;
      state.error = null;
    },

    authSuccess(state) {
      state.status = Status.AUTHENTICATED;
    },

    authFailure(state, action: PayloadAction<string>) {
      state.status = Status.ERROR;
      state.error = action.payload;
    },

    updateStart(state) {
      state.allStatus = AllStatus.LOADING;
    },

    updateSuccess(state, action) {
      state.allStatus = AllStatus.SUCCESS;
      state.updatedUser = action.payload;
    },

    updateFailure(state, action) {
      state.allStatus = AllStatus.ERROR;
      state.error = action.payload;
    },
  },
});

export const {
  authStart,
  authSuccess,
  authFailure,
  resetState,
  updateStart,
  updateSuccess,
  updateFailure,
} = authSlice.actions;
export default authSlice.reducer;

export const registerUser = (data: RegisterFormValues) => {
  return async (dispatch: AppDispatch) => {
    dispatch(authStart());
    try {
      const res = await api.post("/sign-up", data);

      if (res.data.success) {
        dispatch(authSuccess());
      } else {
        dispatch(authFailure(res?.data?.message));
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(authFailure(error.response?.data?.message));
      } else {
        dispatch(authFailure("Something went wrong"));
      }
    }
  };
};

export const updateUser = (formData: any) => {
  return async (dispatch: AppDispatch) => {
    dispatch(updateStart());
    try {
      const res = await api.patch("/user/profile", formData);

      if (res.data.success) {
        dispatch(updateSuccess(res.data.data));
      } else {
        dispatch(updateFailure(res.data.message));
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(updateFailure(error.response?.data?.message));
      } else {
        dispatch(updateFailure("Something went wrong"));
      }
    }
  };
};
