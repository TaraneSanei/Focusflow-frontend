import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, from, map, catchError, of } from "rxjs";
import { FocusflowService } from "../../../focusflow.service";
import { LoadEvents, LoadEventsSuccess, LoadEventsFailure, AddEvent, AddEventSuccess, AddEventFailure } from "./event.actions";

@Injectable()
export class EventsEffects {
    private actions$ = inject(Actions);
    private focusflowService = inject(FocusflowService);

    loadEvents$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoadEvents),
            mergeMap((action) =>
                from(this.focusflowService.getEvents()).pipe(
                    map((response) => LoadEventsSuccess({ events: response })),
                    catchError((error) => of(LoadEventsFailure({ error: error })))
                )
            )
        )
    )

    addEvent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AddEvent),
            mergeMap((action) =>
                from(this.focusflowService.addEvent(action.event)).pipe(
                    map((response) => AddEventSuccess({ event: response })),
                    catchError((error) => of(AddEventFailure({ error: error })))
                )
            )
        )
    );

}