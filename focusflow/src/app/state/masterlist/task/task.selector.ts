import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { TasksState } from "./task.reducer";

export const SelectTasks = (state: AppState) => state.tasks;
export const selectTasks = createSelector(
    SelectTasks,
    (state: TasksState) => state.tasks
);