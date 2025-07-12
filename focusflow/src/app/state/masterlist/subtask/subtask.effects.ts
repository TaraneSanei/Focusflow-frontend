import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, from, map, catchError, of } from "rxjs";
import { FocusflowService } from "../../../focusflow.service";
import { LoadSubtasks, LoadSubtasksSuccess, LoadSubtasksFailure, AddSubtask, AddSubtaskFailure, AddSubtaskSuccess } from "./subtask.actions";

@Injectable()
export class SubtasksEffects {
    private actions$ = inject(Actions);
    private focusflowService = inject(FocusflowService);

    loadSubtasks$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoadSubtasks),
            mergeMap((action) =>
                from(this.focusflowService.getSubtasks()).pipe(
                    map((response) => LoadSubtasksSuccess({subtasks: response})),
                    catchError((error) => of(LoadSubtasksFailure({ error: error })))
                )
            )
        )
    );

    addSubtask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AddSubtask),
            mergeMap((action) =>
                from(this.focusflowService.addSubtask(action.subtask)).pipe(
                    map((response) => AddSubtaskSuccess({ subtask: response })),
                    catchError((error) => of(AddSubtaskFailure({ error: error })))
                )
            )
        )
    );
}