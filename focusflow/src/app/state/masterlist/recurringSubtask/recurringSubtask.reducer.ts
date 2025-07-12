import { createReducer, on } from "@ngrx/store";
import { recurringSubtask } from "../../../models/data.models";
import { LoadRecurringSubtasks, LoadRecurringSubtasksSuccess, LoadRecurringSubtasksFailure, AddRecurringSubtask, AddRecurringSubtaskSuccess, AddRecurringSubtaskFailure } from "./recurringSubtask.actions";


export interface RecurringSubtasksState {
    recurringSubtasks: recurringSubtask[];
    error: string;
    status: "pending" | "loading" | "error" | "success";
};


export const initialRecurringSubtasksState: RecurringSubtasksState = {
    recurringSubtasks: [],
    error: "",
    status: "pending",
};


export const RecurringSubtasksReducer = createReducer(
    initialRecurringSubtasksState,
    on(LoadRecurringSubtasks, (state) => ({
        ...state,
        status: "loading" as "loading"
    })),
    on(LoadRecurringSubtasksSuccess, (state, {recurringSubtasks}) => ({
        recurringSubtasks: recurringSubtasks,
        status: "success" as "success",
        error: ""
    })),
    on(LoadRecurringSubtasksFailure, (state, {error}) => ({
        ...state,
        status: "error" as "error",
        error: error
    })),
    on(AddRecurringSubtask, (state) => ({
        ...state,
        error: "",
        status: "loading" as "loading"
    })),
    on(AddRecurringSubtaskSuccess, (state, { recurringSubtask }) => ({
        ...state,
        recurringSubtasks: [
            ...state.recurringSubtasks, recurringSubtask
        ],
        status: "success" as "success",
        error: ""
    })),
    on(AddRecurringSubtaskFailure, (state, { error }) => ({
        ...state,
        status: "error" as "error",
        error: error
    }))
)