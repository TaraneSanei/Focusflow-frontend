import { inject, Injectable } from "@angular/core";
import { FocusflowService } from "../../../focusflow.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AddPayment, AddPaymentFailure, AddPaymentSuccess, DeletePayment, DeletePaymentFailure, DeletePaymentSuccess, EditPayment, EditPaymentFailure, EditPaymentSuccess, LoadPayments, LoadPaymentsFailure, LoadPaymentsSuccess } from "./payment.actions";
import { catchError, from, map, mergeMap, of } from "rxjs";


@Injectable()
export class PaymentEffects {

    private actions$ = inject (Actions);
    private focusflowService = inject (FocusflowService);

    loadPayments$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoadPayments),
            mergeMap((action) =>
            from(this.focusflowService.getPayments(action.year, action.month)).pipe(
                map((response) => LoadPaymentsSuccess({payments: response})),
                catchError((error)=> of(LoadPaymentsFailure({error: error})))
            ))));


    AddPayment$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AddPayment),
            mergeMap((action)=>
            from(this.focusflowService.addPayment(action.payment)).pipe(
                map((payment) =>AddPaymentSuccess({payment:payment})),
                catchError((error)=> of(AddPaymentFailure({error:error})))
            ))));
    
    deletePayment$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DeletePayment),
            mergeMap((action)=>
            from(this.focusflowService.deletePayment(action.payment)).pipe(
                map(() => DeletePaymentSuccess({payment: action.payment})),
                catchError((error) => of(DeletePaymentFailure({error: error})))
            ))))
    
    editPayments$ = createEffect(() =>
    this.actions$.pipe(
        ofType(EditPayment),
        mergeMap((action)=>
        from(this.focusflowService.editPayment(action.payment)).pipe(
            map(() => EditPaymentSuccess({payment: action.payment})),
            catchError((error) => of(EditPaymentFailure({error:error})))
        ))))
}