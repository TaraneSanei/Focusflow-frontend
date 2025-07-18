import { createReducer, on } from "@ngrx/store";
import { recurringEvent } from "../../../models/data.models";
import { LoadRecurringEvents, LoadRecurringEventsSuccess, LoadRecurringEventsFailure, AddRecurringEvent, AddRecurringEventFailure, AddRecurringEventSuccess, DeleteRecurringEvent, DeleteRecurringEventSuccess, DeleteRecurringEventFailure, EditRecurringEvent, EditRecurringEventSuccess, EditRecurringEventFailure } from "./recurringEvent.actions";

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
    
    on(DeleteRecurringEvent, (state, { recurringEvent }) => ({
        ...state,
        error: "",
        status: "loading" as "loading"
    })),
    on(DeleteRecurringEventSuccess, (state, { recurringEvent }) => ({
        ...state,
        recurringEvents: state.recurringEvents.filter((r) => r.id !== recurringEvent.id),
        status: "success" as "success",
        error: ""
    })),
    on(DeleteRecurringEventFailure, (state, { error }) => ({
        ...state,
        status: "error" as "error",
        error: error
    })),
    on(EditRecurringEvent, (state, { recurringEvent }) => ({
        ...state,
        error: "",
        status: "loading" as "loading"
    })),
    on(EditRecurringEventSuccess, (state, { recurringEvent }) => ({
        ...state,
        recurringEvents: state.recurringEvents.map(r =>
            r.id === recurringEvent.id
                ? {
                    ...r,
                    id: recurringEvent.id,
                    Title: recurringEvent.Title,
                    Description: recurringEvent.Description,
                    Duration: recurringEvent.Duration,
                    Location: recurringEvent.Location,
                    RecurrenceRule: recurringEvent.RecurrenceRule,
                    Priority: recurringEvent.Priority,
                    ParentCategory: recurringEvent.ParentCategory,
                    ParentProject: recurringEvent.ParentProject,
                    Points: recurringEvent.Points,
                    PointUnit: recurringEvent.PointUnit,
                    key: recurringEvent.key
                } : r
        ),
        status: "success" as "success",
        error: ""
    })),
    on(EditRecurringEventFailure, (state, { error }) => ({
        ...state,
        status: "error" as "error",
        error: error
    })),
    
    
)