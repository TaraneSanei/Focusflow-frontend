import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { IncomeState } from "./income.reducer";

export const Selectincome = (state: AppState) => state.income;
export const selectIncome = createSelector(
    Selectincome,
    (state: IncomeState) => state.incomes
);