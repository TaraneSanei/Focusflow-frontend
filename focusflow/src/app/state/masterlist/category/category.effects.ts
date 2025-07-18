import { inject, Injectable } from "@angular/core";
import { FocusflowService } from "../../../focusflow.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AddCategory, AddCategoryFailure, AddCategorySuccess, LoadCategories, LoadCategoriesFailure, LoadCategoriesSuccess, DeleteCategory, DeleteCategoryFailure, DeleteCategorySuccess, EditCategory, EditCategorySuccess } from "./category.actions";
import { catchError, from, map, mergeMap, of } from "rxjs";

@Injectable()
export class CategoriesEffects {
    private actions$ = inject(Actions);
    private focusflowService = inject(FocusflowService);


    loadCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoadCategories),
            mergeMap((action) =>
                from(this.focusflowService.getCategories()).pipe(
                    map((response) => LoadCategoriesSuccess({ categories: response })),
                    catchError((error) => of(LoadCategoriesFailure({ error: error })))
                ))));

    addCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AddCategory),
            mergeMap((action) =>
                from(this.focusflowService.addCategory(action.category)).pipe(
                    map((response) => AddCategorySuccess({ category: response })),
                    catchError((error) => of(AddCategoryFailure({ error: error })))
                )
            )
        )
    );


    deleteCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DeleteCategory),
            mergeMap((action) =>
                from(this.focusflowService.deleteCategory(action.category)).pipe(
                    map(() => DeleteCategorySuccess({ category: action.category })),
                    catchError((error) => of(DeleteCategoryFailure({ error: error })))
                ))));


    editCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EditCategory),
            mergeMap((action) =>
                from(this.focusflowService.editCategory(action.category)).pipe(
                    map(() => EditCategorySuccess({ category: action.category })),
                    catchError((error) => of(DeleteCategoryFailure({ error: error })))
                ))))
}

