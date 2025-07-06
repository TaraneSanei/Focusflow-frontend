import { inject, Injectable } from "@angular/core";
import { FocusflowService } from "../../../focusflow.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AddIncome, AddIncomeFailure, AddIncomeSuccess, DeleteIncome, DeleteIncomeFailure, DeleteIncomeSuccess, EditIncome, EditIncomeSuccess, LoadIncomes, LoadIncomesFailure, LoadIncomesSuccess } from "./income.actions";
import { catchError, from, map, mergeMap, of } from "rxjs";


@Injectable()
export class IncomeEffects {
        private actions$ = inject (Actions);
        private focusflowService = inject (FocusflowService);
        

    loadIncomes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoadIncomes),
            mergeMap((action) =>
            from(this.focusflowService.getIncomes(action.year, action.month)).pipe(
                map((response) => LoadIncomesSuccess({incomes: response})),
                catchError((error)=> of(LoadIncomesFailure({error: error})))
            ))));
    
    AddIncome$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AddIncome),
            mergeMap((action)=>
            from(this.focusflowService.addIncome(action.income)).pipe(
                map((income) =>AddIncomeSuccess({income:income})),
                catchError((error)=> of(AddIncomeFailure({error:error})))
            ))));

    deleteIncome$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DeleteIncome),
            mergeMap((action)=>
            from(this.focusflowService.deleteIncome(action.income)).pipe(
                map(() => DeleteIncomeSuccess({income: action.income})),
                catchError((error) => of(DeleteIncomeFailure({error: error})))
            ))));

        
    editIncomes$ = createEffect(() =>
    this.actions$.pipe(
        ofType(EditIncome),
        mergeMap((action)=>
        from(this.focusflowService.editIncome(action.income)).pipe(
            map(() => EditIncomeSuccess({income: action.income})),
            catchError((error) => of(DeleteIncomeFailure({error:error})))
        ))))
}