import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { RecurringEventsState } from "./recurringEvent.reducer";

export const SelectRecurringEvents = (state: AppState) => state.recurringEvents;
export const selectRecurringEvents = createSelector(
    SelectRecurringEvents,
    (state: RecurringEventsState) => state.recurringEvents
);