import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { ProjectsState } from "./project.reducer";

export const SelectProjects = (state: AppState) => state.projects;
export const selectProjects = createSelector(
    SelectProjects,
    (state: ProjectsState) => state.projects
);