import { createReducer, on } from "@ngrx/store";
import { recurringTask } from "../../../models/data.models";
import { LoadRecurringTasks, LoadRecurringTasksSuccess, LoadRecurringTasksFailure, AddRecurringTask, AddRecurringTaskSuccess, AddRecurringTaskFailure, DeleteRecurringTask, DeleteRecurringTaskFailure, DeleteRecurringTaskSuccess, EditRecurringTask, EditRecurringTaskFailure, EditRecurringTaskSuccess } from "./recurringTask.actions";

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

    on(DeleteRecurringTask, (state, { recurringTask }) => ({
        ...state,
        error: "",
        status: "loading" as "loading"
    })),
    on(DeleteRecurringTaskSuccess, (state, { recurringTask }) => ({
        ...state,
        recurringTasks: state.recurringTasks.filter((r) => r.id !== recurringTask.id),
        status: "success" as "success",
        error: ""
    })),
    on(DeleteRecurringTaskFailure, (state, { error }) => ({
        ...state,
        status: "error" as "error",
        error: error
    })),
    on(EditRecurringTask, (state, { recurringTask }) => ({
        ...state,
        error: "",
        status: "loading" as "loading"
    })),
    on(EditRecurringTaskSuccess, (state, { recurringTask }) => ({
        ...state,
        recurringTasks: state.recurringTasks.map(r =>
            r.id === recurringTask.id
                ? {
                    ...r,
                    id: recurringTask.id,
                    Title: recurringTask.Title,
                    Description: recurringTask.Description,
                    Duration: recurringTask.Duration,
                    RecurrenceRule: recurringTask.RecurrenceRule,
                    Priority: recurringTask.Priority,
                    ParentCategory: recurringTask.ParentCategory,
                    ParentProject: recurringTask.ParentProject,
                    Points: recurringTask.Points,
                    PointUnit: recurringTask.PointUnit,
                    key: recurringTask.key
                } : r
        ),
        status: "success" as "success",
        error: ""
    })),
    on(EditRecurringTaskFailure, (state, { error }) => ({
        ...state,
        status: "error" as "error",
        error: error
    })),
)