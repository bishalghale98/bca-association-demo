import { createSlice } from "@reduxjs/toolkit";
import { Status } from "../types";


interface IEventRegister {
  id: string;
  eventId: string
  userId: string
  fullName: string
  phone?: string
  message?: string
  attended: boolean
  createdAt: string
  updatedAt: string
}

interface EventRegisterState {
  eventRegisters: IEventRegister[];
  eventRegister: IEventRegister | null;
 

  error: string | null;
}


const initialState: EventRegisterState = {
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



const eventSlice = createSlice({
  name: "eventRegister",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder


  },
});