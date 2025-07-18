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

export const AddSubtask = createAction(
    '[backend] add a new subtask',
    props<{subtask: subtask}>()
)

export const AddSubtaskSuccess = createAction(
    '[backend] add subtask success',
    props<{subtask: subtask}>()
)

export const AddSubtaskFailure = createAction(
    '[backend] add subtask failure',
    props<{error:string}>()
)


export const DeleteSubtask = createAction(
    '[backend] delete subtask',
    props<{subtask: subtask}>()
);

export const DeleteSubtaskSuccess = createAction(
    '[backend] delete subtask success',
    props<{subtask: subtask}>()
);

export const DeleteSubtaskFailure = createAction(
    '[backend] delete subtask failure',
    props<{error: string}>()
);
//edit single Subtask actions

export const EditSubtask = createAction(
    '[backend] edit subtask',
    props<{subtask: subtask}>()
);

export const EditSubtaskSuccess = createAction(
    '[backend] edit subtask success',
    props<{subtask: subtask}>()
);

export const EditSubtaskFailure = createAction(
    '[backend] edit subtask failure',
    props<{error: string}>()
);