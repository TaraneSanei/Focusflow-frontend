import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FocusflowService } from "../../../focusflow.service";
import { AddBudget, AddBudgetFailure, AddBudgetSuccess, DeleteBudget, DeleteBudgetFailure, DeleteBudgetSuccess, EditBudget, EditBudgetSuccess, LoadBudgets, LoadBudgetsFailure, LoadBudgetsSuccess } from "./budget.actions";
import { catchError, from, map, mergeMap, of } from "rxjs";

@Injectable()
export class BudgetEffects {
        private actions$ = inject (Actions);
        private focusflowService = inject (FocusflowService);
        

    loadBudgets$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoadBudgets),
            mergeMap((action) =>
            from(this.focusflowService.getBudgets()).pipe(
                map((response) => LoadBudgetsSuccess({budgets: response})),
                catchError((error)=> of(LoadBudgetsFailure({error: error})))
            ))));
    
    AddBudget$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AddBudget),
            mergeMap((action)=>
            from(this.focusflowService.addBudget(action.budget)).pipe(
                map((budget) =>AddBudgetSuccess({budget:budget})),
                catchError((error)=> of(AddBudgetFailure({error:error})))
            ))));

    deleteBudget$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DeleteBudget),
            mergeMap((action)=>
            from(this.focusflowService.deleteBudget(action.budget)).pipe(
                map(() => DeleteBudgetSuccess({budget: action.budget})),
                catchError((error) => of(DeleteBudgetFailure({error: error})))
            ))));

        
    editBudgets$ = createEffect(() =>
    this.actions$.pipe(
        ofType(EditBudget),
        mergeMap((action)=>
        from(this.focusflowService.editBudget(action.budget)).pipe(
            map(() => EditBudgetSuccess({budget: action.budget})),
            catchError((error) => of(DeleteBudgetFailure({error:error})))
        ))))
}