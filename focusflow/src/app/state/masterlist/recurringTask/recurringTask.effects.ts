import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, from, map, catchError, of } from "rxjs";
import { FocusflowService } from "../../../focusflow.service";
import { LoadRecurringTasks, LoadRecurringTasksSuccess, LoadRecurringTasksFailure, AddRecurringTask, AddRecurringTaskFailure, AddRecurringTaskSuccess, DeleteRecurringTask, DeleteRecurringTaskFailure, DeleteRecurringTaskSuccess, EditRecurringTask, EditRecurringTaskFailure, EditRecurringTaskSuccess } from "./recurringTask.actions";

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

       
        deleteRecurringTask$ = createEffect(() =>
            this.actions$.pipe(
                ofType(DeleteRecurringTask),
                mergeMap((action) =>
                    from(this.focusflowService.deleteRecurringTask(action.recurringTask)).pipe(
                        map(() => DeleteRecurringTaskSuccess({ recurringTask: action.recurringTask })),
                        catchError((error) => of(DeleteRecurringTaskFailure({ error: error })))
                    ))));
    
        editRecurringTask$ = createEffect(() =>
            this.actions$.pipe(
                ofType(EditRecurringTask),
                mergeMap((action) =>
                    from(this.focusflowService.editRecurringTask(action.recurringTask)).pipe(
                        map(() => EditRecurringTaskSuccess({ recurringTask: action.recurringTask })),
                        catchError((error) => of(EditRecurringTaskFailure({ error: error })))
                    ))))
}