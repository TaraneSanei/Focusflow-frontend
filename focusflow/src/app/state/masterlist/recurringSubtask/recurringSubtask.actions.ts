import { createAction, props } from "@ngrx/store";
import { recurringSubtask } from "../../../models/data.models";


export const LoadRecurringSubtasks = createAction(
    '[backend] load recurringSubtasks',
);


export const LoadRecurringSubtasksSuccess = createAction(
    '[backend] load recurringSubtasks success',
    props<{recurringSubtasks: recurringSubtask[]}>()
);

export const LoadRecurringSubtasksFailure = createAction(
    '[backend] loading recurringSubtasks failure',
    props<{error:string}>()
);

export const AddRecurringSubtask = createAction(
    '[backend] add a new recurringSubtask',
    props<{recurringSubtask: recurringSubtask}>()
)

export const AddRecurringSubtaskSuccess = createAction(
    '[backend] add recurringSubtask success',
    props<{recurringSubtask: recurringSubtask}>()
)

export const AddRecurringSubtaskFailure = createAction(
    '[backend] add recurringSubtask failure',
    props<{error:string}>()
)