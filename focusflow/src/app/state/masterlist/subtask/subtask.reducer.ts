import { createReducer, on } from "@ngrx/store";
import { subtask } from "../../../models/data.models";
import { LoadSubtasks, LoadSubtasksSuccess, LoadSubtasksFailure, AddSubtask, AddSubtaskSuccess, AddSubtaskFailure, DeleteSubtask, DeleteSubtaskFailure, DeleteSubtaskSuccess, EditSubtask, EditSubtaskFailure, EditSubtaskSuccess } from "./subtask.actions";


export interface SubtasksState {
    subtasks: subtask[];
    error: string;
    status: "pending" | "loading" | "error" | "success";
};


export const initialSubtasksState: SubtasksState = {
    subtasks: [],
    error: "",
    status: "pending",
};


export const SubtasksReducer = createReducer(
    initialSubtasksState,
    on(LoadSubtasks, (state) => ({
        ...state,
        status: "loading" as "loading"
    })),
    on(LoadSubtasksSuccess, (state, {subtasks}) => ({
        subtasks: subtasks,
        status: "success" as "success",
        error: ""
    })),
    on(LoadSubtasksFailure, (state, {error}) => ({
        ...state,
        status: "error" as "error",
        error: error
    })),
    on(AddSubtask, (state) => ({
        ...state,
        error: "",
        status: "loading" as "loading"
    })),
    on(AddSubtaskSuccess, (state, { subtask }) => ({
        ...state,
        subtasks: [
            ...state.subtasks, subtask
        ],
        status: "success" as "success",
        error: ""
    })),
    on(AddSubtaskFailure, (state, { error }) => ({
        ...state,
        status: "error" as "error",
        error: error
    })),
    
        on(DeleteSubtask, (state, { subtask }) => ({
            ...state,
            error: "",
            status: "loading" as "loading"
        })),
        on(DeleteSubtaskSuccess, (state, { subtask }) => ({
            ...state,
            subtasks: state.subtasks.filter((r) => r.id !== subtask.id),
            status: "success" as "success",
            error: ""
        })),
        on(DeleteSubtaskFailure, (state, { error }) => ({
            ...state,
            status: "error" as "error",
            error: error
        })),
        on(EditSubtask, (state, { subtask }) => ({
            ...state,
            error: "",
            status: "loading" as "loading"
        })),
        on(EditSubtaskSuccess, (state, { subtask }) => ({
            ...state,
            Subtasks: state.subtasks.map(r =>
                r.id === subtask.id
                    ? {
                        ...r,
                        id: subtask.id,
                        Title: subtask.Title,
                        Description: subtask.Description,
                        Duration: subtask.Duration,
                        Priority: subtask.Priority,
                        ParentTask: subtask.ParentTask,
                        Points: subtask.Points,
                        PointUnit: subtask.PointUnit,
                        key: subtask.key
                    } : r
            ),
            status: "success" as "success",
            error: ""
        })),
        on(EditSubtaskFailure, (state, { error }) => ({
            ...state,
            status: "error" as "error",
            error: error
        })),
        
        
)