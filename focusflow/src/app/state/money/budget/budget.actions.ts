import { createAction, props } from "@ngrx/store";
import { budget } from "../../../models/data.models";

// load all the budgets
export const LoadBudgets = createAction(
    '[backend] load budgets',
);

export const LoadBudgetsSuccess = createAction(
    '[backend] load budgets success',
    props<{budgets: budget[]}>()
);

export const LoadBudgetsFailure = createAction(
    '[backend] loading budgets failure',
    props<{error:string}>()
);

//add a single new budget actions

export const AddBudget = createAction(
    '[backend] add budget',
    props<{budget: budget}>()
);

export const AddBudgetSuccess = createAction(
    '[backend] add budget success',
    props<{budget: budget}>()
);

export const AddBudgetFailure = createAction(
    '[backend] add budget failure',
    props<{error:string}>()
);

//delete single Budget actions

export const DeleteBudget = createAction(
    '[backend] delete budget',
    props<{budget: budget}>()
);

export const DeleteBudgetSuccess = createAction(
    '[backend] delete budget success',
    props<{budget: budget}>()
);

export const DeleteBudgetFailure = createAction(
    '[backend] delete budget failure',
    props<{error: string}>()
);
//edit single Budget actions

export const EditBudget = createAction(
    '[backend] edit budget',
    props<{budget: budget}>()
);

export const EditBudgetSuccess = createAction(
    '[backend] edit budget success',
    props<{budget: budget}>()
);

export const EditBudgetFailure = createAction(
    '[backend] edit budget failure',
    props<{error: string}>()
);

