import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { EventsState } from "./event.reducer";

export const SelectEvents = (state: AppState) => state.events;
export const selectEvents = createSelector(
    SelectEvents,
    (state: EventsState) => state.events
);