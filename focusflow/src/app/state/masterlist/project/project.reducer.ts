import { createReducer, on } from "@ngrx/store";
import { project } from "../../../models/data.models";
import { LoadProjects, LoadProjectsSuccess, LoadProjectsFailure, AddProject, AddProjectSuccess, AddProjectFailure, DeleteProject, DeleteProjectSuccess, DeleteProjectFailure, EditProject, EditProjectSuccess, EditProjectFailure } from "./project.actions";

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
    on(LoadProjectsSuccess, (state, { projects }) => ({
        projects: projects,
        status: "success" as "success",
        error: ""
    })),
    on(LoadProjectsFailure, (state, { error }) => ({
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

    on(DeleteProject, (state, { project }) => ({
        ...state,
        error: "",
        status: "loading" as "loading"
    })),
    on(DeleteProjectSuccess, (state, { project }) => ({
        ...state,
        projects: state.projects.filter((p) => p.id !== project.id),
        status: "success" as "success",
        error: ""
    })),
    on(DeleteProjectFailure, (state, { error }) => ({
        ...state,
        status: "error" as "error",
        error: error
    })),
    on(EditProject, (state, { project }) => ({
        ...state,
        error: "",
        status: "loading" as "loading"
    })),
    on(EditProjectSuccess, (state, { project }) => ({
        ...state,
        projects: state.projects.map(p =>
            p.id === project.id
                ? {
                    ...p,
                    id: project.id,
                    Title: project.Title,
                    Description: project.Description,
                    DueDate: project.DueDate,
                    BackBurner: project.BackBurner,
                    Priority: project.Priority,
                    Color: project.Color,
                    ParentCategory: project.ParentCategory,
                    Reward: project.Reward,
                    key: project.key
                } : p
        ),
        status: "success" as "success",
        error: ""
    })),
    on(EditProjectFailure, (state, { error }) => ({
        ...state,
        status: "error" as "error",
        error: error
    })),




)