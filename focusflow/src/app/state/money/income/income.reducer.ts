import { createReducer, on, State } from "@ngrx/store";
import { income } from "../../../models/data.models";
import { AddIncome, AddIncomeFailure, AddIncomeSuccess, DeleteIncome, DeleteIncomeFailure, DeleteIncomeSuccess, EditIncome, EditIncomeFailure, EditIncomeSuccess, LoadIncomes, LoadIncomesFailure, LoadIncomesSuccess } from "./income.actions";


export interface IncomeState {
    incomes: income[];
    error: string;
    status: "pending" | "loading" | "error" | "success";
};

export const initialIncomeState: IncomeState = {
    incomes: [],
    error: "",
    status: "pending",
};

export const IncomeReducer = createReducer(
    initialIncomeState,
    on(LoadIncomes, (state) => ({
        ...state,
        status: "loading" as "loading"
    })),
    on(LoadIncomesSuccess, (state, { incomes }) => ({
        ...state,
        incomes: [...state.incomes, ...incomes.filter((income) => !state.incomes.some(Existingincome => Existingincome.id === income.id))],
        status: "success" as "success"
    })),
    on(LoadIncomesFailure, (state, { error }) => ({
        ...state,
        error: error,
        status: "error" as "error"
    })),
    on(AddIncome, (state) => ({
        ...state,
        status: "loading" as "loading"
    })),
    on(AddIncomeSuccess, (state, { income }) => ({
        ...state,
        incomes: [...state.incomes, income],
        status: "loading" as "loading"
    })),
    on(AddIncomeFailure, (state, { error }) => ({
        ...state,
        error: error,
        status: "error" as "error"
    })),
    on(DeleteIncome, (state, { income }) => ({
        ...state,
        error: "",
        status: "loading" as "loading"
    })),
    on(DeleteIncomeSuccess, (state, { income }) => ({
        ...state,
        incomes: state.incomes.filter((incomes) => incomes.id !== income.id),
        status: "success" as "success",
        error: ""

    })),
    on(DeleteIncomeFailure, (state, { error }) => ({
        ...state,
        status: "error" as "error",
        error: error
    })),
    on(EditIncome, (state, { income }) => ({
        ...state,
        error: "",
        status: "loading" as "loading"
    })),
    on(EditIncomeSuccess, (state, { income }) => ({
        ...state,
        incomes: state.incomes.map(i =>
            i.id === income.id
                ? {
                    id: income.id,
                    Title: income.Title,
                    Amount: income.Amount,
                    Date: income.Date,
                    Recurrence: income.Recurrence,
                    Left: income.Left
                } : i
        ),
        status: "success" as "success",
        error: ""
    })),
    on(EditIncomeFailure, (state, { error }) => ({
        ...state,
        status: "error" as "error",
        error: error
    }))


)