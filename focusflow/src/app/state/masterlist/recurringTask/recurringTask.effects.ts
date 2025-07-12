import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, from, map, catchError, of } from "rxjs";
import { FocusflowService } from "../../../focusflow.service";
import { LoadRecurringTasks, LoadRecurringTasksSuccess, LoadRecurringTasksFailure, AddRecurringTask, AddRecurringTaskFailure, AddRecurringTaskSuccess } from "./recurringTask.actions";

@Injectable()
export class RecurringTasksEffects {
        private actions$ = inject (Actions);
        private focusflowService = inject (FocusflowService);
        

    loadRecurringTasks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoadRecurringTasks),
            mergeMap((action) =>
            from(this.focusflowService.getRecurringTasks()).pipe(
                map((response) => LoadRecurringTasksSuccess({recurringTasks: response})),
                catchError((error)=> of(LoadRecurringTasksFailure({error: error})))
            ))));

    addRecurringTask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AddRecurringTask),
            mergeMap((action) =>
                from(this.focusflowService.addRecurringTask(action.recurringTask)).pipe(
                    map((response) => AddRecurringTaskSuccess({ recurringTask: response })),
                    catchError((error) => of(AddRecurringTaskFailure({ error: error })))
                )
            )
        )
    );
}