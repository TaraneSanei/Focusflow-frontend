import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { RecurringSubtasksState } from "./recurringSubtask.reducer";

export const SelectRecurringSubtasks = (state: AppState) => state.recurringSubtasks;
export const selectRecurringSubtasks = createSelector(
    SelectRecurringSubtasks,
    (state: RecurringSubtasksState) => state.recurringSubtasks
);