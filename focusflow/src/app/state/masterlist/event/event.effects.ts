import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, from, map, catchError, of } from "rxjs";
import { FocusflowService } from "../../../focusflow.service";
import { LoadEvents, LoadEventsSuccess, LoadEventsFailure } from "./event.actions";

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
    );
}