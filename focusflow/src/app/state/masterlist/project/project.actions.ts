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


export const AddProject = createAction(
    '[backend] add a new project',
    props<{project: project}>()
)

export const AddProjectSuccess = createAction(
    '[backend] add project success',
    props<{project: project}>()
)

export const AddProjectFailure = createAction(
    '[backend] add project failure',
    props<{error:string}>()
)