import { createAction, props } from "@ngrx/store";
import { category } from "../../../models/data.models";

export const LoadCategories = createAction(
    '[backend] load categories',
);

export const LoadCategoriesSuccess = createAction(
    '[backend] load categories success',
    props<{categories: category[]}>()
);

export const LoadCategoriesFailure = createAction(
    '[backend] loading categories failure',
    props<{error:string}>()
);

export const AddCategory = createAction(
    '[backend] add a new category',
    props<{category: category}>()
)

export const AddCategorySuccess = createAction(
    '[backend] add category success',
    props<{category: category}>()
)

export const AddCategoryFailure = createAction(
    '[backend] add category failure',
    props<{error:string}>()
)