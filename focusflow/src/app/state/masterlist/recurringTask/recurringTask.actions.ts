import { createAction, props } from "@ngrx/store";
import { recurringTask } from "../../../models/data.models";

export const LoadRecurringTasks = createAction(
    '[backend] load recurringTasks',
);

export const LoadRecurringTasksSuccess = createAction(
    '[backend] load recurringTasks success',
    props<{recurringTasks: recurringTask[]}>()
);

export const LoadRecurringTasksFailure = createAction(
    '[backend] loading recurringTasks failure',
    props<{error:string}>()
);

export const AddRecurringTask = createAction(
    '[backend] add a new recurringTask',
    props<{recurringTask: recurringTask}>()
)

export const AddRecurringTaskSuccess = createAction(
    '[backend] add recurringTask success',
    props<{recurringTask: recurringTask}>()
)

export const AddRecurringTaskFailure = createAction(
    '[backend] add recurringTask failure',
    props<{error:string}>()
)