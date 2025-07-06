import { createReducer, on } from "@ngrx/store";
import { budget } from "../../../models/data.models";
import { AddBudget, AddBudgetFailure, AddBudgetSuccess, DeleteBudget, DeleteBudgetFailure, DeleteBudgetSuccess, EditBudget, EditBudgetFailure, EditBudgetSuccess, LoadBudgets, LoadBudgetsFailure, LoadBudgetsSuccess } from "./budget.actions";

export interface BudgetState {
    budgets: budget[];
    error: string;
    status: "pending" | "loading" | "error" | "success";
};

export const initialBudgetState: BudgetState = {
    budgets: [],
    error: "",
    status: "pending",
};

export const BudgetReducer = createReducer(
    initialBudgetState,
    on(LoadBudgets, (state) => ({
        ...state,
        status: "loading" as "loading"
    })),
    on(LoadBudgetsSuccess, (state, { budgets }) => ({
        ...state,
        budgets: budgets,
        status: "success" as "success"
    })),
    on(LoadBudgetsFailure, (state, { error }) => ({
        ...state,
        error: error,
        status: "error" as "error"
    })),
    on(AddBudget, (state) => ({
        ...state,
        status: "loading" as "loading"
    })),
    on(AddBudgetSuccess, (state, { budget }) => ({
        ...state,
        budgets: [...state.budgets, budget],
        status: "loading" as "loading"
    })),
    on(AddBudgetFailure, (state, { error }) => ({
        ...state,
        error: error,
        status: "error" as "error"
    })),
    on(DeleteBudget, (state, { budget }) => ({
        ...state,
        error: "",
        status: "loading" as "loading"
    })),
    on(DeleteBudgetSuccess, (state, { budget }) => ({
        ...state,
        budgets: state.budgets.filter((budgets) => budgets.id !== budget.id),
        status: "success" as "success",
        error: ""

    })),
    on(DeleteBudgetFailure, (state, { error }) => ({
        ...state,
        status: "error" as "error",
        error: error
    })),
    on(EditBudget, (state, { budget }) => ({
        ...state,
        error: "",
        status: "loading" as "loading"
    })),
    on(EditBudgetSuccess, (state, { budget }) => ({
        ...state,
        budgets: state.budgets.map(i =>
            i.id === budget.id
                ? {
                    id: budget.id,
                    Title: budget.Title,
                    Amount: budget.Amount,
                    Color: budget.Color,
                } : i
        ),
        status: "success" as "success",
        error: ""
    })),
    on(EditBudgetFailure, (state, { error }) => ({
        ...state,
        status: "error" as "error",
        error: error
    }))


)