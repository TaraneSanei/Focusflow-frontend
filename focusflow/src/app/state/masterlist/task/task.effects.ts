import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, from, map, catchError, of } from "rxjs";
import { FocusflowService } from "../../../focusflow.service";
import { LoadTasks, LoadTasksSuccess, LoadTasksFailure } from "./task.actions";

@Injectable()
export class TasksEffects {
        private actions$ = inject (Actions);
        private focusflowService = inject (FocusflowService);
        

    loadTasks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoadTasks),
            mergeMap((action) =>
            from(this.focusflowService.getTasks()).pipe(
                map((response) => LoadTasksSuccess({tasks: response})),
                catchError((error)=> of(LoadTasksFailure({error: error})))
            ))));
        }