import { createAction, props } from "@ngrx/store";
import { income } from "../../../models/data.models";

// load all the incomes based on the view of the calendar
export const LoadIncomes = createAction(
    '[backend] load incomes',
    props<{year:string, month: string}>()
);

export const LoadIncomesSuccess = createAction(
    '[backend] load incomes success',
    props<{incomes: income[]}>()
);

export const LoadIncomesFailure = createAction(
    '[backend] loading incomes failure',
    props<{error:string}>()
);

//add a single new income actions

export const AddIncome = createAction(
    '[backend] add income',
    props<{income: income}>()
);

export const AddIncomeSuccess = createAction(
    '[backend] add income success',
    props<{income: income}>()
);

export const AddIncomeFailure = createAction(
    '[backend] add income failure',
    props<{error:string}>()
);

//delete single Income actions

export const DeleteIncome = createAction(
    '[backend] delete income',
    props<{income: income}>()
);

export const DeleteIncomeSuccess = createAction(
    '[backend] delete income success',
    props<{income: income}>()
);

export const DeleteIncomeFailure = createAction(
    '[backend] delete income failure',
    props<{error: string}>()
);
//edit single Income actions

export const EditIncome = createAction(
    '[backend] edit income',
    props<{income: income}>()
);

export const EditIncomeSuccess = createAction(
    '[backend] edit income success',
    props<{income: income}>()
);

export const EditIncomeFailure = createAction(
    '[backend] edit income failure',
    props<{error: string}>()
);

