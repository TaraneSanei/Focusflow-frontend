import { createReducer, on } from "@ngrx/store";
import { recurringTask } from "../../../models/data.models";
import { LoadRecurringTasks, LoadRecurringTasksSuccess, LoadRecurringTasksFailure, AddRecurringTask, AddRecurringTaskSuccess, AddRecurringTaskFailure } from "./recurringTask.actions";

export interface RecurringTasksState {
    recurringTasks: recurringTask[];
    error: string;
    status: "pending" | "loading" | "error" | "success";
};

export const initialRecurringTasksState: RecurringTasksState = {
    recurringTasks: [],
    error: "",
    status: "pending",
};


export const RecurringTasksReducer = createReducer(
    initialRecurringTasksState,
    on(LoadRecurringTasks, (state) => ({
        ...state,
        status: "loading" as "loading"
    })),
    on(LoadRecurringTasksSuccess,(state, {recurringTasks}) => ({
        recurringTasks: recurringTasks,
        status: "success" as "success",
        error: ""
    })),
    on(LoadRecurringTasksFailure, (state, {error}) => ({
        ...state,
        status: "error" as "error",
        error: error
    })),
    on(AddRecurringTask, (state) => ({
        ...state,
        error: "",
        status: "loading" as "loading"
    })),
    on(AddRecurringTaskSuccess, (state, { recurringTask }) => ({
        ...state,
        recurringTasks: [
            ...state.recurringTasks, recurringTask
        ],
        status: "success" as "success",
        error: ""
    })),
    on(AddRecurringTaskFailure, (state, { error }) => ({
        ...state,
        status: "error" as "error",
        error: error
    })),
 
)