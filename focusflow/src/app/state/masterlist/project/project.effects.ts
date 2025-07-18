import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, from, map, catchError, of } from "rxjs";
import { FocusflowService } from "../../../focusflow.service";
import { LoadProjects, LoadProjectsSuccess, LoadProjectsFailure, AddProject, AddProjectFailure, AddProjectSuccess, DeleteProject, DeleteProjectFailure, DeleteProjectSuccess, EditProject, EditProjectFailure, EditProjectSuccess } from "./project.actions";

@Injectable()
export class ProjectsEffects {
        private actions$ = inject (Actions);
        private focusflowService = inject (FocusflowService);
        

    loadProjects$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoadProjects),
            mergeMap((action) =>
            from(this.focusflowService.getProjects()).pipe(
                map((response) => LoadProjectsSuccess({projects: response})),
                catchError((error)=> of(LoadProjectsFailure({error: error})))
            ))));

    addProject$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AddProject),
            mergeMap((action) =>
                from(this.focusflowService.addProject(action.project)).pipe(
                    map((response) => AddProjectSuccess({ project: response })),
                    catchError((error) => of(AddProjectFailure({ error: error })))
                )
            )
        )
    );
    
    
    deleteProject$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DeleteProject),
            mergeMap((action) =>
                from(this.focusflowService.deleteProject(action.project)).pipe(
                    map(() => DeleteProjectSuccess({ project: action.project })),
                    catchError((error) => of(DeleteProjectFailure({ error: error })))
                ))));
    
    
    editProject$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EditProject),
            mergeMap((action) =>
                from(this.focusflowService.editProject(action.project)).pipe(
                    map(() => EditProjectSuccess({ project: action.project })),
                    catchError((error) => of(EditProjectFailure({ error: error })))
                ))))
}