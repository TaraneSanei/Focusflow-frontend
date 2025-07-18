import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, from, map, catchError, of } from "rxjs";
import { FocusflowService } from "../../../focusflow.service";
import { LoadRecurringSubtasks, LoadRecurringSubtasksSuccess, LoadRecurringSubtasksFailure, AddRecurringSubtask, AddRecurringSubtaskFailure, AddRecurringSubtaskSuccess, DeleteRecurringSubtask, DeleteRecurringSubtaskFailure, DeleteRecurringSubtaskSuccess, EditRecurringSubtask, EditRecurringSubtaskFailure, EditRecurringSubtaskSuccess } from "./recurringSubtask.actions";

@Injectable()
export class RecurringSubtasksEffects {
    private actions$ = inject(Actions);
    private focusflowService = inject(FocusflowService);

    loadRecurringSubtasks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoadRecurringSubtasks),
            mergeMap((action) =>
                from(this.focusflowService.getRecurringSubtasks()).pipe(
                    map((response) => LoadRecurringSubtasksSuccess({recurringSubtasks: response})),
                    catchError((error) => of(LoadRecurringSubtasksFailure({ error: error })))
                )
            )
        )
    );

    addRecurringSubtask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AddRecurringSubtask),
            mergeMap((action) =>
                from(this.focusflowService.addRecurringSubtask(action.recurringSubtask)).pipe(
                    map((response) => AddRecurringSubtaskSuccess({ recurringSubtask: response })),
                    catchError((error) => of(AddRecurringSubtaskFailure({ error: error })))
                )
            )
        )
    );
    
    deleteRecurringSubtask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DeleteRecurringSubtask),
            mergeMap((action) =>
                from(this.focusflowService.deleteRecurringSubtask(action.recurringSubtask)).pipe(
                    map(() => DeleteRecurringSubtaskSuccess({ recurringSubtask: action.recurringSubtask })),
                    catchError((error) => of(DeleteRecurringSubtaskFailure({ error: error })))
                ))));

    editRecurringSubtask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EditRecurringSubtask),
            mergeMap((action) =>
                from(this.focusflowService.editRecurringSubtask(action.recurringSubtask)).pipe(
                    map(() => EditRecurringSubtaskSuccess({ recurringSubtask: action.recurringSubtask })),
                    catchError((error) => of(EditRecurringSubtaskFailure({ error: error })))
                ))))
}