import { createSlice } from "@reduxjs/toolkit";

export enum Status {
    IDLE = "idle",
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error",
}

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
    eventRegisters: [],
    eventRegister: null,



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