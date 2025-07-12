import { createAction, props } from "@ngrx/store";
import { task } from "../../../models/data.models";

export const LoadTasks = createAction(
    '[backend] load tasks',
);

export const LoadTasksSuccess = createAction(
    '[backend] load tasks success',
    props<{tasks: task[]}>()
);

export const LoadTasksFailure = createAction(
    '[backend] loading tasks failure',
    props<{error:string}>()
);

export const AddTask = createAction(
    '[backend] add a new task',
    props<{task: task}>()
)

export const AddTaskSuccess = createAction(
    '[backend] add task success',
    props<{task: task}>()
)

export const AddTaskFailure = createAction(
    '[backend] add task failure',
    props<{error:string}>()
)