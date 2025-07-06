import { createSelector } from "@ngrx/store";
import { AppState } from "../../app.state";
import { CategoriesState } from "./category.reducer";

export const SelectCategories = (state: AppState) => state.categories;
export const selectCategories = createSelector(
    SelectCategories,
    (state: CategoriesState) => state.categories
);