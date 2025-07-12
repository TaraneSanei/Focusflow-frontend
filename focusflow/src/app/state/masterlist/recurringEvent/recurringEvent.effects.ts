import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, from, map, catchError, of } from "rxjs";
import { FocusflowService } from "../../../focusflow.service";
import { LoadRecurringEvents, LoadRecurringEventsSuccess, LoadRecurringEventsFailure, AddRecurringEvent, AddRecurringEventSuccess, AddRecurringEventFailure } from "./recurringEvent.actions";

@Injectable()
export class RecurringEventsEffects {
    private actions$ = inject(Actions);
    private focusflowService = inject(FocusflowService);

    loadRecurringEvents$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoadRecurringEvents),
            mergeMap((action) =>
                from(this.focusflowService.getRecurringEvents()).pipe(
                    map((response) => LoadRecurringEventsSuccess({ recurringEvents: response })),
                    catchError((error) => of(LoadRecurringEventsFailure({ error: error })))
                )
            )
        )
    )

    addRecurringEvent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AddRecurringEvent),
            mergeMap((action) =>
                from(this.focusflowService.addRecurringEvent(action.recurringEvent)).pipe(
                    map((response) => AddRecurringEventSuccess({ recurringEvent: response })),
                    catchError((error) => of(AddRecurringEventFailure({ error: error })))
                )
            )
        )
    );

}