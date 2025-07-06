import { createReducer, on, State } from "@ngrx/store";
import { payment } from "../../../models/data.models";
import { AddPayment, AddPaymentFailure, AddPaymentSuccess, DeletePayment, DeletePaymentFailure, DeletePaymentSuccess, EditPayment, EditPaymentFailure, EditPaymentSuccess, LoadPayments, LoadPaymentsFailure, LoadPaymentsSuccess } from "./payment.actions";
import { Title } from "@angular/platform-browser";


export interface PaymentState {
    payments: payment[];
    error: string;
    status: "pending" | "loading" | "error" | "success";
};

export const initialPaymentState: PaymentState = {
    payments: [],
    error: "",
    status: "pending",
};

export const PaymentReducer = createReducer(
    initialPaymentState,
    on(LoadPayments, (state) => ({
        ...state,
        status: "loading" as "loading"
    })),
    on(LoadPaymentsSuccess, (state, {payments}) => ({
        ...state,
        payments: [...state.payments, ...payments.filter((payment) => !state.payments.some(Existingpayment => Existingpayment.id === payment.id))],
        status: "success" as "success"
    })),
    on(LoadPaymentsFailure, (state, {error}) => ({
        ...state,
        error: error,
        status: "error" as "error"
    })),   
    on(AddPayment, (state) => ({
        ...state,
        status: "loading" as "loading"
    })),
    on(AddPaymentSuccess, (state, { payment }) => ({
        ...state,
        payments: [...state.payments, payment],
        status: "success" as "success"
    })),
    on(AddPaymentFailure, (state, { error }) => ({
        ...state,
        error: error,
        status: "error" as "error"
    })),
    on(DeletePayment, (state, {payment}) => ({
            ...state,
            error: "",
            status: "loading" as "loading"
    })),
    on(DeletePaymentSuccess, (state, { payment }) => ({
        ...state,
        payments: state.payments.filter((payments) => payments.id !== payment.id),
        status: "success" as "success",
        error: ""
        
    })),
    on(DeletePaymentFailure, (state, { error }) => ({
        ...state,
        status: "error" as "error",
        error: error
    })),
    on(EditPayment, (state, {payment}) => ({
            ...state,
            error: "",
            status: "loading" as "loading"
    })),
    on(EditPaymentSuccess, (state, { payment }) => ({
        ...state,
        payments: state.payments.map(p => 
             p.id === payment.id
             ? {
                id: payment.id,
                Title: payment.Title,
                Amount: payment.Amount,
                Date: payment.Date,
                Recurrence: payment.Recurrence,
                Paid: payment.Paid,
                Priority: payment.Priority
            } : p
        ),
        status: "success" as "success",
        error: ""
    })),
    on(EditPaymentFailure, (state, { error }) => ({
        ...state,
        status: "error" as "error",
        error: error
    }))
            
)