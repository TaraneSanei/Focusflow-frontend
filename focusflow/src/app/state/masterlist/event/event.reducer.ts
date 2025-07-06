import { createReducer, on } from "@ngrx/store";
import { event } from "../../../models/data.models";
import { LoadEvents, LoadEventsSuccess, LoadEventsFailure } from "./event.actions";

export interface EventsState {
    events: event[];
    error: string;
    status: "pending" | "loading" | "error" | "success";
};

export const initialEventsState: EventsState = {
    events: [],
    error: "",
    status: "pending",
};


export const EventsReducer = createReducer(
    initialEventsState,
    on(LoadEvents, (state) => ({
        ...state,
        status: "loading" as "loading"
    })),
    on(LoadEventsSuccess,(state, {events}) => ({
        events: events,
        status: "success" as "success",
        error: ""
    })),
    on(LoadEventsFailure, (state, {error}) => ({
        ...state,
        status: "error" as "error",
        error: error
    }))
)