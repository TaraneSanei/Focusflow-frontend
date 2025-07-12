import { createAction, props } from "@ngrx/store";
import { recurringEvent } from "../../../models/data.models";


export const LoadRecurringEvents = createAction(
    '[backend] load recurringEvents',
);

export const LoadRecurringEventsSuccess = createAction(
    '[backend] load recurringEvents success',
    props<{recurringEvents: recurringEvent[]}>()
);

export const LoadRecurringEventsFailure = createAction(
    '[backend] loading recurringEvents failure',
    props<{error:string}>()
);

export const AddRecurringEvent = createAction(
    '[backend] add a new recurringEvent',
    props<{recurringEvent: recurringEvent}>()
)

export const AddRecurringEventSuccess = createAction(
    '[backend] add recurringEvent success',
    props<{recurringEvent: recurringEvent}>()
)

export const AddRecurringEventFailure = createAction(
    '[backend] add recurringEvent failure',
    props<{error:string}>()
)