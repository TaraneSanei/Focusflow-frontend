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

export const DeleteEvent = createAction(
    '[backend] delete event',
    props<{event: event}>()
);

export const DeleteEventSuccess = createAction(
    '[backend] delete event success',
    props<{event: event}>()
);

export const DeleteEventFailure = createAction(
    '[backend] delete event failure',
    props<{error: string}>()
);
//edit single Event actions

export const EditEvent = createAction(
    '[backend] edit event',
    props<{event: event}>()
);

export const EditEventSuccess = createAction(
    '[backend] edit event success',
    props<{event: event}>()
);

export const EditEventFailure = createAction(
    '[backend] edit event failure',
    props<{error: string}>()
);

