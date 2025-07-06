import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, from, map, catchError, of } from "rxjs";
import { FocusflowService } from "../../../focusflow.service";
import { LoadProjects, LoadProjectsSuccess, LoadProjectsFailure } from "./project.actions";

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
        }