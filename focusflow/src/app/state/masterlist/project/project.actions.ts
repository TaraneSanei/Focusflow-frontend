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


export const DeleteProject = createAction(
    '[backend] delete project',
    props<{project: project}>()
);

export const DeleteProjectSuccess = createAction(
    '[backend] delete project success',
    props<{project: project}>()
);

export const DeleteProjectFailure = createAction(
    '[backend] delete project failure',
    props<{error: string}>()
);
//edit single Project actions

export const EditProject = createAction(
    '[backend] edit project',
    props<{project: project}>()
);

export const EditProjectSuccess = createAction(
    '[backend] edit project success',
    props<{project: project}>()
);

export const EditProjectFailure = createAction(
    '[backend] edit project failure',
    props<{error: string}>()
);

