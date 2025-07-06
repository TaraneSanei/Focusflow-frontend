import { createAction, props } from "@ngrx/store";
import { payment } from "../../../models/data.models";

//loads all the unpaid payments which is the default view
export const LoadPayments = createAction(
    '[backend] load payments',
    props<{year:string, month: string}>()
);

export const LoadPaymentsSuccess = createAction(
    '[backend] load payments success',
    props<{payments: payment[]}>()
);

export const LoadPaymentsFailure = createAction(
    '[backend] loading payments failure',
    props<{error:string}>()
);

//add a single new payment actions

export const AddPayment = createAction(
    '[backend] add payment',
    props<{payment: payment}>()
);

export const AddPaymentSuccess = createAction(
    '[backend] add payment success',
    props<{payment: payment}>()
);

export const AddPaymentFailure = createAction(
    '[backend] add payment failure',
    props<{error:string}>()
);

//delete single Payment actions

export const DeletePayment = createAction(
    '[backend] delete payment',
    props<{payment: payment}>()
);

export const DeletePaymentSuccess = createAction(
    '[backend] delete payment success',
    props<{payment: payment}>()
);

export const DeletePaymentFailure = createAction(
    '[backend] delete payment failure',
    props<{error: string}>()
);
//edit single Payment actions

export const EditPayment = createAction(
    '[backend] edit payment',
    props<{payment: payment}>()
);

export const EditPaymentSuccess = createAction(
    '[backend] edit payment success',
    props<{payment: payment}>()
);

export const EditPaymentFailure = createAction(
    '[backend] edit payment failure',
    props<{error: string}>()
);


