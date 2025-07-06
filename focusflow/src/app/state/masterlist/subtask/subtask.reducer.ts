import { createReducer, on } from "@ngrx/store";
import { subtask } from "../../../models/data.models";
import { LoadSubtasks, LoadSubtasksSuccess, LoadSubtasksFailure } from "./subtask.actions";


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
    }))
)