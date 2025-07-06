import { inject, Injectable } from "@angular/core";
import { FocusflowService } from "../../../focusflow.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LoadCategories, LoadCategoriesFailure, LoadCategoriesSuccess } from "./category.actions";
import { catchError, from, map, mergeMap, of } from "rxjs";

@Injectable()
export class CategoriesEffects {
        private actions$ = inject (Actions);
        private focusflowService = inject (FocusflowService);
        

    loadCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoadCategories),
            mergeMap((action) =>
            from(this.focusflowService.getCategories()).pipe(
                map((response) => LoadCategoriesSuccess({categories: response})),
                catchError((error)=> of(LoadCategoriesFailure({error: error})))
            ))));
        }