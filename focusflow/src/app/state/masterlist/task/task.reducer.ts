import { createReducer, on } from "@ngrx/store";
import { task } from "../../../models/data.models";
import { LoadTasks, LoadTasksSuccess, LoadTasksFailure, AddTask, AddTaskSuccess, AddTaskFailure } from "./task.actions";

export interface TasksState {
    tasks: task[];
    error: string;
    status: "pending" | "loading" | "error" | "success";
};

export const initialTasksState: TasksState = {
    tasks: [],
    error: "",
    status: "pending",
};


export const TasksReducer = createReducer(
    initialTasksState,
    on(LoadTasks, (state) => ({
        ...state,
        status: "loading" as "loading"
    })),
    on(LoadTasksSuccess,(state, {tasks}) => ({
        tasks :tasks,
        status: "success" as "success",
        error: ""
    })),
    on(LoadTasksFailure, (state, {error}) => ({
        ...state,
        status: "error" as "error",
        error: error
    })),
    on(AddTask, (state) => ({
        ...state,
        error: "",
        status: "loading" as "loading"
    })),
    on(AddTaskSuccess, (state, { task }) => ({
        ...state,
        tasks: [
            ...state.tasks, task
        ],
        status: "success" as "success",
        error: ""
    })),
    on(AddTaskFailure, (state, { error }) => ({
        ...state,
        status: "error" as "error",
        error: error
    })),
 
)