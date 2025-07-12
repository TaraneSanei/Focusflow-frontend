import { createReducer, on } from "@ngrx/store";
import { project } from "../../../models/data.models";
import { LoadProjects, LoadProjectsSuccess, LoadProjectsFailure, AddProject, AddProjectSuccess, AddProjectFailure } from "./project.actions";

export interface ProjectsState {
    projects: project[];
    error: string;
    status: "pending" | "loading" | "error" | "success";
};

export const initialProjectsState: ProjectsState = {
    projects: [],
    error: "",
    status: "pending",
};


export const ProjectsReducer = createReducer(
    initialProjectsState,
    on(LoadProjects, (state) => ({
        ...state,
        status: "loading" as "loading"
    })),
    on(LoadProjectsSuccess,(state, {projects}) => ({
        projects :projects,
        status: "success" as "success",
        error: ""
    })),
    on(LoadProjectsFailure, (state, {error}) => ({
        ...state,
        status: "error" as "error",
        error: error
    })),
    on(AddProject, (state) => ({
        ...state,
        error: "",
        status: "loading" as "loading"
    })),
    on(AddProjectSuccess, (state, { project }) => ({
        ...state,
        projects: [
            ...state.projects, project
        ],
        status: "success" as "success",
        error: ""
    })),
    on(AddProjectFailure, (state, { error }) => ({
        ...state,
        status: "error" as "error",
        error: error
    })),
)