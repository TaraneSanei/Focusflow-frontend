import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { BudgetState } from "./budget.reducer";

export const Selectbudget = (state: AppState) => state.budget;
export const selectBudget = createSelector(
    Selectbudget,
    (state: BudgetState) => state.budgets
);