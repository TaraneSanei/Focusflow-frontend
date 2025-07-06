import { inject, Injectable } from "@angular/core";
import { FocusflowService } from "../../focusflow.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, from, map, catchError, of } from "rxjs";
import { LoadEmotions, LoadEmotionsSuccess, LoadEmotionsFailure } from "./emotion.actions";



@Injectable()
export class EmotionEffects {
        private actions$ = inject (Actions);
        private focusflowService = inject (FocusflowService);
        

    loadEmotions$ = createEffect(() =>
    this.actions$.pipe(
        ofType(LoadEmotions),
        mergeMap((action) =>
        from(this.focusflowService.getEmotions()).pipe(
            map((response) => LoadEmotionsSuccess({emotions: response})),
            catchError((error)=> of(LoadEmotionsFailure({error: error})))
        ))));
}