import { createAction, props } from "@ngrx/store";
import { project } from "../../../models/data.models";

export const LoadProjects = createAction(
    '[backend] load projects',
);

export const LoadProjectsSuccess = createAction(
    '[backend] load projects success',
    props<{projects: project[]}>()
);

export const LoadProjectsFailure = createAction(
    '[backend] loading projects failure',
    props<{error:string}>()
);
