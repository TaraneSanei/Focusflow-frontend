import { createReducer, on } from "@ngrx/store";
import { recurringEvent } from "../../../models/data.models";
import { LoadRecurringEvents, LoadRecurringEventsSuccess, LoadRecurringEventsFailure, AddRecurringEvent, AddRecurringEventFailure, AddRecurringEventSuccess } from "./recurringEvent.actions";

export interface RecurringEventsState {
    recurringEvents: recurringEvent[];
    error: string;
    status: "pending" | "loading" | "error" | "success";
};

export const initialRecurringEventsState: RecurringEventsState = {
    recurringEvents: [],
    error: "",
    status: "pending",
};


export const RecurringEventsReducer = createReducer(
    initialRecurringEventsState,
    on(LoadRecurringEvents, (state) => ({
        ...state,
        status: "loading" as "loading"
    })),
    on(LoadRecurringEventsSuccess,(state, {recurringEvents}) => ({
        recurringEvents: recurringEvents,
        status: "success" as "success",
        error: ""
    })),
    on(LoadRecurringEventsFailure, (state, {error}) => ({
        ...state,
        status: "error" as "error",
        error: error
    })),
    on(AddRecurringEvent, (state) => ({
        ...state,
        error: "",
        status: "loading" as "loading"
    })),
    on(AddRecurringEventSuccess, (state, { recurringEvent }) => ({
        ...state,
        recurringEvents: [
            ...state.recurringEvents, recurringEvent
        ],
        status: "success" as "success",
        error: ""
    })),
    on(AddRecurringEventFailure, (state, { error }) => ({
        ...state,
        status: "error" as "error",
        error: error
    })),
)