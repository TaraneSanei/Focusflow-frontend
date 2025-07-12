import { createReducer, on } from "@ngrx/store";
import { category } from "../../../models/data.models";
import { AddCategory, AddCategoryFailure, AddCategorySuccess, LoadCategories, LoadCategoriesFailure, LoadCategoriesSuccess } from "./category.actions";

export interface CategoriesState {
    categories: category[];
    error: string;
    status: "pending" | "loading" | "error" | "success";
};

export const initialCategoriesState: CategoriesState = {
    categories: [],
    error: "",
    status: "pending",
};


export const CategoriesReducer = createReducer(
    initialCategoriesState,
    on(LoadCategories, (state) => ({
        ...state,
        status: "loading" as "loading"
    })),
    on(LoadCategoriesSuccess,(state, {categories}) => ({
        categories :categories,
        status: "success" as "success",
        error: ""
    })),
    on(LoadCategoriesFailure, (state, {error}) => ({
        ...state,
        status: "error" as "error",
        error: error
    })),
    on(AddCategory, (state) => ({
        ...state,
        error: "",
        status: "loading" as "loading"
    })),
    on(AddCategorySuccess, (state, { category }) => ({
        ...state,
        categories: [
            ...state.categories, category
        ],
        status: "success" as "success",
        error: ""
    })),
    on(AddCategoryFailure, (state, { error }) => ({
        ...state,
        status: "error" as "error",
        error: error
    })),    
)