import { createAction, props } from "@ngrx/store";
import { subtask } from "../../../models/data.models";


export const LoadSubtasks = createAction(
    '[backend] load subtasks',
);


export const LoadSubtasksSuccess = createAction(
    '[backend] load subtasks success',
    props<{subtasks: subtask[]}>()
);

export const LoadSubtasksFailure = createAction(
    '[backend] loading subtasks failure',
    props<{error:string}>()
);
