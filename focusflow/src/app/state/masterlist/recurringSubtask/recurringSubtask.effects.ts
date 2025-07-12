import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, from, map, catchError, of } from "rxjs";
import { FocusflowService } from "../../../focusflow.service";
import { LoadRecurringSubtasks, LoadRecurringSubtasksSuccess, LoadRecurringSubtasksFailure, AddRecurringSubtask, AddRecurringSubtaskFailure, AddRecurringSubtaskSuccess } from "./recurringSubtask.actions";

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
}