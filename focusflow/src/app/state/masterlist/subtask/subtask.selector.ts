
import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { SubtasksState } from "./subtask.reducer";

export const SelectSubtasks = (state: AppState) => state.subtasks;
export const selectSubtasks = createSelector(
    SelectSubtasks,
    (state: SubtasksState) => state.subtasks
);