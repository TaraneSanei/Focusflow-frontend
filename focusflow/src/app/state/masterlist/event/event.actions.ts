import { createAction, props } from "@ngrx/store";
import { event } from "../../../models/data.models";

export const LoadEvents = createAction(
    '[backend] load events',
);

export const LoadEventsSuccess = createAction(
    '[backend] load events success',
    props<{events: event[]}>()
);

export const LoadEventsFailure = createAction(
    '[backend] loading events failure',
    props<{error:string}>()
);

export const AddEvent = createAction(
    '[backend] add a new event',
    props<{event: event}>()
)

export const AddEventSuccess = createAction(
    '[backend] add event success',
    props<{event: event}>()
)

export const AddEventFailure = createAction(
    '[backend] add event failure',
    props<{error:string}>()
)