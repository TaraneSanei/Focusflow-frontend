import { createReducer, on } from "@ngrx/store";
import { recurringSubtask } from "../../../models/data.models";
import { LoadRecurringSubtasks, LoadRecurringSubtasksSuccess, LoadRecurringSubtasksFailure, AddRecurringSubtask, AddRecurringSubtaskSuccess, AddRecurringSubtaskFailure, DeleteRecurringSubtask, DeleteRecurringSubtaskSuccess, DeleteRecurringSubtaskFailure, EditRecurringSubtask, EditRecurringSubtaskSuccess, EditRecurringSubtaskFailure } from "./recurringSubtask.actions";


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
    })),
    
    on(DeleteRecurringSubtask, (state, { recurringSubtask }) => ({
        ...state,
        error: "",
        status: "loading" as "loading"
    })),
    on(DeleteRecurringSubtaskSuccess, (state, { recurringSubtask }) => ({
        ...state,
        recurringSubtasks: state.recurringSubtasks.filter((r) => r.id !== recurringSubtask.id),
        status: "success" as "success",
        error: ""
    })),
    on(DeleteRecurringSubtaskFailure, (state, { error }) => ({
        ...state,
        status: "error" as "error",
        error: error
    })),
    on(EditRecurringSubtask, (state, { recurringSubtask }) => ({
        ...state,
        error: "",
        status: "loading" as "loading"
    })),
    on(EditRecurringSubtaskSuccess, (state, { recurringSubtask }) => ({
        ...state,
        recurringSubtasks: state.recurringSubtasks.map(r =>
            r.id === recurringSubtask.id
                ? {
                    ...r,
                    id: recurringSubtask.id,
                    Title: recurringSubtask.Title,
                    Description: recurringSubtask.Description,
                    Duration: recurringSubtask.Duration,                    RecurrenceRule: recurringSubtask.RecurrenceRule,
                    Priority: recurringSubtask.Priority,
                    ParentTask: recurringSubtask.ParentTask,
                    Points: recurringSubtask.Points,
                    PointUnit: recurringSubtask.PointUnit,
                    key: recurringSubtask.key
                } : r
        ),
        status: "success" as "success",
        error: ""
    })),
    on(EditRecurringSubtaskFailure, (state, { error }) => ({
        ...state,
        status: "error" as "error",
        error: error
    })),
    
    
)