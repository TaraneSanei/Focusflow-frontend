import { createReducer, on } from "@ngrx/store";
import { task } from "../../../models/data.models";
import { LoadTasks, LoadTasksSuccess, LoadTasksFailure, AddTask, AddTaskSuccess, AddTaskFailure, DeleteTask, DeleteTaskFailure, DeleteTaskSuccess, EditTask, EditTaskFailure, EditTaskSuccess } from "./task.actions";

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
    on(DeleteTask, (state, { task }) => ({
        ...state,
        error: "",
        status: "loading" as "loading"
    })),
    on(DeleteTaskSuccess, (state, { task }) => ({
        ...state,
        tasks: state.tasks.filter((r) => r.id !== task.id),
        status: "success" as "success",
        error: ""
    })),
    on(DeleteTaskFailure, (state, { error }) => ({
        ...state,
        status: "error" as "error",
        error: error
    })),
    on(EditTask, (state, { task }) => ({
        ...state,
        error: "",
        status: "loading" as "loading"
    })),
    on(EditTaskSuccess, (state, { task }) => ({
        ...state,
        tasks: state.tasks.map(t =>
            t.id === task.id
                ? {
                    ...t,
                    id: task.id,
                    Title: task.Title,
                    Description: task.Description,
                    DueDate: task.DueDate,
                    DuweTime: task.DueTime,
                    Date: task.Date,
                    Time: task.Time,
                    Duration: task.Duration,
                    Priority: task.Priority,
                    Recurrence: task.Recurrence,
                    Done: task.Done,
                    ParentCategory: task.ParentCategory,
                    ParentProject: task.ParentProject,
                    Points: task.Points,
                    PointUnit: task.PointUnit,
                    key: task.key
                } : t
        ),
        status: "success" as "success",
        error: ""
    })),
    on(EditTaskFailure, (state, { error }) => ({
        ...state,
        status: "error" as "error",
        error: error
    })),
)