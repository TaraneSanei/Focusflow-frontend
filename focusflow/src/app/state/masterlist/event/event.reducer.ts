import { createReducer, on } from "@ngrx/store";
import { event } from "../../../models/data.models";
import { LoadEvents, LoadEventsSuccess, LoadEventsFailure, AddEvent, AddEventFailure, AddEventSuccess, DeleteEvent, DeleteEventSuccess, DeleteEventFailure, EditEvent, EditEventSuccess, EditEventFailure } from "./event.actions";

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
    })),
    on(AddEvent, (state) => ({
        ...state,
        error: "",
        status: "loading" as "loading"
    })),
    on(AddEventSuccess, (state, { event }) => ({
        ...state,
        events: [
            ...state.events, event
        ],
        status: "success" as "success",
        error: ""
    })),
    on(AddEventFailure, (state, { error }) => ({
        ...state,
        status: "error" as "error",
        error: error
    })),
    
    on(DeleteEvent, (state, { event }) => ({
        ...state,
        error: "",
        status: "loading" as "loading"
    })),
    on(DeleteEventSuccess, (state, { event }) => ({
        ...state,
        events: state.events.filter((e) => e.id !== event.id),
        status: "success" as "success",
        error: ""
    })),
    on(DeleteEventFailure, (state, { error }) => ({
        ...state,
        status: "error" as "error",
        error: error
    })),
    on(EditEvent, (state, { event }) => ({
        ...state,
        error: "",
        status: "loading" as "loading"
    })),
    on(EditEventSuccess, (state, { event }) => ({
        ...state,
        events: state.events.map(e =>
            e.id === event.id
                ? {
                    ...e,
                    id: event.id,
                    Title: event.Title,
                    Description: event.Description,
                    Date: event.Date,
                    Time: event.Time,
                    Duration: event.Duration,
                    Location: event.Location,
                    Recurrence: event.Recurrence,
                    Priority: event.Priority,
                    Done: event.Done,
                    ParentCategory: event.ParentCategory,
                    ParentProject: event.ParentProject,
                    Points: event.Points,
                    PointUnit: event.PointUnit,
                    key: event.key
                } : e
        ),
        status: "success" as "success",
        error: ""
    })),
    on(EditEventFailure, (state, { error }) => ({
        ...state,
        status: "error" as "error",
        error: error
    })),
    
    
    
)