import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { PaymentState } from "./payment.reducer";


export const Selectpayment = (state: AppState) => state.payment;
export const selectPayment = createSelector(
    Selectpayment,
    (state: PaymentState) => state.payments
);