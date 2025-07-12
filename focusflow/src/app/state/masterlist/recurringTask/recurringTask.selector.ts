import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { RecurringTasksState } from "./recurringTask.reducer";

export const SelectRecurringTasks = (state: AppState) => state.recurringTasks;
export const selectRecurringTasks = createSelector(
    SelectRecurringTasks,
    (state: RecurringTasksState) => state.recurringTasks
);